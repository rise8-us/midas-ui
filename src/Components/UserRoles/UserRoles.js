import { Box, Button, Checkbox, FormControlLabel, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRolesAsArray } from 'Redux/AppSettings/selectors'
import { requestUpdateUserRoles } from 'Redux/Users/actions'
import { styled } from 'Styles/materialThemes'
import { convertRolesMapToLong } from 'Utilities/bitwise'

const StyledBox = styled(Box)(() => ({
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
}))

const BoxRow = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '2px 5px',
}))

function UserRoles({ editable, user }) {
    const dispatch = useDispatch()

    const [assignedRoles, setAssignedRoles] = useState({ ...user.roles })

    const allRoles = useSelector((state) => selectRolesAsArray(state))

    const onChangeRole = (e) => {
        setAssignedRoles({
            ...assignedRoles,
            [e.target.name]: !assignedRoles[e.target.name],
        })
    }

    const updateUserRoles = () => {
        const roles = convertRolesMapToLong(assignedRoles)
        dispatch(requestUpdateUserRoles({ id: user.id, roles: roles }))
    }

    if (Object.values(assignedRoles).length === 0) return null

    return (
        <StyledBox>
            <Box display = 'flex' justifyContent = 'space-between'>
                <Typography color = 'text.secondary' variant = 'h5'>
                    Assigned Roles
                </Typography>
                {editable && (
                    <Button onClick = {updateUserRoles} color = 'primary' variant = 'outlined'>
                        save
                    </Button>
                )}
            </Box>
            {editable
                ? allRoles.map((role, index) => (
                    <BoxRow key = {index}>
                        <FormControlLabel
                            control = {
                                <Checkbox
                                    color = 'primary'
                                    name = {role.name}
                                    data-testid = {`UserRoles__checkbox-${role.name}`}
                                />
                            }
                            label = {role.name}
                            checked = {assignedRoles[role.name] ?? false}
                            onChange = {onChangeRole}
                        />
                    </BoxRow>
                ))
                : Object.entries(user.roles).map((entry, index) => (
                    <div key = {index}>
                        {entry[1] && (
                            <Typography
                                variant = 'h6'
                                color = 'text.primary'
                                style = {{ paddingLeft: '15px' }}
                            >
                                {entry[0]}
                            </Typography>
                        )}
                    </div>
                ))}
        </StyledBox>
    )
}

UserRoles.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        roles: PropTypes.object
    }).isRequired,
    editable: PropTypes.bool
}

UserRoles.defaultProps = {
    editable: false
}

export default UserRoles
