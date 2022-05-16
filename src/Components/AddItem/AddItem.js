import { AddCircleOutline } from '@mui/icons-material'
import { CircularProgress, IconButton, Tooltip } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'

export default function AddItem({ title, onClick }) {

    const [isProcessing, setIsProcessing] = useState(false)

    const onSubmit = async() => {
        setIsProcessing(true)
        await onClick()
        setIsProcessing(false)
    }

    return (
        <Tooltip arrow title = {title}>
            <div style = {{ borderRadius: '50%' }}>
                <IconButton
                    color = 'primary'
                    size = 'small'
                    onClick = {onSubmit}
                    disabled = {isProcessing}
                    data-testid = 'AddItem__icon-button'
                >
                    {isProcessing
                        ? <CircularProgress size = '18px' data-testid = 'AddItem__spinner'/>
                        : <AddCircleOutline fontSize = 'small'/>
                    }
                </IconButton>
            </div>
        </Tooltip>
    )
}

AddItem.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}


