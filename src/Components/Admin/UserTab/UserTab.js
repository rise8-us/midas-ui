import { Search } from '@mui/icons-material'
import { Box } from '@mui/material'
import { SearchUsers } from 'Components/Search'
import { Table } from 'Components/Table'
import { UserRoles } from 'Components/UserRoles'
import { UserSettings } from 'Components/UserSettings'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from 'Redux/Users/selectors'
import { styled } from 'Styles/materialThemes'

const StyledDiv = styled('div')(({ theme }) => ({
    margin: theme.spacing(1, 3)
}))

const StyledSearchUsers = styled(SearchUsers)(({ theme }) => ({
    height: 48,
    margin: theme.spacing(3, 3, 1, 3),
    borderRadius: 6,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    backgroundColor: theme.palette.background.paper
}))

const isValidUser = (userId) => {
    return typeof userId === 'number' ? true : false
}

function UserTab() {
    const [results, setResults] = useState([])
    const [userId, setUserId] = useState()
    const [show, setShow] = useState(false)

    const user = useSelector((state) => selectUserById(state, userId))
    const buildRows = useCallback(() => {
        return results.map((r) => ({
            data: [r.id, r.username, r.email, r.displayName],
            properties: {
                strikeThrough: false,
            },
        }))
    }, [results])

    const showUser = (data) => {
        setShow(prev => !prev)
        setUserId(data[0])
    }

    useEffect(() => {
        setShow(isValidUser(userId))
    }, [userId])

    return (
        <Box display = 'flex' flexDirection = 'column'>
            <StyledSearchUsers
                onDataReturn = {data => setResults(data ?? [])}
                title = ''
                growFrom = '30%'
                growTo = '60%'
                placeholder = 'Search…'
                inputDataTestId = 'UserTab__search-input'
                disableUnderline
                displayOnSearch = {false}
                value = ''
                onChange = {(e) => e}
                showLoading = {false}
                startAdornment = {<Search
                    color = 'secondary'
                    sx = {{
                        marginRight: 1,
                        fontSize: '26px'
                    }}
                />}
            />
            <>
                <StyledDiv>
                    <Table
                        columns = {['id', 'username', 'email', 'display name']}
                        rows = {buildRows()}
                        onRowClick = {showUser}
                        tableWidth = '100%'
                    />
                </StyledDiv>
                {show && (
                    <>
                        <UserSettings id = {userId} />
                        <UserRoles user = {user} editable />
                    </>
                )}
            </>
        </Box>
    )
}

export default UserTab