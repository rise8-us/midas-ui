import { Typography } from '@mui/material'
import { DatePopper } from 'Components/DatePopper'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { getDateInDatabaseOrder, getDateInDisplayOrder, parseStringToDate } from 'Utilities/dateHelpers'
import FormatErrors from 'Utilities/FormatErrors'

const generateSx = (hasValue, disableUnderline, primaryColor, secondaryColor, hasEdit) => {
    const defaultSx = {}
    const hoverSx = {}

    const underlineColor = hasEdit ? primaryColor : secondaryColor
    const underlineStyle = hasEdit ? 'solid' : 'dotted'

    if (disableUnderline) {
        defaultSx.borderBottom = 'none'
        hoverSx.borderBottom = 'none'
    } else if (hasEdit) {
        defaultSx.borderBottom = `1px ${underlineStyle} ${underlineColor}`
        hoverSx.borderBottom = `2px ${underlineStyle} ${underlineColor}`
        defaultSx.marginBottom = '1px'
        hoverSx.marginBottom = 0
    } else {
        defaultSx.borderBottom = `1px ${underlineStyle} ${underlineColor}`
        hoverSx.borderBottom = `1px ${underlineStyle} ${underlineColor}`
        defaultSx.marginBottom = '1px'
    }

    return {
        color: hasValue ? primaryColor : secondaryColor,
        ...defaultSx,
        '&:hover': {
            ...hoverSx
        }
    }
}

export default function DateSelector({
    clearable,
    disableUnderline,
    errors,
    fullWidth,
    hasEdit,
    initialValue,
    inputFormat,
    label,
    minDate,
    onAccept,
    placeholder,
    required,
    variant,
}) {
    const ref = useRef()

    const [value, setValue] = useState(initialValue)
    const [isOpen, setIsOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(ref.current)

    const handleOnChange = (newValue) => {
        setValue(getDateInDisplayOrder(newValue.toISOString()))
        onAccept(getDateInDatabaseOrder(newValue.toISOString()))
        setIsOpen(false)
    }

    const handleOnClick = () => {
        if (hasEdit) {
            setAnchorEl(ref.current)
            setIsOpen(true)
        }
    }

    const handleOnClear = () => {
        setValue(null)
        setIsOpen(false)
        onAccept(null)
    }

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return (
        <>
            <div ref = {ref} style = {{ width: fullWidth ? '100%' : 'unset' }}>
                {label &&
                    <Typography fontSize = '12px' color = {errors.length > 0 ? 'error' : 'secondary'}>
                        {label}{required ? '*' : null}
                    </Typography>
                }
                <Typography
                    variant = {variant}
                    onClick = {handleOnClick}
                    sx = {theme => generateSx(
                        value,
                        disableUnderline,
                        theme.palette.text.primary,
                        theme.palette.text.secondary,
                        hasEdit
                    )}
                >
                    {value ? format(parseStringToDate(getDateInDatabaseOrder(value)), inputFormat) : placeholder}
                </Typography>
                {errors.length > 0 &&
                    <Typography fontSize = '12px' color = 'error'>
                        <FormatErrors errors = {errors} />
                    </Typography>
                }
            </div>
            <DatePopper
                clearable = {clearable}
                isOpen = {isOpen}
                value = {value}
                setIsOpen = {setIsOpen}
                hasEdit = {hasEdit}
                handleOnChange = {handleOnChange}
                handleOnClear = {handleOnClear}
                minDate = {minDate}
                anchorEl = {anchorEl}
            />
        </>
    )
}

DateSelector.propTypes = {
    clearable: PropTypes.bool,
    disableUnderline: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.string),
    fullWidth: PropTypes.bool,
    hasEdit: PropTypes.bool,
    initialValue: PropTypes.string,
    inputFormat: PropTypes.string,
    label: PropTypes.string,
    minDate: PropTypes.string,
    onAccept: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    variant: PropTypes.string,
}

DateSelector.defaultProps = {
    clearable: true,
    disableUnderline: false,
    errors: [],
    fullWidth: false,
    hasEdit: false,
    initialValue: null,
    inputFormat: 'MMM dd, yyyy',
    label: undefined,
    minDate: null,
    placeholder: 'MMM dd yyyy',
    required: false,
    variant: undefined,
}