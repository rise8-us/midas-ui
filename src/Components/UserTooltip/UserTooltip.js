import { Divider, Stack, Typography } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestSearchUsers } from 'Redux/Users/actions'
import { buildOrQueryByIds } from 'Utilities/requests'

export default function UserTooltip({ title, userIds }) {
    const dispatch = useDispatch()

    const [users, setUsers] = useState([])

    useEffect(() => {
        if (userIds.length > 0) {
            dispatch(requestSearchUsers(buildOrQueryByIds(userIds))).then(unwrapResult).then(setUsers)
        } else {
            users.length > 0 && setUsers([])
        }
    }, [userIds])

    return (
        <Stack spacing = {1}>
            {title &&
                <span>
                    <Typography><b>{title}</b></Typography>
                    <Divider/>
                </span>
            }
            {users.map((user, index) =>
                <Typography key = {index} variant = 'body2'>
                    {user.displayName ?? user.username}
                </Typography>
            )}
        </Stack>
    )
}

UserTooltip.propTypes = {
    title: PropTypes.string,
    userIds: PropTypes.arrayOf(PropTypes.number),
}

UserTooltip.defaultProps = {
    title: null,
    userIds: []
}