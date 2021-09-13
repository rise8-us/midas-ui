import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestUpdateUser } from 'Redux/Users/actions'
import { selectUserById } from 'Redux/Users/selectors'

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

const UserSettings = ({ id }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const user = useSelector(state => selectUserById(state, id))

    const [formValues, formDispatch] = React.useReducer(useFormReducer, {
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        phone: user.phone,
        company: user.company
    })

    const handleChange = (name, value) => {
        formDispatch({
            type: 'onChange',
            payload: { name, value }
        })
    }

    const saveUser = () => {
        dispatch(requestUpdateUser({
            id: user.id,
            username: formValues.username,
            displayName: formValues.displayName,
            email: formValues.email,
            phone: formValues.phone,
            company: formValues.company,
        }))
    }

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
                value = {formValues.username}
                margin = 'dense'
                data-testid = 'UserSettings__input-username'
                className = {classes.textField}
                style = {{ padding: '3px' }}
            />
            <TextField
                label = 'Display Name'
                value = {formValues.displayName}
                onChange = {(e) => handleChange('displayName', e.target.value)}
                margin = 'dense'
                data-testid = 'UserSettings__input-display-name'
                className = {classes.textField}
            />
            <TextField
                label = 'Work Email'
                value = {formValues.email}
                onChange = {(e) => handleChange('email', e.target.value)}
                margin = 'dense'
                data-testid = 'UserSettings__input-email'
                className = {classes.textField}
            />
            <TextField
                label = 'Work Phone'
                type = 'tel'
                value = {formValues.phone}
                onChange = {(e) => handleChange('phone', e.target.value)}
                margin = 'dense'
                data-testid = 'UserSettings__input-phone'
                className = {classes.textField}
            />
            <TextField
                label = 'Company'
                value = {formValues.company}
                onChange = {(e) => handleChange('company', e.target.value)}
                margin = 'dense'
                data-testid = 'UserSettings__input-company'
                className = {classes.textField}
            />
        </Box>
    )
}

UserSettings.propTypes = {
    id: PropTypes.number.isRequired,
}

export default UserSettings
