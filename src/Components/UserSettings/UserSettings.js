import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestUpdateUser } from '../../Redux/Users/actions'

const useStyles = makeStyles((theme) => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        padding: '3px'
    },
    box: {
        padding: '16px',
        display: 'flex',
        flexDirection: 'column'
    }
}))

const UserSettings = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { user } = props
    const [username, setUsername] = useState()
    const [displayName, setDisplayName] = useState()
    const [email, setEmail] = useState()

    const onDisplayNameChange = (e) => setDisplayName(e.target.value)
    const onEmailChange = (e) => setEmail(e.target.value)

    const saveUser = () => {
        const updatedUser = {
            id: user.id,
            username: username,
            displayName: displayName,
            email: email
        }
        dispatch(requestUpdateUser(updatedUser))
    }

    useEffect(() => {
        setUsername(user.username)
        setDisplayName(user.displayName)
        setEmail(user.email)
    }, [user])

    return (
        <Box className = {classes.box} style = {{ width: '100%' }} data-testid = 'UserSettings__settings'>
            <Box display = 'flex' justifyContent = 'space-between'>
                <Typography variant = 'h5' color = 'textSecondary'>General Information</Typography>
                <Button
                    onClick = {saveUser}
                    data-testid = 'UserSettings__button-save'
                    color = 'primary'
                    variant = 'outlined'
                >
                save
                </Button>
            </Box>
            <TextField
                disabled
                label = 'Username'
                value = {username ?? ''}
                margin = 'dense'
                data-testid = 'UserSettings__input-username'
                className = {classes.textField}
                style = {{ padding: '3px' }}
            />
            <TextField
                label = 'Display Name'
                value = {displayName ?? ''}
                onChange = {onDisplayNameChange}
                required
                margin = 'dense'
                data-testid = 'UserSettings__input-display-name'
                className = {classes.textField}
            />
            <TextField
                label = 'Email'
                value = {email ?? ''}
                onChange = {onEmailChange}
                required
                margin = 'dense'
                data-testid = 'UserSettings__input-email'
                className = {classes.textField}
            />
        </Box>
    )
}

UserSettings.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        displayName: PropTypes.string,
        email: PropTypes.string
    }).isRequired
}

export default UserSettings
