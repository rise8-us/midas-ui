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

function OGSMStrategy({ detail, completed }) {
    const classes = useStyles()

    return (
        <Card title = 'strategy'>
            <CardContent
                data-testid = 'OGSMStrategy__content'
                className = {completed ? classes.completed : classes.failed}
            >
                {detail}
            </CardContent>
        </Card>)
}
OGSMStrategy.propTypes = {
    detail: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
}

export default OGSMStrategy