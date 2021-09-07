import { alpha, makeStyles, Tooltip, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const defaultStyles = {
    borderRadius: 4,
    minWidth: 32,
    textAlign: 'center',
    padding: '0 4px',
    cursor: 'pointer',
}

const useStyles = makeStyles((theme) => ({
    selected: {
        ...defaultStyles,
        border: `1px solid ${theme.palette.text.primary}`
    },
    unselected: {
        ...defaultStyles,
        border: `1px solid ${alpha(theme.palette.secondary.main, .4)}`,
        '&:hover': {
            borderColor: theme.palette.text.primary
        }
    }
}))

function AssertionRootIdentifier({ id, title, selected, onClick }) {
    const classes = useStyles()

    return (
        <Tooltip title = {title} arrow placement = 'top'>
            <Typography
                color = {selected ? 'textPrimary' : 'textSecondary'}
                className = {selected ? classes.selected : classes.unselected}
                onClick = {onClick}
                style = {{
                    fontWeight: selected ? 900 : 400
                }}
            >
                {id}
            </Typography>
        </Tooltip>
    )
}

AssertionRootIdentifier.propTypes = {
    id: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
}

AssertionRootIdentifier.defaultProps = {
    selected: false
}

export default AssertionRootIdentifier
