import { Fab, makeStyles } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        right: theme.spacing(4),
        bottom: 20 + theme.spacing(4)
    }
}))

function FloatingActionButton({ onClick }) {
    const classes = useStyles()

    return (
        <Fab color = 'primary' className = {classes.fab} onClick = {onClick} title = 'add'>
            <Add />
        </Fab>
    )
}

FloatingActionButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default FloatingActionButton