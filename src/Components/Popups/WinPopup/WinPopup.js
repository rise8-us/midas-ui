import { Box, TextField } from '@mui/material'
import { DateSelector } from 'Components/DateSelector'
import { Popup } from 'Components/Popup'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import { useMemo, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from 'Redux/Errors/selectors'
import { closePopup } from 'Redux/Popups/actions'
import { requestCreateWin, requestUpdateWin } from 'Redux/Wins/actions'
import WinConstants from 'Redux/Wins/constants'
import { selectWinById } from 'Redux/Wins/selectors'
import { getDateInDisplayOrder } from 'Utilities/dateHelpers'

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Win' : 'Update Win',
        constant: create ? WinConstants.CREATE_WIN : WinConstants.UPDATE_WIN,
        request: (data) => create ? requestCreateWin(data) : requestUpdateWin(data)
    }
}

export default function WinPopup({ id, portfolioId }) {
    const dispatch = useDispatch()

    const win = useSelector(state => selectWinById(state, id))
    const context = initDetails(win.id === undefined)

    const errors = useSelector(state => selectRequestErrors(state, context.constant))
    const titleError = useMemo(() => errors.filter(error => error.includes('title')), [errors])
    const dueDateError = useMemo(() => errors.filter(error => error.includes('due')), [errors])

    const [formValues, formDispatch] = useReducer(useFormReducer, {
        title: win.title,
        dueDate: win.dueDate
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
            ...win,
            title: formValues.title,
            dueDate: formValues.dueDate,
            description: '',
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
                    data-testid = 'WinPopup__input-title'
                    value = { formValues.title }
                    onChange = {(e) => handleChange('title', e.target.value)}
                    error = { titleError.length > 0 }
                    helperText = { titleError[0] ?? 'Please enter a valid title' }
                    margin = 'dense'
                    required
                />
                <Box display = 'flex' justifyContent = 'flex-start' paddingTop = '40px'>
                    <DateSelector
                        label = 'Date'
                        minDate = {win.startDate}
                        initialValue = {getDateInDisplayOrder(formValues.dueDate)}
                        onAccept = {(value) => handleChange('dueDate', value)}
                        hasEdit = {true}
                        errors = {dueDateError}
                        required
                    />
                </Box>
            </Box>
        </Popup>
    )
}

WinPopup.propTypes = {
    id: PropTypes.number,
    portfolioId: PropTypes.number.isRequired
}

WinPopup.defaultProps = {
    id: undefined
}