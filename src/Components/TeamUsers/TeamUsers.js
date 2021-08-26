import { IconButton, makeStyles } from '@material-ui/core'
import { HighlightOff } from '@material-ui/icons'
import { SearchUsers } from 'Components/Search/SearchUsers'
import { Table } from 'Components/Table'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestFindUserBy } from 'Redux/Users/actions'
import { selectUsersByIds } from 'Redux/Users/selectors'

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        '&::-webkit-scrollbar': {
            width: '12px'
        },
        '&::-webkit-scrollbar-thumb': {
            height: '15%',
            border: '3px solid rgba(0, 0, 0, 0)',
            backgroundClip: 'padding-box',
            backgroundColor: theme.palette.divider,
            '-webkit-border-radius': '12px'
        },
        overflowY: 'auto',
        maxHeight: '300px'
    }
}))

const generateTeamUsersQuery = (userIds) => {
    return userIds.map(id => `id:${id}`).join(' OR ')
}

const TeamUsers = ({ userIds, setUserIds }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const users = useSelector(state => selectUsersByIds(state, userIds))

    const buildRows = () => {
        return users.map(user => ({
            data: [
                user.username,
                user.displayName,
                buildActions(user.id)
            ],
            properties: {
                strikeThrough: false
            }
        }))
    }

    useEffect(() => {
        const missingUserIds = userIds.filter((id, index) => users[index].id === undefined)
        if (missingUserIds.length > 0) {
            dispatch(requestFindUserBy(generateTeamUsersQuery(missingUserIds)))
        }
    }, [userIds])

    const addUser = (userId) => {
        const updatedUserIds = [...userIds, userId]
        setUserIds(updatedUserIds)
    }

    const removeUser = (userId) => {
        const updatedUserIds = userIds.filter(id => id != userId)
        setUserIds(updatedUserIds)
    }

    const buildActions = (userId) => {
        return (
            <IconButton
                title = 'remove user'
                color = 'secondary'
                onClick = {() => removeUser(userId)}
            >
                <HighlightOff />
            </IconButton>
        )
    }

    return (
        <>
            <SearchUsers
                onChange = {(_e, values) => {
                    values && addUser(values.id)
                }}
                title = ''
                placeholder = 'Add another developer...'
                growFrom = '100%'
                freeSolo = {true}
                style = {{
                    height: '32px',
                    marginTop: '8px',
                    marginBottom: '8px'
                }}
            />
            <div className = { classes.tableContainer }>
                <Table
                    columns = {['username', 'display name', '']}
                    rows = {buildRows()}
                    tableWidth = '100%'
                    disableHeaders
                    disableRowDividers = {true}
                    stickyHeader = {true}
                    data-testid = 'TeamUsers__Table'
                />
            </div>
        </>
    )
}

TeamUsers.propTypes = {
    userIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    setUserIds: PropTypes.func.isRequired,
}

export default TeamUsers