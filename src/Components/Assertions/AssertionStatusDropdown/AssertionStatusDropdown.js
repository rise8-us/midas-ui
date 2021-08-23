import { ClickAwayListener, makeStyles, Paper, Popper, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import useAssertionStatuses from '../../../Hooks/useAssertionStatuses'
import { Tag } from '../../Tag'

const useStyles = makeStyles((theme) => ({
    option: {
        direction: 'ltr',
        padding: '3px 8px',
        '&:hover': {
            backgroundColor: theme.palette.subtext
        }
    }
}))

function AssertionStatusDropdown({ option, onChange, onClick, hasAccess }) {
    const classes = useStyles()

    const allStatuses = useAssertionStatuses()

    const [selectStatus, setSelectStatus] = useState(option)
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleChange = (e) => {
        const selected = allStatuses.filter(status => status.label === e.target.textContent)[0]

        setSelectStatus(selected)
        togglePopper(e)

        typeof onChange === 'function' && onChange(selected.name)
    }

    const togglePopper = (event) => {
        if (hasAccess) {
            setAnchorEl(anchorEl ? null : event.currentTarget)
            setOpen(prev => !prev)

            typeof onClick === 'function' && onClick(event)
        }
    }

    useEffect(() => {
        setSelectStatus(option)
    }, [option])

    return (
        <div style = {{ cursor: 'pointer', margin: 'auto 0' }}>
            <Tag
                label = {`status::${selectStatus?.label}`}
                color = {selectStatus.color}
                onClick = {togglePopper}
            />
            {hasAccess &&
                <Popper
                    placement = 'bottom-start'
                    disablePortal = {true}
                    anchorEl = {anchorEl}
                    open = {open}
                    style = {{ zIndex: 2 }}
                >
                    <ClickAwayListener onClickAway = {togglePopper}>
                        <Paper style = {{ width: '150px' }} >
                            {allStatuses.filter(status => status.label !== selectStatus?.label).map(status => (
                                <Typography
                                    key = {status.name}
                                    className = {classes.option}
                                    variant = 'subtitle1'
                                    color = 'textSecondary'
                                    onClick = {handleChange}
                                    value = {status.label}
                                >{status.label}</Typography>
                            ))}
                        </Paper>
                    </ClickAwayListener>
                </Popper>
            }
        </div>
    )

}

AssertionStatusDropdown.propTypes = {
    option: PropTypes.shape({
        label: PropTypes.string,
        color: PropTypes.string,
        name: PropTypes.string
    }),
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    hasAccess: PropTypes.bool
}

AssertionStatusDropdown.defaultProps = {
    option: {
        name: 'NOT_STARTED',
        label: 'Not Started',
        color: '#c3c3c3'
    },
    onClick: undefined,
    onChange: undefined,
    hasAccess: false
}

export default AssertionStatusDropdown