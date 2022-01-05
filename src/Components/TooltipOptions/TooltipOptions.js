import { Box, Checkbox, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

export default function TooltipOptions({ title, width, onChange, multiple, options }) {

    const [state, setState] = useState(
        options.reduce((currentState, nextItem) => {
            return {
                ...currentState,
                [nextItem.value]: nextItem.checked ?? false
            }
        }, {})
    )

    const handleOnChange = (key, checked) => {
        const newState = multiple
            ? { ...state, [key]: checked }
            : Object.keys(state).reduce((currentState, currentKey) => {
                currentState[currentKey] = key === currentKey ? checked : false
                return currentState
            }, {})

        setState(newState)
        onChange(key, checked)
    }

    return (
        <Stack width = {width} data-testid = 'TooltipOptions__wrap'>
            { title &&
                <Box display = 'flex' alignItems = 'center' justifyContent = 'start'>
                    <Typography color = 'secondary'>{title}</Typography>
                </Box>
            }
            {options.map((option, index) => (
                <Box display = 'flex' alignItems = 'center' justifyContent = 'space-between' key = {index}>
                    <label htmlFor = {'TooltipOptions__option-' + index}>
                        <Typography color = 'secondary' variant = 'caption'>{option.title}</Typography>
                    </label>
                    <Checkbox
                        size = 'small'
                        color = 'secondary'
                        checked = {state[option.value]}
                        id = {'TooltipOptions__option-' + index}
                        inputProps = {{
                            'data-testid': 'TooltipOptions__checkbox-' + index
                        }}
                        onChange = {(e) => handleOnChange(option.value, e.target.checked)}
                    />
                </Box>
            ))}
        </Stack>
    )
}

TooltipOptions.propTypes = {
    title: PropTypes.string,
    width: PropTypes.string,
    multiple: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        checked: PropTypes.bool,
        value: PropTypes.string
    })).isRequired
}

TooltipOptions.defaultProps = {
    title: undefined,
    multiple: false,
    width: '140px'
}