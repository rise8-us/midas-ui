import { makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setPageScrollY } from '../../Redux/AppSettings/reducer'
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
        padding: '68px 0 20px 0',
        overflowY: 'auto',
        height: '100%',
        scrollBehavior: 'smooth'
    }
}))

function Page({ children }) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const onScroll = (e) => dispatch(setPageScrollY(e.target.scrollTop))

    return (
        <>
            <AppBar />
            <div className = {classes.page} onScroll = {onScroll}>{children}</div>
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