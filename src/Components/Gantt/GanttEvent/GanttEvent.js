import { Tooltip, useTheme } from '@mui/material'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestDeleteEvent } from 'Redux/Events/actions'
import EventConstants from 'Redux/Events/constants'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { styled } from 'Styles/materialThemes'
import { calculatePosition, parseStringToDate } from 'Utilities/dateHelpers'
import { parseDate } from 'Utilities/ganttHelpers'
import { GanttEntryHeader } from '../GanttEntryHeader'
import { GanttEventTooltip } from '../GanttEventTooltip'

const StyledDiv = styled('div')(({ theme, minwidth }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    width: 'fit-content',
    minWidth: minwidth,
    minHeight: '40px',
    height: '100%',
    background: theme.palette.gantt.event.light.background,
    color: theme.palette.gantt.event.light.text,
    padding: theme.spacing(0, 1),
    textAlign: 'left',
    borderRadius: '4px',
    border: `1px solid ${theme.palette.background.paper}`,
    alignItems: 'center',
    '&:hover': {
        boxShadow: '0px 0px 16px 0px black',
    },
}))

export default function GanttEvent({ event, dateRange }) {
    const dispatch = useDispatch()

    const { id, portfolioId, startDate, dueDate, title, type } = event

    const theme = useTheme()
    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))
    const dateString = parseDate(startDate, dueDate)

    const start = parseStringToDate(startDate)
    const due = parseStringToDate(dueDate)
    const duration = calculatePosition([start, due], dateRange)[1]

    const updateEvent = (e) => {
        e.stopPropagation()
        dispatch(
            openPopup(EventConstants.UPDATE_EVENT, 'EventPopup', { id: event.id, portfolioId })
        )
    }

    const deleteEvent = (e) => {
        e.stopPropagation()
        dispatch(openPopup(EventConstants.DELETE_EVENT, 'DeletePopup', {
            id: id,
            title: title,
            type: type,
            request: requestDeleteEvent,
            constant: EventConstants.DELETE_EVENT
        }))
    }

    const minWidth = useMemo(() => `calc(${duration}vw - ${duration * .48}px)`, [duration])

    const eventDurationStyle = {
        position: 'absolute',
        left: 0,
        width: minWidth,
        height: '100%',
        backgroundColor: theme.palette.gantt.event.dark.background,
        borderRadius: '3px',
    }

    return (
        <Tooltip
            arrow
            title = {
                <GanttEventTooltip
                    event = {event}
                    permissions = {permissions}
                    dateRange = {dateString}
                    onEditClick = {updateEvent}
                    onDeleteClick = {deleteEvent}
                />
            }
        >
            <StyledDiv minwidth = {minWidth}>
                <div style = {{  zIndex: 1, maxWidth: 'calc(100vw - 76vw - 48px)' }}>
                    <GanttEntryHeader title = {event.title} dateRange = {dateString} />
                </div>
                <div style = {eventDurationStyle} />
            </StyledDiv>
        </Tooltip>
    )
}

GanttEvent.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        startDate: PropTypes.string,
        dueDate: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string,
        portfolioId: PropTypes.number,
        type: PropTypes.string,
        organizerIds: PropTypes.arrayOf(PropTypes.number)
    }).isRequired,
    dateRange: PropTypes.array.isRequired
}
