import { Box, Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNavBar } from '../../Redux/AppSettings/reducer'

const constStyle = {
    overflowX: 'hidden',
    margin: '68px 0 20px 0',
    position: 'fixed',
    height: 'calc(100% - 88px)',
    zIndex: 100
}

const useStyles = makeStyles(theme => ({
    drawerOpen: {
        width: 240,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        ...constStyle
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        ...constStyle
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

function SideBar({ pages }) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const open = useSelector((state) => state.app.navBarOpen)

    const handleDrawer = () => dispatch(toggleNavBar())

    return (
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
            data-testid = 'SideBar__drawer'
        >
            <Box className = {classes.box}>
                <List style = {{ padding: '0' }}>
                    {pages.map((page) => (
                        <ListItem button key = {page.label} onClick = {page.onClick} data-testid = 'SideBar__link'>
                            <ListItemIcon>{page.icon}</ListItemIcon>
                            <ListItemText primary = {page.label} style = {{ whiteSpace: 'nowrap' }}/>
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
                        data-testid = 'SideBar__button-collapse'
                    >
                        {open && 'Collapse'}
                    </Button>
                </div>
            </Box>
        </Drawer>
    )
}

SideBar.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        icon: PropTypes.element,
        onClick: PropTypes.func
    })).isRequired

}

export default SideBar