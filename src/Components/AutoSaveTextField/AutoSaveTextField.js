import { TextField } from '@mui/material'
import { LabelTooltip } from 'Components/LabelTooltip'
import PropTypes from 'prop-types'
import { useEffect, useMemo, useRef, useState } from 'react'
import FormatErrors from 'Utilities/FormatErrors'
import { getTextWidth } from 'Utilities/textHelpers'

const performAction = (canDo, action, value) => canDo && action(value)

const doubleValidate = (first, second) => first && second ? true : false

const generateUID = (uniqueId) => uniqueId ?? Date.now().valueOf().toString()

const handleKeyDown = (keyPress, ref, setValue, setInEditMode, initialValue) => {
    if (keyPress === 'Enter') ref.current.blur()
    else if (keyPress === 'Escape') {
        setValue(initialValue)
        setInEditMode(false)
    }
}

const checkToSave = (canEdit, showCharCount, titleLengthError) =>
    !(!canEdit || (showCharCount && titleLengthError))

const hasErrors = (errors, showCharCount, titleLengthError) =>
    errors.length > 0 || (showCharCount && titleLengthError)

function AutoSaveTextField({
    autogrow, canEdit, className, dataTestId, enableSpellCheck, errors,
    initialValue, onSave, clearAfterSave, revertOnEmpty, tooltip, uniqueId,
    onHoverChange, maxLength, ...textFieldProps }) {

    const ref = useRef()
    const divRef = useRef()

    const customId = useMemo(() => generateUID(uniqueId), [uniqueId])

    const [inEditMode, setInEditMode] = useState(false)
    const [value, setValue] = useState(initialValue)

    const [hasHover, setHasHover] = useState(false)
    const titleLengthError = useMemo(() => value?.length > maxLength)
    const showCharCount = maxLength > 0

    const onChange = (event) => {
        event.stopPropagation()
        setValue(event.target.value)
    }

    const onMouseEnter = () => {
        performAction(canEdit, setHasHover, true)
    }

    const onMouseLeave = () => {
        setHasHover(false)
    }

    const onMouseDown = (event) => {
        event.stopPropagation()
        performAction(canEdit, setInEditMode, true)
    }

    const onFocus = (event) => {
        event.stopPropagation()
        performAction(canEdit, setInEditMode, true)

        event.target.setSelectionRange(0, event.target.value.length)
    }

    const onBlur = (event) => {
        event.stopPropagation()
        setInEditMode(false)
        executeSave()
    }

    const onKeyDown = (event) => {
        event.stopPropagation()
        handleKeyDown(event.key, ref, setValue, setInEditMode, initialValue)
    }

    const executeSave = () => {
        if (!checkToSave(canEdit, showCharCount, titleLengthError)) return

        if (!revertOnEmpty || (revertOnEmpty && value.trim().length > 0)) {
            onSave(value)
            performAction(clearAfterSave, setValue, '')
        } else {
            setValue(initialValue)
        }
    }

    const getHelperText = () => {
        const finalErrors = [...errors]

        titleLengthError && finalErrors.unshift(
            `${value.length}/${maxLength}` + '. Max character limit reached. Changes will not be saved.')

        return <FormatErrors errors = {finalErrors}/>
    }

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        autogrow && (divRef.current.style.width = getTextWidth(customId))
    }, [value])

    useEffect(() => {
        onHoverChange(hasHover)
    }, [hasHover])

    return (
        <TextField
            {...textFieldProps}
            id = {customId}
            InputProps = {{
                ref: divRef,
                spellCheck: enableSpellCheck,
                disableUnderline: doubleValidate(!inEditMode, !hasHover),
                'data-testid': dataTestId,
                className,
                readOnly: !canEdit,
                ...textFieldProps.InputProps,
            }}
            inputProps = {{
                ref,
                ...textFieldProps.inputProps
            }}
            value = {value}
            label = {doubleValidate(textFieldProps.label, tooltip)
                ? <LabelTooltip
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
                : textFieldProps.label
            }
            onFocus = {inEditMode ? onFocus : undefined}
            onMouseEnter = {onMouseEnter}
            onMouseLeave = {onMouseLeave}
            onMouseDown = {onMouseDown}
            onBlur = {onBlur}
            onKeyDown = {onKeyDown}
            onChange = {onChange}
            error = {hasErrors(errors, showCharCount, titleLengthError)}
            helperText = {showCharCount ? getHelperText() : <FormatErrors errors = {errors}/>}
        />
    )
}

AutoSaveTextField.propTypes = {
    autogrow: PropTypes.bool,
    canEdit: PropTypes.bool,
    className: PropTypes.string,
    clearAfterSave: PropTypes.bool,
    dataTestId: PropTypes.string,
    enableSpellCheck: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.string),
    fullWidth: PropTypes.bool,
    initialValue: PropTypes.string,
    InputLabelProps: PropTypes.shape({
        className: PropTypes.string
    }),
    label: PropTypes.string,
    maxLength: PropTypes.number,
    multiline: PropTypes.bool,
    name: PropTypes.string,
    onHoverChange: PropTypes.func,
    onSave: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    revertOnEmpty: PropTypes.bool,
    tooltip: PropTypes.string,
    uniqueId: PropTypes.string,
}

AutoSaveTextField.defaultProps = {
    autogrow: false,
    canEdit: false,
    className: '',
    clearAfterSave: false,
    dataTestId: 'AutoSaveTextField__input',
    enableSpellCheck: false,
    errors: [],
    fullWidth: false,
    initialValue: '',
    InputLabelProps: undefined,
    label: undefined,
    maxLength: -1,
    multiline: false,
    name: '',
    onHoverChange: (e) => e,
    placeholder: '',
    revertOnEmpty: false,
    tooltip: '',
    uniqueId: null
}

export default AutoSaveTextField