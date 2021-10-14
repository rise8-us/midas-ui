import { makeStyles } from '@material-ui/core'
import { AppBar } from 'Components/AppBar'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setPageScrollY } from 'Redux/AppSettings/reducer'

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
        overflowY: 'overlay',
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
            <div className = {classes.page} onScroll = {onScroll} data-testid = 'Page__div'>
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