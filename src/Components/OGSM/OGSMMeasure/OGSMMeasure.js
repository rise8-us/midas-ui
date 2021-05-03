import { Card, CardContent, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    completed: {
        backgroundColor: theme.palette.success.main
    },
    failed: {
        backgroundColor: theme.palette.error.main
    }
}))

function OGSMMeasure({ detail, completed }) {
    const classes = useStyles()

    return (
        <Card title = 'measure' style = {{ margin: '8px', width: 'fit-content' }}>
            <CardContent
                data-testid = 'OGSMMeasure__content'
                className = {completed ? classes.completed : classes.failed}
            >
                {detail}
            </CardContent>
        </Card>)
}
OGSMMeasure.propTypes = {
    detail: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
}

export default OGSMMeasure