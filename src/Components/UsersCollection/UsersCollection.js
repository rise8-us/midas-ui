import { HighlightOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { SearchUsers } from 'Components/Search/SearchUsers'
import { Table } from 'Components/Table'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestFindUserBy } from 'Redux/Users/actions'
import { selectUsersByIds } from 'Redux/Users/selectors'
import { scrollbar, styled } from 'Styles/materialThemes'

const DivTableContainer = styled('div')(({ theme }) => ({
    ...scrollbar(theme),
    overflowY: 'auto',
    maxHeight: '300px',
}))

const generateTeamUsersQuery = (userIds) => {
    return userIds.map(id => `id:${id}`).join(' OR ')
}

const UsersCollection = ({ userIds, setUserIds, placeholderValue, title, dataTestId }) => {
    const dispatch = useDispatch()

    const users = useSelector((state) => selectUsersByIds(state, userIds))
    const [error, setError] = useState(null)

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
        if (!userId) {
            setError('Please select a user from the list')
        } else {
            setUserIds(updatedUserIds)
            setError(null)
        }
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
                data-testid = {dataTestId}
                onChange = {(_e, values) => {
                    values && addUser(values.id)
                }}
                title = {title}
                placeholder = {placeholderValue}
                style = {{
                    marginTop: '8px',
                    marginBottom: '24px',
                }}
                error = {error}
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

UsersCollection.defaultProps = {
    placeholderValue: '',
    title: '',
    dataTestId: ''
}

UsersCollection.propTypes = {
    userIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    setUserIds: PropTypes.func.isRequired,
    placeholderValue: PropTypes.string,
    title: PropTypes.string,
    dataTestId: PropTypes.string
}

export default UsersCollection