import { Box, Button, TextField, Typography } from '@mui/material'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestUpdateUser } from 'Redux/Users/actions'
import { selectUserById } from 'Redux/Users/selectors'
import { styled } from 'Styles/materialThemes'

const TextFieldStyled = styled(TextField)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: '3px'
}))

const BoxStyled = styled(Box)(() => ({
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
}))

export const returnValueOrEmptyString = (value) => { return value ?? '' }

const UserSettings = ({ id }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => selectUserById(state, id))

    const [formValues, formDispatch] = React.useReducer(useFormReducer, {
        username: user.username,
        displayName: returnValueOrEmptyString(user.displayName),
        email: returnValueOrEmptyString(user.email),
        phone: returnValueOrEmptyString(user.phone),
        company: returnValueOrEmptyString(user.company)
    })

    const handleChange = (name, value) => {
        formDispatch({
            type: 'onChange',
            payload: { name, value }
        })
    }

    const saveUser = () => {
        dispatch(
            requestUpdateUser({
                id: user.id,
                username: formValues.username,
                displayName: formValues.displayName,
                email: formValues.email,
                phone: formValues.phone,
                company: formValues.company
            })
        )
    }

    return (
        <BoxStyled data-testid = 'UserSettings__settings'>
            <Box display = 'flex' justifyContent = 'space-between'>
                <Typography variant = 'h5' color = 'text.secondary'>
                    General Information
                </Typography>
                <Button
                    onClick = {saveUser}
                    data-testid = 'UserSettings__button-save'
                    color = 'primary'
                    variant = 'outlined'
                >
                    save
                </Button>
            </Box>
            <TextFieldStyled
                disabled
                label = 'Username'
                value = {formValues.username}
                margin = 'dense'
                data-testid = 'UserSettings__input-username'
                style = {{ padding: '3px' }}
            />
            <TextFieldStyled
                label = 'Display Name'
                value = {formValues.displayName}
                onChange = {(e) => handleChange('displayName', e.target.value)}
                margin = 'dense'
                data-testid = 'UserSettings__input-display-name'
            />
            <TextFieldStyled
                label = 'Work Email'
                value = {formValues.email}
                onChange = {(e) => handleChange('email', e.target.value)}
                margin = 'dense'
                data-testid = 'UserSettings__input-email'
            />
            <TextFieldStyled
                label = 'Work Phone'
                type = 'tel'
                value = {formValues.phone}
                onChange = {(e) => handleChange('phone', e.target.value)}
                margin = 'dense'
                data-testid = 'UserSettings__input-phone'
            />
            <TextFieldStyled
                label = 'Company'
                value = {formValues.company}
                onChange = {(e) => handleChange('company', e.target.value)}
                margin = 'dense'
                data-testid = 'UserSettings__input-company'
            />
        </BoxStyled>
    )
}

UserSettings.propTypes = {
    id: PropTypes.number.isRequired
}

export default UserSettings
