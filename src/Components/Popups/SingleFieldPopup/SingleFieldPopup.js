import { TextField } from '@mui/material'
import { Popup } from 'Components/Popup'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

export default function SingleFieldPopup({ isOpen, initialValue, onSubmit, onClose, title, subtitle }) {

    const [val, setVal] = useState(initialValue)

    useEffect(() => {
        !isOpen && setVal(initialValue)
    }, [initialValue])

    return (
        <Popup
            open = {isOpen}
            title = {title}
            subtitle = {subtitle}
            subtitleVariant = 'body2'
            onSubmit = {() => onSubmit(val)}
            onClose = {() => onClose(false)}
            hideRequiredText
            disableDefaultPadding
            disableDefaultDivider
        >
            <TextField
                inputRef = {input => input && input.focus()}
                data-testid = 'SingleFieldPopup__input'
                value = {val}
                variant = 'outlined'
                placeholder = 'No current value set...'
                onChange = {(e) => setVal(e.target.value)}
                fullWidth
                multiline
                spellCheck
            />
        </Popup>
    )
}

SingleFieldPopup.propTypes = {
    isOpen: PropTypes.bool,
    initialValue: PropTypes.string,
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    subtitle: PropTypes.string,
}

SingleFieldPopup.defaultProps = {
    isOpen: false,
    initialValue: '',
    subtitle: undefined,
}