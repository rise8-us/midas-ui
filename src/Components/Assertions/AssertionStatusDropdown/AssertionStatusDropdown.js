import { alpha, ClickAwayListener, Paper, Popper, Typography } from '@mui/material'
import { Tag } from 'Components/Tag'
import useAssertionStatuses from 'Hooks/useAssertionStatuses'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { styled } from 'Styles/materialThemes'

const StyledTypography = styled(Typography)(({ theme }) => ({
    direction: 'ltr',
    padding: '3px 8px',

    '&:hover': {
        backgroundColor: alpha(theme.palette.background.default, 0.8)
    }
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
    width: '150px',
    marginBottom: '10px',
    boxShadow: `0px 0px 12px ${theme.palette.background.default}`
}))

function AssertionStatusDropdown({ option, onChange, onClick }) {
    const allStatuses = useAssertionStatuses()

    const [selectStatus, setSelectStatus] = useState(option)
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleChange = (e) => {
        const selected = allStatuses.filter((status) => status.label === e.target.textContent)[0]

        setSelectStatus(selected)
        togglePopper(e)

        typeof onChange === 'function' && onChange(selected.name)
    }

    const togglePopper = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget)
        setOpen((prev) => !prev)

        typeof onClick === 'function' && onClick(event)
    }

    useEffect(() => {
        setSelectStatus(option)
    }, [option])

    return (
        <div style = {{ cursor: 'pointer', margin: 'auto 0' }}>
            <Tag label = {`status::${selectStatus?.label}`} color = {selectStatus.color} onClick = {togglePopper} />
            <Popper
                placement = 'bottom-start'
                disablePortal = {true}
                anchorEl = {anchorEl}
                open = {open}
                style = {{ zIndex: 2 }}
            >
                <ClickAwayListener onClickAway = {togglePopper}>
                    <StyledPaper>
                        {allStatuses
                            .filter((status) => status.label !== selectStatus?.label)
                            .map((status) => (
                                <StyledTypography
                                    key = {status.name}
                                    variant = 'subtitle1'
                                    color = 'text.primary'
                                    onClick = {handleChange}
                                    value = {status.label}
                                >
                                    {status.label}
                                </StyledTypography>
                            ))}
                    </StyledPaper>
                </ClickAwayListener>
            </Popper>
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
    onChange: PropTypes.func
}

AssertionStatusDropdown.defaultProps = {
    option: {
        name: 'NOT_STARTED',
        label: 'Not Started',
        color: '#c3c3c3'
    },
    onClick: undefined,
    onChange: undefined
}

export default AssertionStatusDropdown
