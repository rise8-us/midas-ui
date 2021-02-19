import { Box, Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import { ChevronLeft, ChevronRight, Home, Person } from '@material-ui/icons'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toggleNavBarOpen } from '../../Redux/AppSettings/reducer'
import { getUserLoggedIn } from '../../Redux/Auth/selectors'

const drawerWidth = 240
const constStyle = {
    overflowX: 'hidden',
    margin: '20px 0',
    position: 'fixed',
    height: 'calc(100% - 40px)'
}

const useStyles = makeStyles((theme) => ({
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        ...constStyle

    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7),
        },
        ...constStyle
    },
    contentOpen: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create('margin-left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    contentClose: {
        marginLeft: 55,
        transition: theme.transitions.create('margin-left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
    },
    button: {
        padding: '15px',
        textTransform: 'none',
        width: '100%',
        height: '40px',
        overflow: 'hidden',
        justifyContent: 'left'
    }
}))

function Page(props) {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()

    const open = useSelector((state) => state.app.navBarOpen)
    const user = useSelector((state) => getUserLoggedIn(state))

    const handleDrawer = () => dispatch(toggleNavBarOpen())

    // Describe what each icon is and what is does on click
    let pages = [
        { label: 'Account', icon: <Person />, onClick: () => history.push('/account') },
        { label: 'Home', icon: <Home />, onClick: () => history.push('/home') }
    ]

    if (user.isAdmin) {
        pages.unshift({ label: 'Admin', icon: <SupervisorAccountIcon />, onClick: () => history.push('/admin') })
    }

    return (
        <>
            <Drawer
                variant = 'permanent'
                className = {clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes = {{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
                data-testid = 'Page__navigation-sidebar'
            >
                <Box className = {classes.box}>
                    <List style = {{ padding: '0' }}>
                        {pages.map((page) => (
                            <ListItem button key = {page.label} onClick = {page.onClick} data-testid = 'Page__link'>
                                <ListItemIcon>{page.icon}</ListItemIcon>
                                <ListItemText primary = {page.label} />
                            </ListItem>
                        ))}
                    </List>
                    <div>
                        <Divider />
                        <Button
                            disableTouchRipple
                            onClick = {handleDrawer}
                            variant = 'text'
                            size = 'large'
                            startIcon = {open ? <ChevronLeft /> : <ChevronRight />}
                            className = {classes.button}
                            data-testid = 'Page__button-collapse'
                        >
                            {open && 'Collapse'}
                        </Button>
                    </div>
                </Box>
            </Drawer>
            <div
                className = {clsx(classes.content, {
                    [classes.contentOpen]: open,
                    [classes.contentClose]: !open
                })}
                data-testid = 'Page__content'
                style = {{ padding: '20px 0px' }}
            >
                {props.children}
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