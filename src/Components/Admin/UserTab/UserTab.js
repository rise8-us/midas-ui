import { Search } from '@mui/icons-material'
import { Stack } from '@mui/material'
import { SearchUsers } from 'Components/Search'
import { Table } from 'Components/Table'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { openPopup } from 'Redux/Popups/actions'
import userConstants from 'Redux/Users/constants'
import { styled } from 'Styles/materialThemes'

const StyledSearchUsers = styled(SearchUsers)(({ theme, top }) => ({
    position: 'sticky',
    top: top + 'px',
    boxShadow: '0 0 10px black',
    height: 48,
    borderRadius: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    backgroundColor: theme.palette.background.paper
}))

export default function UserTab({ offsetTop }) {
    const dispatch = useDispatch()

    const [results, setResults] = useState([])

    const buildRows = useCallback(() => {
        return results.map((r) => ({
            data: [r.id, r.username, r.email, r.displayName],
            properties: {
                strikeThrough: false,
            },
        }))
    }, [results])

    const updateUser = (data) => {
        dispatch(openPopup(userConstants.UPDATE_USER, 'UserPopup', { id: data[0] }))
    }

    return (
        <Stack spacing = {1} m = {[2, 3, 1, 3]}>
            <StyledSearchUsers
                onDataReturn = {data => setResults(data ?? [])}
                title = ''
                top = {offsetTop}
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
            <div>
                <Table
                    columns = {['id', 'username', 'email', 'display name']}
                    rows = {buildRows()}
                    onRowClick = {updateUser}
                    tableWidth = '100%'
                />
            </div>
        </Stack>
    )
}

UserTab.propTypes = {
    offsetTop: PropTypes.number
}

UserTab.defaultProps = {
    offsetTop: 0
}