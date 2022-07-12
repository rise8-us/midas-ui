import { ExpandMore, KeyboardDoubleArrowDown } from '@mui/icons-material'
import { Button, Collapse, IconButton, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPortfolioPageSettingTargetIdExpand } from 'Redux/AppSettings/reducer'
import { selectPortfolioPageSettingTargetIdExpanded } from 'Redux/AppSettings/selectors'
import { selectEpicsByIds } from 'Redux/Epics/selectors'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { requestCreateTarget, requestDeleteTarget } from 'Redux/Targets/actions'
import TargetConstants from 'Redux/Targets/constants'
import { selectEpicIdsByTargetIds } from 'Redux/Targets/selectors'
import { styled } from 'Styles/materialThemes'
import { calculatePosition, parseStringToDate } from 'Utilities/dateHelpers'
import { parseDate } from 'Utilities/ganttHelpers'
import { getTotalWeights } from 'Utilities/progressHelpers'
import { GanttActionButtons } from '../GanttActionButtons'
import { GanttEntryHeader } from '../GanttEntryHeader'
import { GanttProgressBar } from '../GanttProgressBar'
import { GanttSubTargetList } from '../GanttSubTargetList'
import { GanttTargetTooltip } from '../GanttTargetTooltip'

const StyledDiv = styled('div')(({ theme }) => ({
    border: `1px solid ${theme.palette.background.paper}`,
    color: theme.palette.gantt.target.dark.text,
    background: theme.palette.gantt.target.dark.background,
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%)',
    padding: theme.spacing(1),
    minWidth: '106px',
    '&:hover': {
        boxShadow: '0px 0px 16px 0px black'
    }
}))

const StyledHeader = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
    textAlign: 'left',
    width: '100%',
    cursor: 'pointer'
}))

const StyledButton = styled(Button)(() => ({
    background: '#0071bc',
    margin: '8px 0px',
    '&:hover': {
        background: '#3e94cf'
    }
}))

const StyledExpandButton = styled(IconButton)(({ theme }) => ({
    maxHeight: '40px',
    marginRight: theme.spacing(-1)
}))

const getTransitionStyles = (horizontalOpen, shouldNotGrowHorizantally, defaultMinWidth, start) => {
    let minWidth = '50vw'
    if (start > 50) {
        minWidth =  `calc(${100 - start}vw - ${(100 - start) / 100 * 28}px)`
    }
    return {
        minWidth: horizontalOpen && !shouldNotGrowHorizantally ? minWidth : defaultMinWidth ?? '106px',
        transition: shouldNotGrowHorizantally ? 'none' : 'min-width 800ms'
    }
}

const getExpandProperties = (open) => ({
    transform: open ? 180 : 0,
    testid: open ? 'open' : 'closed',
    tooltip: !open ? 'Expand' : 'Collapse',
})

const calculateDurationOnChart = (start, due, dateRange) => {
    let [startPos, duration] = calculatePosition([start, due], dateRange)
    if (start < dateRange[0] && due < dateRange[1]) {
        duration = startPos + duration
    } else if (start > dateRange[0] && due > dateRange[1]) {
        duration = 100 - startPos
    } else if (start < dateRange[0] && due > dateRange[1]) {
        duration = 100
    }
    return [startPos, duration]
}

const calculateBorderRadius = (start, due, dateRange) => {
    let [borderLeft, borderRight] = ['6px', '6px']
    if (start < dateRange[0]) {
        borderLeft = 0
    }
    if (due > dateRange[1]) {
        borderRight = 0
    }
    return {
        borderTopLeftRadius: borderLeft,
        borderBottomLeftRadius: borderLeft,
        borderTopRightRadius: borderRight,
        borderBottomRightRadius: borderRight
    }
}

export default function GanttTarget({ target, dateRange }) {
    const dispatch = useDispatch()
    const ref = useRef()

    const { id, portfolioId, startDate, dueDate, title, description, type, childrenIds } = target
    const dateString = parseDate(startDate, dueDate)

    const [openAll, setOpenAll] = useState(false)
    const [hover, setHover] = useState(false)
    const [horizontalOpen, setHorizontalOpen] = useState(false)
    const [shouldNotGrowHorizantally, setShouldNotGrowHorizantally] = useState(false)

    const start = parseStringToDate(startDate)
    const due = parseStringToDate(dueDate)
    const [startPos, duration] = calculateDurationOnChart(start, due, dateRange)
    const minWidth = useMemo(() => `calc(${duration}vw - ${duration / 100 * 28}px)`, [JSON.stringify(duration)])

    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))
    const epicIds = useSelector(state => selectEpicIdsByTargetIds(state, childrenIds))
    const isExpanded = useSelector(state => selectPortfolioPageSettingTargetIdExpanded(state, portfolioId, id))

    const epics = useSelector(state => selectEpicsByIds(state, epicIds))

    const [totalWeight, totalCompletedWeight] = getTotalWeights(epics)

    const handleHover = {
        onMouseEnter: () => setHover(true),
        onMouseLeave: () => setHover(false)
    }

    const handleExpandHover = {
        onMouseEnter: () => setHover(false),
        onMouseLeave: () => setHover(true)
    }

    const updateTarget = (e) => {
        e.stopPropagation()
        dispatch(openPopup(TargetConstants.UPDATE_TARGET, 'TargetPopup', { id, portfolioId }))
    }

    const deleteTarget = (e) => {
        e.stopPropagation()
        dispatch(openPopup(TargetConstants.DELETE_TARGET, 'DeletePopup', {
            id: id,
            title: title,
            type: type,
            request: requestDeleteTarget,
            constant: TargetConstants.DELETE_TARGET
        }))
    }

    const createSubTarget = () => {
        dispatch(requestCreateTarget({
            startDate,
            dueDate,
            parentId: id,
            title: 'Enter subtarget title',
            portfolioId,
        }))
    }

    const expandButtonHandler = () => {
        setHorizontalOpen(prev => !prev)
        setExpanded()
        setOpenAll(false)
    }

    const expandAllButtonHandler = () => {
        if (!openAll && isExpanded) {
            setOpenAll(true)
        } else {
            setHorizontalOpen(prev => !prev)
            setExpanded()
            setOpenAll(prev => !prev)
        }
    }

    const setExpanded = () => {
        dispatch(setPortfolioPageSettingTargetIdExpand({ portfolioId, id, isExpanded: !isExpanded }))
    }

    useEffect(() => {
        if (duration > 50) {
            setShouldNotGrowHorizantally(true)
        }
    }, [JSON.stringify(dateRange)])

    useEffect(() => {
        setHorizontalOpen(isExpanded)
    }, [JSON.stringify(isExpanded)])

    return (
        <StyledDiv
            data-testid = {'GanttTarget__container_' + id}
            ref = {ref}
            style = {{
                ...getTransitionStyles(horizontalOpen, shouldNotGrowHorizantally, minWidth, startPos),
                ...calculateBorderRadius(start, due, dateRange)
            }}
        >
            {epics.length > 0 &&
                <GanttProgressBar
                    currentValue = {totalCompletedWeight}
                    targetValue = {totalWeight}
                    startDate = {startDate}
                    endDate = {dueDate}
                    dataTestId = 'GanttTarget__target-progress'
                />
            }
            <Tooltip
                open = {hover && !isExpanded}
                title = {<GanttTargetTooltip target = {target}/>}
                arrow
                followCursor
            >
                <StyledHeader {...handleHover}>
                    <div style = {{ maxWidth: 'calc(100% - 60px)' }}>
                        <GanttEntryHeader title = {title} dateRange = {dateString} />
                    </div>
                    <div {...handleExpandHover} style = {{ display: 'flex' }}>
                        <Tooltip
                            disableInteractive
                            title = {getExpandProperties(isExpanded).tooltip}
                        >
                            <StyledExpandButton
                                data-testid = {'GanttTarget__expandButton_' + getExpandProperties(isExpanded).testid}
                                onClick = {expandButtonHandler}
                                style = {{ marginRight: 0 }}
                                size = 'small'
                            >
                                <ExpandMore
                                    style = {{
                                        transform: `rotate(${getExpandProperties(isExpanded).transform}deg)`,
                                        transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                    }}
                                />
                            </StyledExpandButton>
                        </Tooltip>
                        <Tooltip
                            disableInteractive
                            title = {getExpandProperties(openAll).tooltip + ' All'}
                        >
                            <StyledExpandButton
                                data-testid = {'GanttTarget__expandAllButton_' + getExpandProperties(openAll).testid}
                                onClick = {expandAllButtonHandler}
                                size = 'small'
                            >
                                <KeyboardDoubleArrowDown
                                    style = {{
                                        transform: `rotate(${getExpandProperties(openAll).transform}deg)`,
                                        transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
                                    }}
                                />
                            </StyledExpandButton>
                        </Tooltip>
                    </div>
                </StyledHeader>
            </Tooltip>
            <Collapse
                in = {isExpanded}
                collapsedSize = {0}
                easing = {'cubic-bezier(1, -0.01, 0.69, 1.01)'}
            >
                <Typography
                    margin = '8px'
                    color = 'secondary'
                    variant = 'subtitle2'
                >
                    {description}
                </Typography>
                {permissions.edit &&
                    <div style = {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <StyledButton
                            onClick = {createSubTarget}
                            variant = 'contained'
                            data-testid = 'GanttTarget__createSubTarget_button'
                        >
                            Add a Sub-Target
                        </StyledButton>
                        <div>
                            <GanttActionButtons
                                htmlColor = 'white'
                                onEditClick = {updateTarget}
                                onDeleteClick = {deleteTarget}
                            />
                        </div>
                    </div>
                }
                <GanttSubTargetList ids = {childrenIds} defaultAllOpen = {openAll}/>
            </Collapse>
        </StyledDiv>
    )
}

GanttTarget.propTypes = {
    target: PropTypes.shape({
        id: PropTypes.number,
        portfolioId: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        type: PropTypes.string,
        startDate: PropTypes.string,
        dueDate: PropTypes.string,
        childrenIds: PropTypes.arrayOf(PropTypes.number)
    }).isRequired,
    dateRange: PropTypes.array.isRequired
}