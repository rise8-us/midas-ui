import { makeStyles, useTheme } from '@material-ui/core'
import { Home, LocalOffer } from '@material-ui/icons'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import appLogo from '../../Assets/appLogo.png'
import projectIcon from '../../Assets/project.png'
import { selectUserLoggedIn } from '../../Redux/Auth/selectors'
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
    const theme = useTheme()
    const history = useHistory()

    const user = useSelector(state => selectUserLoggedIn(state))
    const open = useSelector(state => state.app.navBarOpen)

    const pages = [
        { label: 'Home', icon: <Home data-testid = 'Page__icon'/>,
            onClick: () => history.push('/home') },
        {
            label: 'Projects',
            icon: <img
                src = {projectIcon}
                title = 'projects'
                style = {{ maxBlockSize: '28px' }}
                data-testid = 'Page__icon'/>,
            onClick: () => history.push('/projects')
        },
        { label: 'Tags', icon: <LocalOffer title = 'tags' data-testid = 'Page__icon'/>,
            onClick: () => history.push('/tags') }
    ]


    return (
        <>
            <AppBar
                user = {user}
                appColor = {theme.palette.appColor}
                appLogo = {appLogo}
                appName = 'MIDAS'
            />
            <SideBar pages = {pages}/>
            <div
                data-testid = 'Page__content'
                className = {clsx(classes.content, {
                    [classes.contentOpen]: open,
                    [classes.contentClose]: !open
                })}
                style = {{ padding: '68px 0 20px 0', height: 'inherit' }}
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