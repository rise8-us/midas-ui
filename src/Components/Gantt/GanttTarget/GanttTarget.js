import { ExpandMore } from '@mui/icons-material'
import { Collapse, IconButton, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { requestDeleteTarget } from 'Redux/Targets/actions'
import TargetConstants from 'Redux/Targets/constants'
import { styled } from 'Styles/materialThemes'
import { parseDate } from 'Utilities/ganttHelpers'
import { GanttActionButtons } from '../GanttActionButtons'
import { GanttEntryHeader } from '../GanttEntryHeader'
import { GanttTargetTooltip } from '../GanttTargetTooltip'

const StyledDiv = styled('div')(({ theme }) => ({
    border: `1px solid ${theme.palette.background.paper}`,
    borderRadius: '6px',
    color: theme.palette.gantt.target.dark.text,
    background: theme.palette.gantt.target.dark.background,
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%)',
    padding: theme.spacing(0, 1),
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

export default function GanttTarget({ target }) {
    const dispatch = useDispatch()

    const { id, portfolioId, startDate, dueDate, title, type } = target
    const dateString = parseDate(startDate, dueDate)
    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))
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

    const [open, setOpen] = useState(false)
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
        <Tooltip title = {<GanttTargetTooltip target = {target}/>} arrow followCursor>
            <StyledDiv data-testid = {'GanttTarget__container_' + id} ref = {ref} style = {transitionStyles} >
                <StyledHeader>
                    <div style = {{ maxWidth: `calc(100% - ${permissions.edit ? 106 : 30}px)` }}>
                        <GanttEntryHeader title = {title} dateRange = {dateString} />
                    </div>
                    <div style = {{ display: 'flex', maxHeight: '40px' }}>
                        {permissions.edit &&
                            <GanttActionButtons onEditClick = {updateTarget} onDeleteClick = {deleteTarget}/>
                        }
                        <IconButton
                            data-testid = {'GanttTarget__expandButton_' + (open ? 'open' : 'closed')}
                            onClick = {expandButtonHandler}
                        >
                            <ExpandMore
                                style = {{
                                    transform: `rotate(${open ? 180 : 0}deg)`,
                                    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
                                }}
                            />
                        </IconButton>
                    </div>
                </StyledHeader>
                <Collapse
                    in = {open}
                    collapsedSize = {0}
                    easing = {'cubic-bezier(1,-0.01, 0.69, 1.01)'}
                >
                    <Typography>
                        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                        Aliquam eget maximus est, id dignissim quam.
                    </Typography>
                </Collapse>
            </StyledDiv>
        </Tooltip>
    )
}

GanttTarget.propTypes = {
    target: PropTypes.shape({
        id: PropTypes.number,
        portfolioId: PropTypes.number,
        title: PropTypes.string,
        type: PropTypes.string,
        startDate: PropTypes.string,
        dueDate: PropTypes.string
    }).isRequired
}