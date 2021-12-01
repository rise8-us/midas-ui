import { CancelOutlined } from '@mui/icons-material'
import { IconButton, Snackbar, SnackbarContent } from '@mui/material'
import PropTypes from 'prop-types'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

const SnackbarContext = createContext({})

export const useSnackbar = () => useContext(SnackbarContext)

const VISIBLE_DURATION = 4000

function SnackbarProvider({ children }) {

    const [queue, setQueue] = useState([])
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(null)
    const [becameActive, setBecameActive] = useState(null)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
        setActive(null)
    }

    const enqueueSnackbar = useCallback((newMessage) => {
        setQueue((q) => [...q, newMessage])
    }, [])

    useEffect(() => {
        if (queue.length && !active) {
            setBecameActive(new Date())
            setOpen(true)
            setActive(queue[0])
            setQueue(queue.slice(1))
        } else if (queue.length && active && open) {
            const closeActiveSnackbarOnNew = () => {
                if (new Date().getTime() - becameActive.getTime() > VISIBLE_DURATION) {
                    setActive(null)
                    setOpen(false)
                } else {
                    setTimeout(closeActiveSnackbarOnNew, 100)
                }
            }
            closeActiveSnackbarOnNew()
        }
    }, [queue, active, open, becameActive])

    return (
        <>
            <SnackbarContext.Provider value = {{ enqueueSnackbar }}>
                {children}
            </SnackbarContext.Provider>
            { active &&
                <Snackbar
                    open = {open}
                    onClose = {handleClose}
                    anchorOrigin = {{ vertical: 'bottom', horizontal: 'left' }}
                    autoHideDuration = {active.persist ? undefined : VISIBLE_DURATION}
                >
                    <SnackbarContent
                        sx = {{ backgroundColor: `${active.severity}.main`, color: '#FFF' }}
                        message = {active.message}
                        action = {
                            <>
                                {active.action}
                                <IconButton onClick = {handleClose}><CancelOutlined /></IconButton>
                            </>
                        }
                    />
                </Snackbar>
            }
        </>
    )
}

SnackbarProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

export default SnackbarProvider