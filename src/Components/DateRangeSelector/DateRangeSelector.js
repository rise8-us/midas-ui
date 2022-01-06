import { Clear } from '@mui/icons-material'
import { DateRangePicker } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Box, Grow, IconButton, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { getDateInDisplayOrder } from 'Utilities/dateHelpers'

export const DateTextField = React.forwardRef(({ inputProps, onChange, ...textFieldProps }, ref) =>  {
    const [hover, setHover] = useState(false)

    return (
        <TextField
            ref = {ref}
            {...textFieldProps}
            onMouseOver = {() => setHover(true)}
            onMouseOut = {() => setHover(false)}
            onChange = {onChange}
            size = 'small'
            label = {undefined}
            style = {{ width: '135px' }}
            inputProps = {{
                ...inputProps,
                style: { padding: 0, marginLeft: '6px' }
            }}
            InputProps = {{
                style: { height: '26px' },
                endAdornment: (
                    <Grow in = {hover} unmountOnExit mountOnEnter>
                        <IconButton
                            size = 'small'
                            style = {{ padding: '2px', left: '11px' }}
                            onClick = {() => onChange(null)}
                        >
                            <Clear fontSize = '16px'/>
                        </IconButton>
                    </Grow>
                )
            }}
        />
    )
})

DateTextField.displayName = 'DateTextField'

DateTextField.propTypes = {
    inputProps: PropTypes.shape({
        onChange: PropTypes.func,
        value: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired
}

export default function DateRangeSelector(props) {
    const { disableUnderline, initialStart, initialEnd, onSelect, variant, ...dateRangePickerProps } = props

    const [startDate, setStartDate] = useState(initialStart)
    const [endDate, setEndDate] = useState(initialEnd)

    const onChange = ([newStart, newEnd]) => {
        setStartDate(newStart)
        setEndDate(newEnd)
    }

    useEffect(() => {
        onSelect(startDate, endDate)
    }, [startDate, endDate])

    return (
        <LocalizationProvider dateAdapter = {DateAdapter}>
            <DateRangePicker
                {...dateRangePickerProps}
                calendars = {1}
                value = {[getDateInDisplayOrder(initialStart), getDateInDisplayOrder(initialEnd)]}
                onChange = {onChange}
                InputProps = {{
                    disableUnderline: disableUnderline,
                    ...dateRangePickerProps.InputProps
                }}
                renderInput = {(startProps, endProps) => (
                    <>
                        <DateTextField
                            {...startProps}
                            variant = {variant}
                            onChange = {setStartDate}
                        />
                        <Box marginX = {1}> to </Box>
                        <DateTextField
                            {...endProps}
                            variant = {variant}
                            onChange = {setEndDate}
                        />
                    </>
                )}
            />
        </LocalizationProvider>
    )
}

DateRangeSelector.propTypes = {
    disableUnderline: PropTypes.bool,
    initialStart: PropTypes.string,
    initialEnd: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['filled', 'outlined'])
}

DateRangeSelector.defaultProps = {
    disableUnderline: false,
    initialStart: null,
    initialEnd: null,
    variant: 'outlined'
}