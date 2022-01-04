import { PersonSearch } from '@mui/icons-material'
import { Avatar, Collapse, Grid, Tooltip } from '@mui/material'
import { SearchUsers } from 'Components/Search'
import { UserDetails } from 'Components/UserDetails'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestFetchOneUser } from 'Redux/Users/actions'
import { selectUserById } from 'Redux/Users/selectors'

function AvatarInitials({ initials }) {
    return (
        <Avatar
            sx = {{ width: 20, height: 20, fontSize: '0.8rem', marginBottom: '2px', marginRight: '4px' }}
            data-testid = 'AssignedUser__avatar-icon'
        >
            {initials}
        </Avatar>
    )
}

AvatarInitials.propTypes = {
    initials: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

AvatarInitials.defaultProps = {
    initials: null
}

function AssignedUser({ id, hasEdit, onUserChange }) {
    const dispatch = useDispatch()

    const assignedUser = useSelector(state => selectUserById(state, id))
    const [hover, setHover] = useState(false)

    const initials = useMemo(() =>
        assignedUser?.username
            ? assignedUser.username.split(' ').map(name => name.charAt(0)).join('')
            : null
    , [assignedUser?.username])

    useEffect(() => {
        id && dispatch(requestFetchOneUser(id))
    }, [id])

    return (
        <Grid
            container
            flexDirection = { 'row-reverse'}
            style = {{ height: '38px', alignContent: 'flex-end' }}
        >
            <Grid
                item
                onMouseOver = {() => setHover(true)}
                onMouseLeave = {() => setHover(false)}
                data-testid = 'AssignedUser_grid-item'
            >
                <Tooltip
                    title = {<UserDetails id = {id} />}
                    PopperProps = {{
                        style: {
                            display: assignedUser?.id ? 'unset' : 'none',
                        }
                    }}>
                    <Collapse
                        in = {hover && hasEdit}
                        orientation = 'horizontal'
                        collapsedSize = '20px'>
                        <SearchUsers
                            title = ''
                            disableUnderline
                            onChange = {(_e, v) => onUserChange(v ?? {})}
                            startAdornment = {
                                <AvatarInitials
                                    initials = {hasEdit ? <PersonSearch style = {{ fontSize: '1rem' }}/> : initials}
                                />
                            }
                            disabled = {!hasEdit}
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

