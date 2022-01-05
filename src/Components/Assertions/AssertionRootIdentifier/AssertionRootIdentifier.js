import { alpha, ClickAwayListener, Tooltip } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { styled } from 'Styles/materialThemes'

const StyledDiv = styled('div')(({ theme, selected }) => ({
    border: selected
        ? `1px solid ${theme.palette.text.primary}`
        : `1px solid ${alpha(theme.palette.secondary.main, 0.4)}`,
    '&:hover': {
        borderColor: theme.palette.text.primary
    },
    borderRadius: 4,
    minWidth: 32,
    minHeight: 26,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 4px',
    cursor: 'pointer',
    '& *:first-of-type': {
        color: selected ? theme.palette.text.primary : theme.palette.text.secondary,
        fontWeight: selected ? 900 : 400
    }
}))

export default function AssertionRootIdentifier({ title, selected, children, onClick, utility }) {

    const [tooltipOpen, setTooltipOpen] = useState(false)

    const handleOnClick = (event) => {
        utility && setTooltipOpen(!tooltipOpen)
        onClick(event)
    }

    return (
        <Tooltip
            arrow
            placement = 'top'
            open = {utility ? tooltipOpen : undefined}
            title = {
                <ClickAwayListener onClickAway = {() => setTooltipOpen(false)}>
                    <div>{title}</div>
                </ClickAwayListener>
            }
        >
            <StyledDiv
                selected = {selected || tooltipOpen}
                onClick = {handleOnClick}
                data-testid = {`AssertionRootIdentifier-${selected}`}
            >
                {children}
            </StyledDiv>
        </Tooltip>
    )
}

AssertionRootIdentifier.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
    utility: PropTypes.bool
}

AssertionRootIdentifier.defaultProps = {
    onClick: (e) => e,
    selected: false,
    utility: false
}
