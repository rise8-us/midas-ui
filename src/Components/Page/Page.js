import { makeStyles } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import appLogo from '../../Assets/appLogo.png'
import { getUserLoggedIn } from '../../Redux/Auth/selectors'
import { AppBar } from '../AppBar'
import { SideBar } from '../SideBar'

const useStyles = makeStyles(theme => ({
    contentOpen: {
        marginLeft: 240,
        transition: theme.transitions.create('margin-left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    contentClose: {
        marginLeft: 55,
        transition: theme.transitions.create('margin-left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    }
}))

function Page({ children }) {
    const classes = useStyles()
    const history = useHistory()

    const user = useSelector(state => getUserLoggedIn(state))
    const open = useSelector(state => state.app.navBarOpen)

    const pages = [
        { label: 'Home', icon: <Home data-testid = 'Page__icon'/>, onClick: () => history.push('/home') }
    ]

    return (
        <>
            <AppBar
                user = {user}
                appColor = '#D4AF37'
                appLogo = {appLogo}
                appName = 'MIDAS'
            />
            <SideBar pages = {pages}/>
            <div
                className = {clsx(classes.content, {
                    [classes.contentOpen]: open,
                    [classes.contentClose]: !open
                })}
                data-testid = 'Page__content'
                style = {{ padding: '68px 0 20px 0' }}
            >
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