import { Box, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { CirclePicker } from 'react-color'

function ColorPicker({ onColorPickerChange, color, colorError }) {
    return (
        <div>
            <TextField
                label = 'Select Color'
                data-testid = 'ColorPicker__input-color'
                value = {color}
                error = { colorError.length > 0 }
                helperText = { colorError[0] ?? '' }
                margin = 'dense'
                disabled = {false}
                fullWidth
            />
            <Box display = 'flex' justifyContent = 'space-around' style = {{ paddingTop: '20px' }}>
                <CirclePicker
                    color = {color}
                    onChange = {onColorPickerChange} />
            </Box>
        </div>
    )
}

export default ColorPicker

ColorPicker.propTypes = {
    onColorPickerChange: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    colorError: PropTypes.array.isRequired
}