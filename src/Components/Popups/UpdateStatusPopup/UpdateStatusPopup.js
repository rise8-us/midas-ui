import { Autocomplete, Stack, TextField } from '@mui/material'
import { Popup } from 'Components/Popup'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAssertionStatuses } from 'Redux/AppSettings/selectors'
import { requestCreateComment } from 'Redux/Comments/actions'
import { closePopup } from 'Redux/Popups/actions'

export default function UpdateStatusPopup({ assertionId, measureId }) {
    const dispatch = useDispatch()

    const assertionStatuses = useSelector(selectAssertionStatuses)

    const [selectedStatus, setSelectedStatus] = useState(null)
    const [text, setText] = useState('')
    const [errors, setErrors] = useState({ text: false, status: false })

    const onSubmit = () => {
        if (selectedStatus && text.trim().length) {
            dispatch(requestCreateComment({
                assertionId,
                measureId,
                text: `${text}###${selectedStatus.name}`
            })).then(() => dispatch(closePopup('UpdateStatusPopup')))
        } else {
            const statusError = selectedStatus === null
            const textError = text.trim().length === 0
            setErrors({ text: textError, status: statusError })
        }
    }

    const onClose = () => dispatch(closePopup('UpdateStatusPopup'))

    const handleTextChange = (e) => {
        const value = e.target.value

        if (value.trim().length === 0) setErrors({ ...errors, text: true })
        else setErrors({ ...errors, text: false })

        setText(value)
    }

    const handleStatusChange = (e, value) => {
        e.preventDefault()
        if (value?.name) setErrors({ ...errors, status: false })
        else setErrors({ ...errors, status: true })

        setSelectedStatus(value)
    }

    return (
        <Popup
            onSubmit = {onSubmit}
            onClose = {onClose}
            title = 'Update Status'
        >
            <Stack spacing = {1}>
                <Autocomplete
                    value = {selectedStatus}
                    onChange = {handleStatusChange}
                    options = {Object.values(assertionStatuses)}
                    renderInput = {(params) =>
                        <TextField
                            {...params}
                            error = {errors.status}
                            helperText = {errors.status && 'Status cannot be blank!'}
                            label = 'Status'
                        />}


                />
                <TextField
                    multiline
                    label = 'Details'
                    placeholder = 'Enter your status update here'
                    value = {text}
                    onChange = {handleTextChange}
                    error = {errors.text}
                    helperText = {errors.text && 'Details cannot be blank!'}
                />
            </Stack>
        </Popup>
    )
}

UpdateStatusPopup.propTypes = {
    assertionId: PropTypes.number,
    measureId: PropTypes.number,
}

UpdateStatusPopup.defaultProps = {
    assertionId: null,
    measureId: null
}
