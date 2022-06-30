import { MoreVert } from '@mui/icons-material'
import { Card, ClickAwayListener, Divider, IconButton, Link, Popper, Typography } from '@mui/material'
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
    backgroundColor: theme.palette.background.paper,
    border: '1px solid',
    borderColor: alpha(theme.palette.text.primary, .05),
    boxShadow: '0 0 24px 0 #00000088'
}))

function RowOption({ color, text, icon }) {
    return (
        <>
            <Typography style = {{ color }}>{text}</Typography>
            {icon}
        </>
    )
}

function MoreOptionsPopperMenu({ options, icon }) {

    const [anchorEl, setAnchorEl] = useState(null)

    const togglePopper = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget)
    }

    const handleOptionClick = (event, onClick) => {
        togglePopper(event)
        typeof onClick === 'function' && onClick(event)
    }

    return (
        <div style = {{ cursor: 'pointer', margin: 'auto 0' }}>
            <div onClick = {togglePopper}>{icon}</div>
            <Popper
                placement = 'top-start'
                disablePortal = {true}
                anchorEl = {anchorEl}
                open = {Boolean(anchorEl)}
                style = {{ zIndex: 2 }}
            >
                <ClickAwayListener onClickAway = {togglePopper}>
                    <StyledCard>
                        {options.map((option, key) => (
                            <React.Fragment key = {key}>
                                <DivOption
                                    onClick = {(e) => handleOptionClick(e, option.onClick)}
                                    data-testid = {`MoreOptionsPopperMenu__${option.text}`}
                                >
                                    {option.link ?
                                        <Link
                                            href = {option.link}
                                            target = '_blank'
                                            rel = 'noreferrer'
                                            underline = 'none'
                                            color = 'text.primary'
                                            data-testid = 'MoreOptionsPopperMenu__link'
                                        >
                                            <RowOption
                                                color = {option.color}
                                                text = {option.text}
                                                icon = {option.icon}
                                            />
                                        </Link>
                                        :
                                        <RowOption
                                            color = {option.color}
                                            text = {option.text}
                                            icon = {option.icon}
                                        />
                                    }
                                </DivOption>
                                {option.divider &&
                                    <Divider sx = {{ marginY: 1 }} data-testid = 'MoreOptionsPopperMenu__divider'/>
                                }
                            </React.Fragment>
                        ))}
                    </StyledCard>
                </ClickAwayListener>
            </Popper>
        </div>
    )
}

MoreOptionsPopperMenu.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string,
        divider: PropTypes.bool,
        href: PropTypes.string,
        icon: PropTypes.node,
        onClick: PropTypes.func,
        text: PropTypes.string,
    })),
    icon: PropTypes.node
}

MoreOptionsPopperMenu.defaultProps = {
    options: [{
        color: 'inherit',
        divider: false,
        href: undefined,
        icon: undefined,
        onClick: undefined,
        text: 'No options',
    }],
    icon: <IconButton color = 'secondary' size = 'small' title = 'more'><MoreVert /></IconButton>
}

RowOption.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.node,
    text: PropTypes.string
}
RowOption.defaultProps = {
    color: 'inherit',
    icon: undefined,
    text: 'No options'
}

export default MoreOptionsPopperMenu