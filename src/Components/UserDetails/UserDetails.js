import { Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from 'Redux/Users/selectors'

function DataRow({ label, value }) {
    return (
        <Grid container spacing = {2} justifyContent = 'space-between'>
            <Grid item>
                <Typography variant = 'subtitle1' color = 'textSecondary'>{label}</Typography>
            </Grid>
            <Grid item>
                <Typography variant = 'subtitle1'>{value}</Typography>
            </Grid>
        </Grid>
    )
}

DataRow.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

function UserDetails({ id, role }) {
    if (!id) return null

    const user = useSelector(state => selectUserById(state, id))

    return (
        <Grid container direction = 'column' style = {{ padding: '8px' }} data-testid = 'UserDetails__wrap'>
            <Grid item>
                <Typography variant = 'h6'>{user.username}</Typography>
            </Grid>
            <Grid item>
                <Typography variant = 'subtitle1' color = 'textSecondary'>
                    {user.displayName !== user.username && user.displayName.length > 0 ? user.displayName : ''}
                </Typography>
            </Grid>
            <Grid item container style = {{ marginTop: '18px' }} spacing = {1}>
                <Grid item>
                    <DataRow label = 'Product Role:' value = {role} />
                    <DataRow label = 'Work Email:' value = {user.email ?? 'Not Set'} />
                    <DataRow label = 'Work Number:' value = {user.phone ?? 'Not Set'} />
                    <DataRow label = 'Company:' value = {user.company ?? 'Not Set'} />
                </Grid>
            </Grid>
        </Grid>
    )
}

UserDetails.propTypes = {
    id: PropTypes.number,
    role: PropTypes.string.isRequired
}

UserDetails.defaultProps = {
    id: null
}

export default UserDetails