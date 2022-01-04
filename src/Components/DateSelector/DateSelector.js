import { DatePicker } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { TextField } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { dateInDatabaseOrder, dateInDisplayOrder } from 'Utilities/dateHelpers'

export default function DateSelector({
    clearable, disableUnderline, hasEdit, initialValue, inputFormat, minDate, onAccept,
    placeholder, variant, ...datePickerProps }) {

    const [value, setValue] = useState(initialValue)
    const updatedDate = minDate?.replace('-', '/')

    const onChange = (newValue) => {
        if (newValue !== null) {
            setValue(dateInDisplayOrder(new Date(newValue).toISOString().split('T')[0]))
        } else {
            clearable && setValue(null)
            onAccept(null)
        }
    }

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return (
        <LocalizationProvider dateAdapter = {DateAdapter}>
            <DatePicker
                {...datePickerProps}
                desktopModeMediaQuery = 'true'
                inputFormat = {inputFormat}
                allowSameDateSelection
                value = {initialValue}
                clearable = {clearable}
                disabled = {!hasEdit}
                minDate = {new Date(updatedDate)}
                onChange = {onChange}
                onAccept = {() => {
                    onAccept(dateInDatabaseOrder(value))
                }}
                showToolbar = {false}
                InputProps = {{
                    disableUnderline: disableUnderline,
                    ...datePickerProps.InputProps
                }}
                renderInput = {(params) =>
                    <TextField
                        {...params}
                        placeholder = {placeholder}
                        InputLabelProps = {{ shrink: true }}
                        variant = {variant}
                        inputProps = {{
                            ...params.inputProps,
                            style: { padding: 0 }
                        }}
                    />
                }
            />
        </LocalizationProvider>
    )
}

DateSelector.propTypes = {
    clearable: PropTypes.bool,
    disableUnderline: PropTypes.bool,
    hasEdit: PropTypes.bool,
    initialValue: PropTypes.string,
    inputFormat: PropTypes.string,
    minDate: PropTypes.string,
    onAccept: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    revertOnEmpty: PropTypes.bool,
    variant: PropTypes.oneOf(['filled', 'outlined'])
}

DateSelector.defaultProps = {
    clearable: true,
    disableUnderline: false,
    hasEdit: false,
    initialValue: null,
    inputFormat: 'MM/dd/yyyy',
    minDate: null,
    placeholder: 'mm/dd/yyyy',
    revertOnEmpty: false,
    variant: undefined
}