import React from 'react'
import PropTypes from 'prop-types'
import { CirclePicker } from 'react-color'
import { TextField } from '@material-ui/core'

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
            <div style = {{ paddingTop: '20px', paddingLeft: '35px' }}>
                <CirclePicker
                    color = {color}
                    onChange = {onColorPickerChange} />
            </div>
        </div>
    )
}

export default ColorPicker

ColorPicker.propTypes = {
    onColorPickerChange: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    colorError: PropTypes.array.isRequired
}