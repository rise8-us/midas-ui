import { Box, InputAdornment, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { CirclePicker } from 'react-color'

function ColorPicker({ onChange, errors, initialColor }) {

    const [color, setColor] = useState(initialColor)

    const onColorPickerChange = (colorPicked) => setColor(colorPicked.hex)
    const onColorInputChange = (e) => {
        e.target.value.match(/^#[0-9A-Fa-f]{0,6}$/) && setColor(e.target.value)
    }

    const validHex = (hex) => hex.toUpperCase().match(/^#[0-9A-F]{6}$/)

    useEffect(() => {
        if (validHex(color)) onChange(color)
        else (onChange(undefined))
    }, [color])

    return (
        <>
            <TextField
                label = 'Color'
                data-testid = 'ColorPicker__input-color'
                value = {color}
                error = { errors.length > 0 }
                helperText = { errors[0] ?? '' }
                onChange = {onColorInputChange}
                margin = 'dense'
                InputProps = {{
                    startAdornment: (
                        <InputAdornment position = 'start' style = {{ alignSelf: 'baseline' }}>
                            <input
                                type = 'color'
                                value = {validHex(color) ? color : '#FFFFFF'}
                                onChange = {onColorInputChange}
                                style = {{
                                    width: '24px',
                                    height: '24px',
                                    margin: 'auto 0',
                                    padding: 0,
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer'
                                }}
                            />
                        </InputAdornment>
                    ),
                }}
            />
            <Box display = 'flex' justifyContent = 'space-around' style = {{ paddingTop: '20px' }}>
                <CirclePicker
                    color = {validHex(color) ? color : undefined}
                    onChange = {onColorPickerChange}
                />
            </Box>
        </>
    )
}

export default ColorPicker

ColorPicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.array,
    initialColor: PropTypes.string
}

ColorPicker.defaultProps = {
    errors: [],
    initialColor: '#'
}