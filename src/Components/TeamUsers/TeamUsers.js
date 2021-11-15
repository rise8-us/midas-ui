import { HighlightOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { SearchUsers } from 'Components/Search/SearchUsers'
import { Table } from 'Components/Table'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestFindUserBy } from 'Redux/Users/actions'
import { selectUsersByIds } from 'Redux/Users/selectors'
import { styled } from 'Styles/materialThemes'

const DivTableContainer = styled('div')(({ theme }) => ({
    '&::-webkit-scrollbar': {
        width: '12px',
    },

    '&::-webkit-scrollbar-thumb': {
        height: '15%',
        border: '3px solid transparent',
        backgroundClip: 'padding-box',
        backgroundColor: theme.palette.divider,
        WebkitBorderRadius: '12px',
    },

    overflowY: 'auto',
    maxHeight: '300px',
}))

const generateTeamUsersQuery = (userIds) => {
    return userIds.map(id => `id:${id}`).join(' OR ')
}

const TeamUsers = ({ userIds, setUserIds }) => {
    const dispatch = useDispatch()

    const users = useSelector((state) => selectUsersByIds(state, userIds))

    const buildRows = () => {
        return users.map((user) => ({
            data: [user.username, user.displayName, buildActions(user.id)],
            properties: {
                strikeThrough: false,
            },
        }))
    }

    useEffect(() => {
        const missingUserIds = userIds.filter(
            (_id, index) => users[index].id === undefined
        )
        if (missingUserIds.length > 0) {
            dispatch(requestFindUserBy(generateTeamUsersQuery(missingUserIds)))
        }
    }, [userIds])

    const addUser = (userId) => {
        const updatedUserIds = [...userIds, userId]
        setUserIds(updatedUserIds)
    }

    const removeUser = (userId) => {
        const updatedUserIds = userIds.filter((id) => id !== userId)
        setUserIds(updatedUserIds)
    }

    const buildActions = (userId) => {
        return (
            <IconButton
                title = 'remove user'
                color = 'secondary'
                onClick = {() => removeUser(userId)}
                size = 'large'
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
                placeholder = 'Add another team member...'
                style = {{
                    height: '32px',
                    marginTop: '8px',
                    marginBottom: '24px',
                }}
            />
            <DivTableContainer>
                <Table
                    columns = {['username', 'display name', '']}
                    rows = {buildRows()}
                    tableWidth = '100%'
                    disableHeaders
                    disableRowDividers = {true}
                    stickyHeader = {true}
                    data-testid = 'TeamUsers__Table'
                />
            </DivTableContainer>
        </>
    )
}

TeamUsers.propTypes = {
    userIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    setUserIds: PropTypes.func.isRequired,
}

export default TeamUsers