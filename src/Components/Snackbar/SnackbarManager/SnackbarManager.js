import { Clear } from '@mui/icons-material'
import { IconButton, Slide, Snackbar, Typography, useTheme } from '@mui/material'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeMessage } from 'Redux/Snackbar/reducer'
import { selectAllMessages } from 'Redux/Snackbar/selectors'

const importCustomMessage = (name) => lazy(() => {
    // eslint-disable-next-line no-unsanitized/method
    return import(`../Messages/${name}/${name}`)
})

const renderMessage = (snack) => {
    const { message, customComponent, customProps } = snack

    const CustomMessage = importCustomMessage(customComponent)

    return (
        <Suspense fallback = {<div style = {{ width: '250px' }}/>}>
            <CustomMessage message = {message} {...customProps} />
        </Suspense>
    )
}

export default function SnackbarManager() {
    const dispatch = useDispatch()
    const theme = useTheme()

    const messages = useSelector(selectAllMessages)
    const [queue, setQueue] = useState([])

    const addToQueue = (message) => {
        setQueue(currentQueue => [...currentQueue, {
            ...message,
            open: true,
        }])

        !message.persist && setTimeout(() => closeMessageInQueue(message), message.timeout)
    }

    const closeMessageInQueue = (message) => {
        setQueue(currentQueue =>
            currentQueue.map(msg =>
                ({
                    ...msg,
                    open: message.key === msg.key ? false : msg.open
                })
            )
        )
        setTimeout(() => removeMessageFromQueue(message), 600)
    }

    const removeMessageFromQueue = (message) => {
        setQueue(currentQueue => currentQueue.filter(msg => msg.key !== message.key))
    }

    useEffect(() => {
        if (queue.length === 0 && messages.length > 0) {
            addToQueue(messages[0])
            dispatch(removeMessage(messages[0]))
        }
    }, [queue, messages])

    return (
        <Snackbar
            open = {true}
            anchorOrigin = {{ vertical: 'bottom', horizontal: 'left' }}
            data-testid = 'SnackbarManager__snackbar'
        >
            <div style = {{ display: 'flex', flexDirection: 'column' }}>
                {queue.length > 0 && queue.slice(0, 1).map((message, index) => (
                    <div style = {{ marginBottom: '8px' }} key = {index}>
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
                                data-testid = {`SnackbarManager__message-${index}-${message.open ? 'open' : 'closing'}`}
                            >
                                {message.customComponent
                                    ? <>{renderMessage(message)}</>
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
                    </div>
                ))}
            </div>
        </Snackbar>
    )
}
