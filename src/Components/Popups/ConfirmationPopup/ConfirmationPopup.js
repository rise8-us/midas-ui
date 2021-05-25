import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Popup } from '../../Popup'

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

    return (
        <Popup
            hideRequiredText
            title = {'Are you sure?'}
            open = {isOpen}
            subtitle = 'Please confirm or cancel'
            submitText = 'Confirm'
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