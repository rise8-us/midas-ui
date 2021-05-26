import { Card, ClickAwayListener, IconButton, makeStyles, Popper, Typography } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => ({
    option: {
        direction: 'ltr',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '3px 8px',
        '&:hover': {
            backgroundColor: theme.palette.subtext
        }
    },
    card: {
        width: '150px',
        backgroundColor: theme.palette.background.default
    }
}))

function MoreOptionsPopperMenu({ options }) {
    const classes = useStyles()

    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const togglePopper = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget)
        setOpen(prev => !prev)
    }

    const handleOptionClick = (event, onClick) => {
        togglePopper(event)
        typeof onClick === 'function' && onClick(event)
    }

    return (
        <div style = {{ cursor: 'pointer', margin: 'auto 0' }}>
            <IconButton size = 'small' onClick = {togglePopper} title = 'more' color = 'secondary'>
                <MoreVert />
            </IconButton>
            <Popper
                placement = 'top-start'
                disablePortal = {true}
                anchorEl = {anchorEl}
                open = {open}
                style = {{ zIndex: 2 }}
            >
                <ClickAwayListener onClickAway = {togglePopper}>
                    <Card className = {classes.card}>
                        {options.map(option => (
                            <div
                                className = {classes.option}
                                key = {option.text}
                                onClick = {e => handleOptionClick(e, option.onClick)}
                            >
                                <Typography color = 'textSecondary'>{option.text}</Typography>
                                {option.icon}
                            </div>
                        ))}
                    </Card>
                </ClickAwayListener>
            </Popper>
        </div>
    )
}

MoreOptionsPopperMenu.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.node,
        text: PropTypes.string,
        onClick: PropTypes.func
    }))
}

MoreOptionsPopperMenu.defaultProps = {
    options: [{
        icon: undefined,
        text: 'No options',
        onClick: undefined
    }]
}

export default MoreOptionsPopperMenu