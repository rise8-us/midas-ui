import { Tooltip } from '@mui/material'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { requestDeleteEvent } from 'Redux/Events/actions'
import EventConstants from 'Redux/Events/constants'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { styled } from 'Styles/materialThemes'
import { parseDate } from 'Utilities/ganttHelpers'
import { GanttEntryHeader } from '../GanttEntryHeader'
import { GanttEventTooltip } from '../GanttEventTooltip'

const StyledDiv = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    width: 'fit-content',
    maxWidth: 'calc(100vw - 48px - 76vw)',
    minHeight: '40px',
    background: theme.palette.gantt.event.dark.background,
    color: theme.palette.gantt.event.dark.text,
    padding: theme.spacing(0, 1),
    textAlign: 'left',
    borderRadius: '4px',
    border: `1px solid ${theme.palette.background.paper}`,
    alignItems: 'center',
    '&:hover': {
        boxShadow: '0px 0px 16px 0px black',
    }
}))

export default function GanttEvent({ event }) {
    const dispatch = useDispatch()

    const { id, portfolioId, startDate, dueDate, title, type } = event

    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))
    const dateString = parseDate(startDate, dueDate)

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
            <StyledDiv>
                <div>
                    <GanttEntryHeader title = {event.title} dateRange = {dateString} />
                </div>
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
}