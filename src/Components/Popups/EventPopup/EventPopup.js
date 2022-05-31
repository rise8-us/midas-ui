import { Stack, TextField } from '@mui/material'
import { DateSelector } from 'Components/DateSelector'
import { Popup } from 'Components/Popup'
import { UsersCollection } from 'Components/UsersCollection'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import { useMemo, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from 'Redux/Errors/selectors'
import { requestCreateEvent, requestUpdateEvent } from 'Redux/Events/actions'
import EventConstants from 'Redux/Events/constants'
import { selectEventById } from 'Redux/Events/selectors'
import { closePopup } from 'Redux/Popups/actions'
import { getDateInDisplayOrder } from 'Utilities/dateHelpers'

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Event' : 'Update Event',
        constant: create ? EventConstants.CREATE_EVENT : EventConstants.UPDATE_EVENT,
        request: (data) => create ? requestCreateEvent(data) : requestUpdateEvent(data)
    }
}

function EventPopup({ id, portfolioId }) {
    const dispatch = useDispatch()
    const event = useSelector(state => selectEventById(state, id))
    const context = initDetails(event.id === undefined)

    const errors = useSelector(state => selectRequestErrors(state, context.constant))
    const titleError = useMemo(() => errors.filter(error => error.includes('title')), [errors])
    const startDateError = useMemo(() => errors.filter(error => error.includes('start')), [errors])
    const dueDateError = useMemo(() => errors.filter(error => error.includes('due')), [errors])

    const [formValues, formDispatch] = useReducer(useFormReducer, {
        title: event.title,
        description: event.description,
        startDate: event.startDate,
        dueDate: event.dueDate,
        location: event.location,
        organizerIds: event.organizerIds,
        attendeeIds: event.attendeeIds
    })

    const handleChange = (name, value) => {
        formDispatch({
            type: 'onChange',
            payload: { name, value }
        })
    }

    const onClose = () => dispatch(closePopup(context.constant))

    const onSubmit = () => {
        dispatch(context.request({
            ...event,
            portfolioId: portfolioId,
            title: formValues.title,
            description: formValues.description,
            startDate: formValues.startDate,
            dueDate: formValues.dueDate,
            location: formValues.location,
            organizerIds: formValues.organizerIds,
            attendeeIds: formValues.attendeeIds,
        }))
    }

    return (
        <Popup
            title = {context.title}
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Stack spacing = {1}>
                <TextField
                    label = 'Title'
                    data-testid = 'EventPopup__input-title'
                    value = {formValues.title}
                    onChange = {(e) => handleChange('title', e.target.value)}
                    error = {titleError.length > 0}
                    helperText = {titleError[0]}
                    multiline
                    required
                />
                <TextField
                    label = 'Description'
                    data-testid = 'EventPopup__input-description'
                    value = {formValues.description}
                    onChange = {(e) => handleChange('description', e.target.value)}
                    multiline
                />
                <TextField
                    label = 'Location'
                    data-testid = 'EventPopup__input-location'
                    value = {formValues.location}
                    onChange = {(e) => handleChange('location', e.target.value)}
                    multiline
                    fullWidth
                />
                <Stack spacing = {2} direction = 'row' paddingTop = '8px'>
                    <DateSelector
                        label = 'Start Date'
                        initialValue = {getDateInDisplayOrder(formValues.startDate)}
                        onAccept = {(value) => handleChange('startDate', value)}
                        hasEdit = {true}
                        errors = {startDateError}
                        required
                        fullWidth
                    />
                    <DateSelector
                        label = 'Due Date'
                        minDate = {event.startDate}
                        initialValue = {getDateInDisplayOrder(formValues.dueDate)}
                        onAccept = {(value) => handleChange('dueDate', value)}
                        hasEdit = {true}
                        errors = {dueDateError}
                        required
                        fullWidth
                    />
                </Stack>
                <UsersCollection
                    userIds = {formValues.organizerIds}
                    setUserIds = {(value) => handleChange('organizerIds', value)}
                    placeholderValue = 'Add organizer...'
                    userListPosition = 'top'
                    title = 'Organizers'
                />
                <UsersCollection
                    userIds = {formValues.attendeeIds}
                    setUserIds = {(value) => handleChange('attendeeIds', value)}
                    placeholderValue = 'Add guest...'
                    userListPosition = 'top'
                    title = 'Guests'
                />
            </Stack>
        </Popup>
    )
}

EventPopup.propTypes = {
    id: PropTypes.number,
    portfolioId: PropTypes.number.isRequired
}

EventPopup.defaultProps = {
    id: undefined
}

export default EventPopup