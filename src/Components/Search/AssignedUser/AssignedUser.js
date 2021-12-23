import { Create } from '@mui/icons-material'
import { Avatar, Collapse, Grid, Tooltip } from '@mui/material'
import { SearchUsers } from 'Components/Search'
import { UserDetails } from 'Components/UserDetails'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestFetchOneUser } from 'Redux/Users/actions'
import { selectUserById } from 'Redux/Users/selectors'

function AssignedUser({ id, hasEdit, onUserChange }) {
    const dispatch = useDispatch()

    const assignedUser = useSelector(state => selectUserById(state, id))
    const [assignedUserInitials, setassignedUserInitials] = useState(null)

    useEffect(() => {
        id && dispatch(requestFetchOneUser(id))
    }, [id])

    useEffect(() => {
        if (hasEdit) setassignedUserInitials(<Create fontSize = 'small'/>)
        else setassignedUserInitials(null)

        if (id !== null) {
            setassignedUserInitials(assignedUser?.username?.split(' ').map(name => name[0]).join(''))
        }
    }, [hasEdit, assignedUser?.username])

    const assignedUserAvatar = () => {
        return (
            <Avatar
                sx = {{ width: 24, height: 24, fontSize: '0.8rem', marginBottom: '2px', marginRight: '4px' }}
                data-testid = 'AssignedUser__avatar-icon'>
                {assignedUserInitials}
            </Avatar>
        )
    }

    return (
        <Grid
            container
            flexDirection = { 'row-reverse'}
            style = {{ height: '38px', alignContent: 'flex-end' }}
        >
            <Grid item >
                <Tooltip
                    title = {<UserDetails id = {id} />}
                    PopperProps = {{
                        style: {
                            display: id ? 'unset' : 'none',
                        }
                    }}>
                    <Collapse
                        in = {hasEdit}
                        orientation = 'horizontal'
                        collapsedSize = '24px' >
                        <SearchUsers
                            title = ''
                            disableUnderline
                            onChange = {(_e, v) => onUserChange(v ?? {})}
                            startAdornment = {assignedUserAvatar()}
                            disabled = {hasEdit ? false : true}
                            style = {{
                                fontSize: 12,
                                paddingLeft: 0,
                                width: '260px',
                            }}
                        />
                    </Collapse>
                </Tooltip>
            </Grid>
        </Grid>
    )
}

AssignedUser.propTypes = {
    id: PropTypes.number,
    hasEdit: PropTypes.bool.isRequired,
    onUserChange: PropTypes.func.isRequired
}

AssignedUser.defaultProps = {
    id: null
}

export default AssignedUser

