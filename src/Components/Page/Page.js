import { makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { AppBar } from '../AppBar'

const useStyles = makeStyles(theme => ({
    page: {
        '&::-webkit-scrollbar': {
            width: '12px'
        },
        '&::-webkit-scrollbar-thumb': {
            height: '15%',
            border: '3px solid rgba(0, 0, 0, 0)',
            backgroundClip: 'padding-box',
            backgroundColor: theme.palette.divider,
            '-webkit-border-radius': '12px'
        },
        padding: theme.spacing(2)
    }
}))

function Page({ children }) {
    const classes = useStyles()

    return (
        <>
            <AppBar />
            <div style = {{ padding: '68px 0 20px 0', height: '100%', overflowY: 'auto' }} className = {classes.page}>
                {children}
            </div>
        </>
    )
}

Page.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]).isRequired
}

export default Page