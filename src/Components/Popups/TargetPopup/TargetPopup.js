import { Box, ClickAwayListener, TextField } from '@mui/material'
import { DateSelector } from 'Components/DateSelector'
import { Popup } from 'Components/Popup'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import { useMemo, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from 'Redux/Errors/selectors'
import { closePopup } from 'Redux/Popups/actions'
import { requestCreateTarget, requestUpdateTarget } from 'Redux/Targets/actions'
import TargetConstants from 'Redux/Targets/constants'
import { selectTargetById } from 'Redux/Targets/selectors'
import { getDateInDisplayOrder } from 'Utilities/dateHelpers'
import FormatErrors from 'Utilities/FormatErrors'

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Target' : 'Update Target',
        constant: create ? TargetConstants.CREATE_TARGET : TargetConstants.UPDATE_TARGET,
        request: (data) => create ? requestCreateTarget(data) : requestUpdateTarget(data)
    }
}

function TargetPopup({ id, portfolioId }) {
    const dispatch = useDispatch()

    const target = useSelector(state => selectTargetById(state, id))
    const context = initDetails(target.id === undefined)
    const [hasFocus, setHasFocus] = useState(false)
    const maxLength = 280

    const errors = useSelector(state => selectRequestErrors(state, context.constant))
    const titleError = useMemo(() => errors.filter(error => error.includes('title')), [errors])
    const startDateError = useMemo(() => errors.filter(error => error.includes('start')), [errors])
    const dueDateError = useMemo(() => errors.filter(error => error.includes('due')), [errors])

    const [formValues, formDispatch] = useReducer(useFormReducer, {
        title: target.title,
        description: target.description,
        startDate: target.startDate,
        dueDate: target.dueDate
    })

    const titleLengthError = useMemo(() => formValues?.title.length > maxLength)

    const handleChange = (name, value) => {
        formDispatch({
            type: 'onChange',
            payload: { name, value }
        })
    }

    const onClose = () => dispatch(closePopup(context.constant))

    const onSubmit = () => {
        !titleLengthError &&
            dispatch(context.request({
                ...target,
                title: formValues.title,
                description: formValues.description,
                startDate: formValues.startDate,
                dueDate: formValues.dueDate,
                portfolioId: portfolioId
            }))
    }

    const onFocus = () => {
        setHasFocus(true)
    }

    const onClickAway = () => {
        setHasFocus(false)
    }

    const showTitleLength = () => {
        if (hasFocus || titleLengthError) {
            return `${formValues.title.length}/${maxLength}`
        }
    }

    return (
        <Popup
            title = {context.title}
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <ClickAwayListener onClickAway = {onClickAway}>
                    <TextField
                        label = 'Title'
                        data-testid = 'TargetPopup__input-title'
                        value = {formValues.title}
                        onChange = {(e) => handleChange('title', e.target.value)}
                        onFocus = {onFocus}
                        error = {titleError.length > 0 || titleLengthError}
                        helperText = {<FormatErrors errors = {[...titleError, showTitleLength()]}/>}
                        margin = 'dense'
                        required
                    />
                </ClickAwayListener>
                <TextField
                    label = 'Description'
                    data-testid = 'TargetPopup__input-description'
                    value = { formValues.description }
                    onChange = {(e) => handleChange('description', e.target.value)}
                    margin = 'dense'
                    multiline
                />
                <Box display = 'flex' justifyContent = 'space-between' paddingTop = '32px'>
                    <DateSelector
                        label = 'Start Date'
                        initialValue = {getDateInDisplayOrder(formValues.startDate)}
                        onAccept = {(value) => handleChange('startDate', value)}
                        hasEdit = {true}
                        errors = {startDateError}
                    />
                    <DateSelector
                        label = 'Due Date'
                        minDate = {target.startDate}
                        initialValue = {getDateInDisplayOrder(formValues.dueDate)}
                        onAccept = {(value) => handleChange('dueDate', value)}
                        hasEdit = {formValues.startDate ? true : false}
                        errors = {dueDateError}
                    />
                </Box>
            </Box>
        </Popup>
    )
}

TargetPopup.propTypes = {
    id: PropTypes.number,
    portfolioId: PropTypes.number.isRequired
}

TargetPopup.defaultProps = {
    id: undefined
}

export default TargetPopup