import { Clear } from '@mui/icons-material'
import { IconButton, Slide, Snackbar, Typography, useTheme } from '@mui/material'
import PropTypes from 'prop-types'
import React, { lazy, Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeMessage, updateMessage } from 'Redux/Snackbar/reducer'
import { selectAllMessages } from 'Redux/Snackbar/selectors'

const MAX_SNACKS = 1

const importCustomMessage = (name) => lazy(() => {
    // eslint-disable-next-line no-unsanitized/method
    return import(`../Messages/${name}/${name}`)
})

const SuspenseCustomMessage = React.memo(
    function SuspenseCustomMessage({ message, customComponent, customProps }) {
        const CustomMessage = importCustomMessage(customComponent)

        return (
            <Suspense fallback = {<div style = {{ width: '250px' }}/>}>
                <CustomMessage message = {message} {...customProps} />
            </Suspense>
        )
    }
)

SuspenseCustomMessage.propTypes = {
    message: PropTypes.string.isRequired,
    customComponent: PropTypes.string.isRequired,
    customProps: PropTypes.shape({})
}

SuspenseCustomMessage.defaultProps = {
    customProps: {}
}

export default function SnackbarManager() {
    const dispatch = useDispatch()
    const theme = useTheme()

    const messages = useSelector(selectAllMessages)

    const addToQueue = (message) => {
        dispatch(updateMessage({ ...message, open: true }))
        !message.persist && setTimeout(() => closeMessageInQueue(message), message.timeout)
    }

    const closeMessageInQueue = (message) => {
        dispatch(updateMessage({ ...message, open: false }))
        setTimeout(() => removeMessageFromQueue(message), 700)
    }

    const removeMessageFromQueue = (message) => {
        dispatch(removeMessage(message))
    }

    useEffect(() => {
        messages.slice(0, MAX_SNACKS).map(message => {
            message.open === undefined && addToQueue(message)
        })
    }, [messages])

    return (
        <Snackbar
            open = {messages.length > 0}
            anchorOrigin = {{ vertical: 'bottom', horizontal: 'left' }}
            data-testid = 'SnackbarManager__snackbar'
        >
            <div style = {{ display: 'flex', flexDirection: 'column-reverse' }}>
                {messages.slice(0, MAX_SNACKS).map((message, index) => (
                    <div style = {{ marginBottom: '8px' }} key = {index}>
                        {[true, false].includes(message['open']) &&
                            <Slide in = {message.open} direction = 'right'>
                                <div
                                    style = {{
                                        height: '50px',
                                        minWidth: '275px',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        backgroundColor: theme.palette[message.severity]?.dark ?? '#c3c3c3'
                                    }}
                                    data-testid = {
                                        `SnackbarManager__message-${index}-${message.open ? 'open' : 'closing'}`
                                    }
                                >
                                    {message.customComponent
                                        ? <SuspenseCustomMessage
                                            message = {message.message}
                                            customComponent = {message.customComponent}
                                            customProps = {message.customProps}
                                        />
                                        : <Typography>{message.message}</Typography>
                                    }
                                    <IconButton
                                        onClick = {() => closeMessageInQueue(message)}
                                        data-testid = 'SnackbarManager__message-close-btn'
                                    >
                                        <Clear />
                                    </IconButton>
                                </div>
                            </Slide>
                        }
                    </div>
                ))}
            </div>
        </Snackbar>
    )
}
