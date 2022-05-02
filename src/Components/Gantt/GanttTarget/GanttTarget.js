import { ExpandMore, KeyboardDoubleArrowDown } from '@mui/icons-material'
import { Button, Collapse, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { requestCreateTarget, requestDeleteTarget } from 'Redux/Targets/actions'
import TargetConstants from 'Redux/Targets/constants'
import { selectTargetsByParentId } from 'Redux/Targets/selectors'
import { styled } from 'Styles/materialThemes'
import { parseDate } from 'Utilities/ganttHelpers'
import { GanttActionButtons } from '../GanttActionButtons'
import { GanttEntryHeader } from '../GanttEntryHeader'
import { GanttSubTarget } from '../GanttSubTarget'
import { GanttTargetTooltip } from '../GanttTargetTooltip'

const StyledDiv = styled('div')(({ theme }) => ({
    border: `1px solid ${theme.palette.background.paper}`,
    borderRadius: '6px',
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

export default function GanttTarget({ target }) {
    const dispatch = useDispatch()

    const { id, portfolioId, startDate, dueDate, title, description, type } = target
    const dateString = parseDate(startDate, dueDate)
    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))
    const subTargets = useSelector(state => selectTargetsByParentId(state, id))
    const ref = useRef()

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

    const [open, setOpen] = useState(false)
    const [hover, setHover] = useState(false)
    const [horizontalOpen, setHorizontalOpen] = useState(false)
    const [widthBool, setWidthBool] = useState(false)

    const transitionStyles = {
        minWidth: horizontalOpen ? '50vw' : '106px',
        transition: widthBool ? 'none' : 'min-width 800ms' }

    const expandButtonHandler = () => {
        if (!open && !widthBool) {
            setHorizontalOpen(prev => !prev)
            setTimeout(() => setOpen(prev => !prev), 800)
        } else {
            setHorizontalOpen(prev => !prev)
            setOpen(prev => !prev)
        }
    }

    useEffect(() => {
        if (ref.current.clientWidth > (window.innerWidth / 2)) {
            setWidthBool(true)
        }
    }, [])

    return (
        <StyledDiv data-testid = {'GanttTarget__container_' + id} ref = {ref} style = {transitionStyles}>
            <Tooltip open = {hover && !open} title = {<GanttTargetTooltip target = {target}/>} arrow followCursor>
                <StyledHeader onMouseEnter = {() => setHover(true)} onMouseLeave = {() => setHover(false)}>
                    <div style = {{ maxWidth: 'calc(100% - 30px)' }}>
                        <GanttEntryHeader title = {title} dateRange = {dateString} />
                    </div>
                    <div>
                        <IconButton style = {{ display: 'none', maxHeight: '40px' }}>
                            <KeyboardDoubleArrowDown
                                style = {{
                                    transform: `rotate(${open ? 180 : 0}deg)`,
                                    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
                                }}
                            />
                        </IconButton>
                        <StyledExpandButton
                            data-testid = {'GanttTarget__expandButton_' + (open ? 'open' : 'closed')}
                            onClick = {expandButtonHandler}
                        >
                            <ExpandMore
                                style = {{
                                    transform: `rotate(${open ? 180 : 0}deg)`,
                                    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
                                }}
                            />
                        </StyledExpandButton>
                    </div>
                </StyledHeader>
            </Tooltip>
            <Collapse
                in = {open}
                collapsedSize = {0}
                easing = {'cubic-bezier(1,-0.01, 0.69, 1.01)'}
            >
                <Typography margin = '8px' color = 'secondary' variant = 'subtitle2'>{description}</Typography>
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
                <Stack spacing = {1}>
                    {subTargets.map((subTarget, index) => (
                        <GanttSubTarget
                            target = {subTarget}
                            key = {index}
                        />))}
                </Stack>
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
        dueDate: PropTypes.string
    }).isRequired
}