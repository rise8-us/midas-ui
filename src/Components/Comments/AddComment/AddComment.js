import { Box, Button, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'

function AddComment({ additionalNode, onSubmit, handleEnterKey, showSubmitButton }) {

    const [inputValue, setInputValue] = useState('')
    const [nextKeyIsEnter, setNextKeyIsEnter] = useState(false)

    const handleKeyDown = (event) => {
        if (handleEnterKey && !event.shiftKey && event.key === 'Enter') {
            setNextKeyIsEnter(true)
            handleSubmit()
        }
    }

    const handleSubmit = () => {
        onSubmit(inputValue)
        setInputValue('')
    }

    return (
        <Box margin = {1} display = 'flex' flexDirection = 'column'>
            <TextField
                multiline
                fullWidth
                variant = 'filled'
                value = {inputValue}
                placeholder = 'Enter comment here...'
                InputProps = {{
                    style: {
                        padding: '6px'
                    },
                    disableUnderline: true
                }}
                onChange = {(e) => nextKeyIsEnter
                    ? setInputValue(e.target.value.trimEnd())
                    : setInputValue(e.target.value)
                }
                onKeyDown = {handleKeyDown}
                onKeyUp = {() => setNextKeyIsEnter(false)}
            />
            <Box display = 'flex' justifyContent = 'space-between' style = {{ direction: 'rtl' }}>
                {showSubmitButton &&
                    <Button variant = 'outlined' size = 'small' onClick = {handleSubmit}>
                        submit
                    </Button>
                }
                {additionalNode}
            </Box>
        </Box>
    )
}

AddComment.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    additionalNode: PropTypes.node,
    handleEnterKey: PropTypes.bool,
    showSubmitButton: PropTypes.bool
}

AddComment.defaultProps = {
    additionalNode: undefined,
    handleEnterKey: false,
    showSubmitButton: false
}

export default AddComment