import { Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from '@mui/material'
import { Popup } from 'Components/Popup'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import { useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closePopup } from 'Redux/Popups/actions'
import { requestUpdateUser, requestUpdateUserRoles } from 'Redux/Users/actions'
import constants from 'Redux/Users/constants'
import { selectUserById } from 'Redux/Users/selectors'
import { convertRolesMapToLong } from 'Utilities/bitwise'
import { camelToCapitalCase } from 'Utilities/caseConversions'

export default function UserPopup({ id }) {
    const dispatch = useDispatch()

    const user = useSelector(state => selectUserById(state, id))

    const textFieldsList = ['displayName', 'email', 'phone', 'company']
    const [formValues, formDispatch] = useReducer(useFormReducer, {
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        phone: user.phone,
        company: user.company,
        teamIds: user.teamIds
    })

    const [roles, setRoles] = useState(user.roles)

    const handleChange = (name, value) => {
        formDispatch({
            type: 'onChange',
            payload: { name, value }
        })
    }

    const onClose = () => dispatch(closePopup(constants.UPDATE_USER))

    const onSubmit = () => {
        Promise.all([
            dispatch(requestUpdateUser({ id, ...formValues })),
            dispatch(requestUpdateUserRoles({ id, roles: convertRolesMapToLong(roles) }))
        ]).then(onClose)
    }

    return (
        <Popup
            title = 'Edit User'
            subtitle = {user.username}
            subtitleVariant = 'subtitle2'
            onClose = {onClose}
            onSubmit = {onSubmit}
            hideRequiredText
        >
            <Stack spacing = {1}>
                {textFieldsList.map((field, index) =>
                    <TextField
                        key = {index}
                        label = {camelToCapitalCase(field)}
                        data-testid = {`UserPopup__input-${field}`}
                        value = {formValues[field] ?? ''}
                        onChange = {(e) => handleChange(field, e.target.value)}
                    />
                )}
                <Stack marginTop = {1}>
                    <Typography variant = 'subtitle1' color = 'secondary'>Roles:</Typography>
                    <FormGroup style = {{ marginLeft: '8px' }}>
                        {Object.entries(roles).map(([key, value], index) =>
                            <FormControlLabel
                                key = {index}
                                label = {key}
                                checked = {Boolean(value)}
                                control = {<Checkbox size = 'small' name = {key}/>}
                                data-testid = {`UserPopup__checkbox-${key}`}
                                onChange = {(e) => setRoles({
                                    ...roles,
                                    [e.target.name]: !roles[e.target.name]
                                })}
                            />
                        )}
                    </FormGroup>
                </Stack>
            </Stack>
        </Popup>
    )
}

UserPopup.propTypes = {
    id: PropTypes.number.isRequired
}
