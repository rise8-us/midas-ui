import { alpha, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { styled } from 'Styles/materialThemes'

const defaultStyles = {
    borderRadius: 4,
    minWidth: 32,
    textAlign: 'center',
    padding: '0 4px',
    cursor: 'pointer'
}

const TypographyStyled = styled(Typography)(({ theme, selected }) => ({
    border: selected
        ? `1px solid ${theme.palette.text.primary}`
        : `1px solid ${alpha(theme.palette.secondary.main, 0.4)}`,
    fontWeight: selected ? 900 : 400,
    '&:hover': {
        borderColor: theme.palette.text.primary
    },
    ...defaultStyles
}))
function AssertionRootIdentifier({ id, title, selected, onClick }) {
    return (
        <Tooltip title = {title} arrow placement = 'top'>
            <TypographyStyled
                selected = {selected}
                color = {selected ? 'text.primary' : 'text.secondary'}
                onClick = {onClick}
            >
                {id}
            </TypographyStyled>
        </Tooltip>
    )
}

AssertionRootIdentifier.propTypes = {
    id: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool
}

AssertionRootIdentifier.defaultProps = {
    selected: false
}

export default AssertionRootIdentifier
