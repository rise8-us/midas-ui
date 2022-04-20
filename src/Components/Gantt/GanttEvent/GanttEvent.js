import { DeleteOutlined, Edit, Event } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import * as eventActions from 'Redux/Events/actions'
import EventConstants from 'Redux/Events/constants'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { styled } from 'Styles/materialThemes'
import { getMonthAbbreviated } from 'Utilities/dateHelpers'

const StyledDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '200px',
    minHeight: '40px',
    width: 'fit-content',
    background: theme.palette.success.main,
    color: 'black',
    padding: theme.spacing(0, 1),
    textAlign: 'center',
    borderRadius: '4px',
    alignItems: 'center',
    '&:hover': {
        boxShadow: '0px 0px 16px 0px black'
    }
}))

const parseDate = (startDate, endDate) => {
    if (startDate === null) startDate = endDate
    const [yearStart, monthStart, dayStart] = startDate.split('-')
    const [yearEnd, monthEnd, dayEnd] = endDate.split('-')
    const parsedMonth = (month) => parseInt(month) - 1

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
export default function GanttEvent({ event }) {
    const dispatch = useDispatch()

    const { id, portfolioId, startDate, dueDate, title } = event

    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))
    const dateString = parseDate(startDate, dueDate)

    const updateEventPopup = () => {
        dispatch(openPopup(EventConstants.UPDATE_EVENT, 'EventPopup', { id, portfolioId }))
    }

    const handleConfirmationPopup = () => {
        dispatch(openPopup(EventConstants.DELETE_EVENT, 'ConfirmationPopup',
            { onConfirm: handleConfirmDeleteEvent, onCancel: null,
                detail: `You are about to delete event: '${title}'` }))
    }

    const handleConfirmDeleteEvent = () => {
        dispatch(eventActions.requestDeleteEvent(id))
    }

    return (
        <StyledDiv>
            <Event fontSize = 'large'/>
            <div style = {{ minWidth: '160px' }}>
                <Typography>
                    {event.title}
                </Typography>
                <Typography>
                    {dateString}
                </Typography>
            </div>
            {permissions.edit &&
                <div style = {{ display: 'flex' }}>
                    <IconButton
                        size = 'small'
                        onClick = {updateEventPopup}
                        data-testid = 'Event__button-edit'
                    >
                        <Edit fontSize = 'small' htmlColor = 'black'/>
                    </IconButton>
                    <IconButton
                        size = 'small'
                        onClick = {handleConfirmationPopup}
                        data-testid = 'Event__button-delete'
                    >
                        <DeleteOutlined fontSize = 'small' htmlColor = 'black'/>
                    </IconButton>
                </div>
            }
        </StyledDiv>
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
}