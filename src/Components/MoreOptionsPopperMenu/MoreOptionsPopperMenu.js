import { MoreVert } from '@mui/icons-material'
import { Card, ClickAwayListener, IconButton, Popper, Typography } from '@mui/material'
import { alpha } from '@mui/system'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { styled } from 'Styles/materialThemes'

const DivOption = styled('div')(({ theme }) => ({
    direction: 'ltr',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '3px 8px',
    '&:hover': {
        backgroundColor: theme.palette.grey[800],
    },
}))

const StyledCard = styled(Card)(({ theme }) => ({
    width: '180px',
    backgroundColor: theme.palette.background.default,
    border: '1px solid',
    borderColor: alpha(theme.palette.text.primary, .04),
    boxShadow: '0 0 12px 0 #000'
}))

function MoreOptionsPopperMenu({ options, icon }) {

    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const togglePopper = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget)
        setOpen((prev) => !prev)
    }

    const handleOptionClick = (event, onClick) => {
        togglePopper(event)
        typeof onClick === 'function' && onClick(event)
    }

    return (
        <div style = {{ cursor: 'pointer', margin: 'auto 0' }}>
            <IconButton
                size = 'small'
                onClick = {togglePopper}
                title = 'more'
                color = 'secondary'
            >
                {icon}
            </IconButton>
            <Popper
                placement = 'top-start'
                disablePortal = {true}
                anchorEl = {anchorEl}
                open = {open}
                style = {{ zIndex: 2 }}
            >
                <ClickAwayListener onClickAway = {togglePopper}>
                    <StyledCard>
                        {options.map((option) => (
                            <DivOption
                                key = {option.text}
                                onClick = {(e) => handleOptionClick(e, option.onClick)}
                            >
                                <Typography style = {{ color: option.color }}>
                                    {option.text}
                                </Typography>
                                {option.icon}
                            </DivOption>
                        ))}
                    </StyledCard>
                </ClickAwayListener>
            </Popper>
        </div>
    )
}

MoreOptionsPopperMenu.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.node,
        text: PropTypes.string,
        onClick: PropTypes.func,
        color: PropTypes.string
    })),
    icon: PropTypes.node
}

MoreOptionsPopperMenu.defaultProps = {
    options: [{
        icon: undefined,
        text: 'No options',
        onClick: undefined,
        color: 'inherit'
    }],
    icon: <MoreVert />
}

export default MoreOptionsPopperMenu