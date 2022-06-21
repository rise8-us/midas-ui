import { HighlightOff } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { SearchUsers } from 'Components/Search/SearchUsers'
import { Table } from 'Components/Table'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSearchUsers } from 'Redux/Users/actions'
import { selectUsersByIds } from 'Redux/Users/selectors'
import { scrollbar, styled } from 'Styles/materialThemes'

const DivTableContainer = styled('div')(({ theme }) => ({
    ...scrollbar(theme),
    overflowY: 'auto',
    maxHeight: '300px',
}))

const StyledFieldset = styled('fieldset')(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
}))

const StyledLegend = styled('legend')(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '12px'
}))

const generateTeamUsersQuery = (userIds) => {
    return userIds.map(id => `id:${id}`).join(' OR ')
}

export default function UsersCollection(props) {
    const { userIds, setUserIds, placeholderValue, title, dataTestId, userListPosition } = props
    const dispatch = useDispatch()

    const users = useSelector((state) => selectUsersByIds(state, userIds))
    const [error, setError] = useState(null)

    const buildRows = () => {
        return users.map((user) => ({
            data: [user.displayName ? user.displayName : user.username, buildActions(user.id)],
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
            dispatch(requestSearchUsers(generateTeamUsersQuery(missingUserIds)))
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

    const getTableContainer = () => {
        return users.length === 0
            ? <Typography
                variant = 'body2'
                fontStyle = 'italic'
                color = 'secondary'
                fontWeight = 'bold'
                padding = '14px 8px'
            >
                {`No ${title} added`}
            </Typography>
            : <DivTableContainer>
                <Table
                    columns = {['username', '']}
                    rows = {buildRows()}
                    tableWidth = '100%'
                    disableHeaders
                    disableRowDividers = {true}
                    data-testid = 'UserCollection__table'
                />
            </DivTableContainer>
    }

    return (
        <StyledFieldset>
            {title && <StyledLegend>{title}</StyledLegend>}
            {userListPosition === 'top' && getTableContainer()}
            <SearchUsers
                data-testid = {dataTestId}
                onChange = {(_e, values) => {
                    values && addUser(values.id)
                }}
                title = ''
                placeholder = {placeholderValue}
                style = {{
                    padding: '0 8px'
                }}
                error = {error}
                clearOnSelect
            />
            {userListPosition === 'bottom' && getTableContainer()}
        </StyledFieldset>
    )
}

UsersCollection.propTypes = {
    dataTestId: PropTypes.string,
    placeholderValue: PropTypes.string,
    setUserIds: PropTypes.func.isRequired,
    title: PropTypes.string,
    userIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    userListPosition: PropTypes.string
}

UsersCollection.defaultProps = {
    dataTestId: '',
    placeholderValue: '',
    title: '',
    userListPosition: 'bottom'
}