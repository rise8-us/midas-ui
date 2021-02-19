import { Box, Link, Typography } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Page } from '../../Page'
import { useStyles } from './styles'

function PageNotFound() {
    const classes = useStyles()

    return (
        <Page>
            <Box display = 'flex' style = {{ height: 'calc(100vh - 40px)' }}>
                <Typography variant = 'h6' color = 'textPrimary' className = {classes.typography}>
                    This is not the page you are looking for.
                </Typography>
                <Link to = '/home' color = 'primary' variant = 'h6' component = {NavLink} className = {classes.link}>
                    Go Home
                </Link>
            </Box>
        </Page>
    )
}

export default PageNotFound