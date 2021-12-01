import { alpha, Tooltip } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
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

export default function AssertionRootIdentifier({ title, selected, indicator, onClick }) {
    return (
        <Tooltip title = {title} arrow placement = 'top'>
            <StyledDiv
                selected = {selected}
                onClick = {onClick}
                data-testid = {`AssertionRootIdentifier-${selected}`}
            >
                {indicator}
            </StyledDiv>
        </Tooltip>
    )
}

AssertionRootIdentifier.propTypes = {
    indicator: PropTypes.node.isRequired,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func
}

AssertionRootIdentifier.defaultProps = {
    onClick: (e) => e,
    selected: false
}
