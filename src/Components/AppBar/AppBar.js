import { AppBar as AppBarMUI, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { AccountCircle, Gavel } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    }
}))

function AppBar({ height, appColor, appName, appLogo, user }) {
    const classes = useStyles()
    const history = useHistory()

    return (
        <AppBarMUI
            style = {{
                marginTop: '20px',
                height: height,
                justifyContent: 'center',
                boxShadow: 'none',
                borderBottom: `solid 1px ${appColor}`,
                backgroundColor: '#24292e'
            }}
        >
            <Toolbar>
                {appLogo &&
                    <img src = {appLogo} style = {{ maxBlockSize: '28px', paddingRight: '5px' }}/>
                }
                {appName &&
                    <Typography variant = 'h4' className = {classes.title} color = 'textPrimary'>
                        {appName}
                    </Typography>
                }
                <div style = {{ flexGrow: 1 }} />
                {user.isAdmin &&
                    <IconButton
                        color = 'default'
                        data-testid = 'AppBar__icon-admin'
                        onClick = {() => history.push('/admin')}
                    >
                        <Gavel />
                    </IconButton>
                }
                {user.id &&
                    <IconButton
                        edge = 'end'
                        color = 'default'
                        data-testid = 'AppBar__icon-account'
                        onClick = {() => history.push('/account')}
                    >
                        <AccountCircle />
                    </IconButton>
                }
            </Toolbar>
        </AppBarMUI>
    )
}

AppBar.propTypes = {
    height: PropTypes.string,
    appName: PropTypes.string,
    appColor: PropTypes.string,
    appLogo: PropTypes.string,
    user: PropTypes.shape({
        id: PropTypes.number,
        isAdmin: PropTypes.bool
    })
}

AppBar.defaultProps = {
    height: '48px',
    appName: null,
    appColor: 'gray',
    appLogo: null,
    user: {
        id: null,
        isAdmin: false
    }
}

export default AppBar