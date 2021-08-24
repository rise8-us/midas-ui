import { TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import FormatErrors from '../../Utilities/FormatErrors'

function AutoSaveTextField({
    canEdit, className, dataTestId, enableSpellCheck, errors, initialValue, onSave, ...textFieldProps }) {

    const [inEditMode, setInEditMode] = useState(false)
    const [value, setValue] = useState(initialValue)

    const onChange = (event) => {
        event.stopPropagation()
        setValue(event.target.value)
    }

    const onMouseDown = (event) => {
        event.stopPropagation()
        canEdit && setInEditMode(true)
    }

    const onFocus = (event) => {
        event.stopPropagation()
        canEdit && setInEditMode(true)
        event.target.setSelectionRange(0, event.target.value.length)
    }

    const onBlur = (event) => {
        event.stopPropagation()
        setInEditMode(false)
        canEdit && onSave(value)
    }

    const onKeyDown = (event) => {
        event.stopPropagation()

        if (event.key === 'Enter') {
            canEdit && onSave(value)
            setInEditMode(false)
        } else if (event.key === 'Escape') {
            setValue(initialValue)
            setInEditMode(false)
        }
    }

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return (
        <TextField
            {...textFieldProps}
            InputProps = {{
                spellCheck: enableSpellCheck,
                disableUnderline: !inEditMode,
                'data-testid': dataTestId,
                className,
                readOnly: !canEdit
            }}
            value = {value}
            onFocus = {onFocus}
            onMouseDown = {onMouseDown}
            onBlur = {onBlur}
            onKeyDown = {onKeyDown}
            onChange = {onChange}
            error = { errors.length > 0 }
            helperText = {errors.length === 0 ? null : <FormatErrors errors = {errors}/>}
        />
    )
}

AutoSaveTextField.propTypes = {
    canEdit: PropTypes.bool,
    className: PropTypes.string,
    dataTestId: PropTypes.string,
    enableSpellCheck: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.string),
    fullWidth: PropTypes.bool,
    initialValue: PropTypes.string,
    InputLabelProps: PropTypes.shape({
        className: PropTypes.string
    }),
    label: PropTypes.string,
    multiline: PropTypes.bool,
    name: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
}

AutoSaveTextField.defaultProps = {
    canEdit: false,
    className: '',
    dataTestId: 'AutoSaveTextField__input',
    enableSpellCheck: false,
    errors: [],
    fullWidth: false,
    initialValue: '',
    InputLabelProps: undefined,
    label: undefined,
    multiline: false,
    name: '',
    placeholder: '',
}

export default AutoSaveTextField