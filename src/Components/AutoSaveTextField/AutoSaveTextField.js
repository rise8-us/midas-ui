import { TextField } from '@mui/material'
import { LabelTooltip } from 'Components/LabelTooltip'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import FormatErrors from 'Utilities/FormatErrors'

function AutoSaveTextField({
    canEdit, className, dataTestId, enableSpellCheck, errors,
    initialValue, onSave, clearAfterSave, tooltip, ...textFieldProps }) {

    const ref = useRef()

    const [inEditMode, setInEditMode] = useState(false)
    const [value, setValue] = useState(initialValue)

    const [hasHover, setHasHover] = useState(false)

    const onChange = (event) => {
        event.stopPropagation()
        setValue(event.target.value)
    }

    const onMouseEnter = () => {
        canEdit && setHasHover(true)
    }

    const onMouseLeave = () => {
        setHasHover(false)
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
        executeSave()
    }

    const onKeyDown = (event) => {
        event.stopPropagation()

        if (event.key === 'Enter') {
            ref.current.blur()
        } else if (event.key === 'Escape') {
            setValue(initialValue)
            setInEditMode(false)
        }
    }

    const executeSave = () => {
        canEdit && onSave(value)
        clearAfterSave && setValue('')
    }

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return (
        <TextField
            {...textFieldProps}
            InputProps = {{
                spellCheck: enableSpellCheck,
                disableUnderline: !inEditMode && !hasHover,
                'data-testid': dataTestId,
                className,
                readOnly: !canEdit
            }}
            inputProps = {{
                ref,
                ...textFieldProps.inputProps
            }}
            value = {value}
            label = {textFieldProps.label &&
                <LabelTooltip
                    text = {textFieldProps.label}
                    typographyProps = {{
                        variant: 'h6',
                        color: 'text.primary'
                    }}
                    tooltipProps = {{
                        title: tooltip,
                        placement: 'bottom-start',
                        enterDelay: 500,
                        arrow: true
                    }}
                    iconFontSize = 'small'
                />
            }
            onFocus = {onFocus}
            onMouseEnter = {onMouseEnter}
            onMouseLeave = {onMouseLeave}
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
    clearAfterSave: PropTypes.bool,
    tooltip: PropTypes.string,
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
    clearAfterSave: false,
    tooltip: '',
}

export default AutoSaveTextField