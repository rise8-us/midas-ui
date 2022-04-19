import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import EventIcon from '@mui/icons-material/Event'
import { Box, IconButton, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import * as eventActions from 'Redux/Events/actions'
import EventConstants from 'Redux/Events/constants'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { calculatePosition, getMonthAbbreviated, parseStringToDate } from 'Utilities/dateHelpers'

export default function GanttEvent({ event, dateRange }) {
    const dispatch = useDispatch()

    const parseDate = (startDate, endDate) => {
        if (startDate === null) startDate = endDate
        let [yearStart, monthStart, dayStart] = startDate.split('-')
        let [yearEnd, monthEnd, dayEnd] = endDate.split('-')
        const parsedMonth = (month) => { return parseInt(month) - 1 }

        if (startDate === endDate) {
            return `${dayStart} ${getMonthAbbreviated(parsedMonth(monthStart))} ${yearStart}`
        } else if (yearStart == yearEnd && monthStart == monthEnd) {
            return `${dayStart} - ${dayEnd} ${getMonthAbbreviated(parsedMonth(monthStart))} ${yearStart}`
        } else if (yearStart == yearEnd) {
            return `${dayStart} ${getMonthAbbreviated(parsedMonth(monthStart))}`
                    + ` - ${dayEnd} ${getMonthAbbreviated(parsedMonth(monthEnd))} ${yearStart}`
        } else {
            return `${dayStart} ${getMonthAbbreviated(parsedMonth(monthStart))} ${yearStart}` +
        ` - ${dayEnd} ${getMonthAbbreviated(parsedMonth(monthEnd))} ${yearEnd}`
        }
    }

    const eventIsLongerThanWidth = () => {
        if (event.startDate === null) {
            return false
        }
        const windowWidth = window.innerWidth
        return ((272 / windowWidth * 100) < duration) ? true : false
    }

    const portfolioId = event.portfolioId
    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))
    const dateString = parseDate(event.startDate, event.dueDate)
    const duration = (event.startDate) ?
        calculatePosition([parseStringToDate(event.startDate), parseStringToDate(event.dueDate)], dateRange)[1] : 0

    const updateEventPopup = () => {
        dispatch(
            openPopup(EventConstants.UPDATE_EVENT, 'EventPopup', { id: event.id, portfolioId })
        )
    }

    const handleConfirmationPopup = () => {
        dispatch(openPopup(EventConstants.DELETE_EVENT, 'ConfirmationPopup',
            { onConfirm: handleConfirmDeleteEvent, onCancel: null,
                detail: `You are about to delete event: '${event.title}'` }))
    }

    const handleConfirmDeleteEvent = () => {
        dispatch(eventActions.requestDeleteEvent(event.id))
    }

    const sxEventContainer = (theme) => {
        return {
            display: 'flex',
            justifyContent: 'space-between',
            width: `${eventIsLongerThanWidth() ? '100%' : '272px'}`,
            minHeight: '48px',
            height: 'fit-content',
            background: theme.palette.success.main,
            color: 'black',
            whiteSpace: 'pre-wrap',
            padding: '3px',
            textAlign: 'center',
            borderRadius: '5px',
            alignItems: 'center'
        }
    }

    return (
        <Box sx = {sxEventContainer}>
            <EventIcon fontSize = 'large'/>
            <Box>
                <Typography>
                    {event.title}
                </Typography>
                <Typography>
                    {dateString}
                </Typography>
            </Box>
            <Box sx = {{ width: 'fit-content', display: 'flex' }}>
                {permissions.edit &&
                    <>
                        <IconButton
                            size = 'small'
                            onClick = {updateEventPopup}
                            data-testid = 'Event__button-edit'
                        >
                            <EditIcon fontSize = 'small' htmlColor = 'black'/>
                        </IconButton>
                        <IconButton
                            size = 'small'
                            onClick = {handleConfirmationPopup}
                            data-testid = 'Event__button-delete'
                        >
                            <DeleteIcon fontSize = 'small' htmlColor = 'black'/>
                        </IconButton>
                    </>}
            </Box>
        </Box>
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
        portfolioId: PropTypes.number
    }).isRequired,
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired
}
GanttEvent.defaultProps = {
    startDate: undefined,
    children: undefined,
    disableDefaultCSS: false,
}