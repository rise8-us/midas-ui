import { DatePicker } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { TextField } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { DateInDatabaseOrder, DateInDisplayOrder } from 'Utilities/dateHelpers'

export default function DateSelector({ initialValue, onAccept, clearable, hasEdit, variant, ...datePickerProps }) {
    const [value, setValue] = useState(initialValue)

    const onChange = (newValue) => {
        if (newValue !== null) {
            setValue(DateInDisplayOrder(new Date(newValue).toISOString().split('T')[0]))
        } else {
            clearable && setValue(null)
            onAccept(null)
        }
    }

    return (
        <LocalizationProvider dateAdapter = {DateAdapter}>
            <DatePicker
                {...datePickerProps}
                desktopModeMediaQuery = 'true'
                inputFormat = 'MM/dd/yyyy'
                allowSameDateSelection
                value = {value}
                clearable = {clearable}
                disabled = {!hasEdit}
                onChange = {onChange}
                onAccept = {() => onAccept(DateInDatabaseOrder(value))}
                showToolbar = {false}
                renderInput = {(params) =>
                    <TextField
                        {...params}
                        placeholder = 'mm/dd/yyyy'
                        InputLabelProps = {{ shrink: true }}
                        variant = {variant}
                    />
                }
            />
        </LocalizationProvider>
    )
}

DateSelector.propTypes = {
    clearable: PropTypes.bool,
    hasEdit: PropTypes.bool,
    initialValue: PropTypes.string,
    onAccept: PropTypes.func.isRequired,
    revertOnEmpty: PropTypes.bool,
    variant: PropTypes.oneOf(['filled', 'outlined'])
}

DateSelector.defaultProps = {
    clearable: true,
    hasEdit: false,
    initialValue: null,
    revertOnEmpty: false,
    variant: undefined
}