import { Typography } from '@mui/material'
import { Popup } from 'Components/Popup'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

function ConfirmationPopup({ onConfirm, onCancel, detail, open }) {

    const [isOpen, setIsOpen] = useState(open)

    const handleConfirm = (event) => {
        setIsOpen(false)
        typeof onConfirm === 'function' && onConfirm(event)
    }

    const handleCancel = (event) => {
        setIsOpen(false)
        typeof onCancel === 'function' && onCancel(event)
    }

    useEffect(() => isOpen !== open && setIsOpen(open), [open])

    return (
        <Popup
            hideRequiredText
            title = 'Are you sure?'
            open = {isOpen}
            subtitle = 'Please confirm or cancel'
            submitText = 'confirm'
            onClose = {handleCancel}
            onSubmit = {handleConfirm}
        >
            <Typography>{detail}</Typography>
        </Popup>
    )
}

ConfirmationPopup.propTypes = {
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    detail: PropTypes.string,
    open: PropTypes.bool
}

ConfirmationPopup.defaultProps = {
    onConfirm: undefined,
    onCancel: undefined,
    detail: '',
    open: true
}

export default ConfirmationPopup