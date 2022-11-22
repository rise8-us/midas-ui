import { Divider, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectUsersByIds } from '../../Redux/Users/selectors'

export default function UserTooltip({ title, userIds }) {
    const users = useSelector(state => selectUsersByIds(state, userIds))

    return (
        <Stack spacing = {1}>
            {title &&
                <span>
                    <Typography><b>{title}</b></Typography>
                    <Divider/>
                </span>
            }
            {users.map((user, index) =>
                <Typography key = {index} variant = 'body2' data-testid = 'User-Tooltip'>
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
