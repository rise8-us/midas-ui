import { Box, TextField } from '@mui/material'
import { DateSelector } from 'Components/DateSelector'
import { Popup } from 'Components/Popup'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import { useMemo, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from 'Redux/Errors/selectors'
import { requestCreateMilestone, requestUpdateMilestone } from 'Redux/Milestones/actions'
import MilestoneConstants from 'Redux/Milestones/constants'
import { selectMilestoneById } from 'Redux/Milestones/selectors'
import { closePopup } from 'Redux/Popups/actions'
import { getDateInDisplayOrder } from 'Utilities/dateHelpers'

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Milestone' : 'Update Milestone',
        constant: create ? MilestoneConstants.CREATE_MILESTONE : MilestoneConstants.UPDATE_MILESTONE,
        request: (data) => create ? requestCreateMilestone(data) : requestUpdateMilestone(data)
    }
}

function MilestonePopup({ id, portfolioId }) {
    const dispatch = useDispatch()

    const milestone = useSelector(state => selectMilestoneById(state, id))
    const context = initDetails(milestone.id === undefined)

    const errors = useSelector(state => selectRequestErrors(state, context.constant))
    const titleError = useMemo(() => errors.filter(error => error.includes('title')), [errors])
    const dueDateError = useMemo(() => errors.filter(error => error.includes('due')), [errors])

    const [formValues, formDispatch] = useReducer(useFormReducer, {
        title: milestone.title,
        description: milestone.description,
        dueDate: milestone.dueDate
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
            ...milestone,
            title: formValues.title,
            description: formValues.description,
            dueDate: formValues.dueDate,
            portfolioId: portfolioId
        }))
    }

    return (
        <Popup
            title = {context.title}
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Title'
                    data-testid = 'MilestonePopup__input-title'
                    value = { formValues.title }
                    onChange = {(e) => handleChange('title', e.target.value)}
                    error = { titleError.length > 0 }
                    helperText = { titleError[0] ?? 'Please enter a valid title' }
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Description'
                    data-testid = 'MilestonePopup__input-description'
                    value = { formValues.description }
                    onChange = {(e) => handleChange('description', e.target.value)}
                    margin = 'dense'
                    multiline
                />
                <Box display = 'flex' justifyContent = 'flex-start' paddingTop = '40px'>
                    <DateSelector
                        label = 'Due Date'
                        minDate = {milestone.startDate}
                        initialValue = {getDateInDisplayOrder(formValues.dueDate)}
                        onAccept = {(value) => handleChange('dueDate', value)}
                        hasEdit = {true}
                        errors = {dueDateError}
                    />
                </Box>
            </Box>
        </Popup>
    )
}

MilestonePopup.propTypes = {
    id: PropTypes.number,
    portfolioId: PropTypes.number.isRequired
}

MilestonePopup.defaultProps = {
    id: undefined
}

export default MilestonePopup