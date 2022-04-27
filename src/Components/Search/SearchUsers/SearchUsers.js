import { Search } from '@mui/icons-material'
import { unwrapResult } from '@reduxjs/toolkit'
import { SearchBar } from 'Components/Search'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestFindUserBy } from 'Redux/Users/actions'

function SearchUsers({ onDataReturn, title, placeholder, value, error, ...autoCompleteProps }) {
    const dispatch = useDispatch()

    const [options, setOptions] = useState([])

    const getOptionLabel = (option) => {
        if (option.displayName && option.username) {
            return `${option.username} (${option.displayName})`
        } else if (option.username) {
            return `${option.username}`
        } else {
            return ''
        }
    }

    const onTextFieldChange = (input) => {
        const searchValue = `username:*${input}* OR email:*${input}* OR displayName:*${input}*`

        dispatch(requestFindUserBy(searchValue))
            .then(unwrapResult)
            .then(data => {
                typeof onDataReturn === 'function' ? onDataReturn(data) : setOptions(data)
            })
    }

    return (
        <SearchBar
            {...autoCompleteProps}
            value = {value}
            onTextFieldChange = {onTextFieldChange}
            getOptionLabel = {getOptionLabel}
            options = {options}
            freeSolo
            loadingText = 'Searching for user(s)...'
            textFieldProps = {{
                label: title,
                placeholder: placeholder,
                error: error !== null,
                helperText: error,
                margin: 'dense'
            }}
        />
    )
}

SearchUsers.propTypes = {
    onDataReturn: PropTypes.func,
    placeholder: PropTypes.string,
    startAdornment: PropTypes.node,
    title: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            id: PropTypes.number,
            username: PropTypes.string,
            displayName: PropTypes.string
        })
    ]),
    error: PropTypes.string
}

SearchUsers.defaultProps = {
    onDataReturn: undefined,
    placeholder: 'username, display name, or email',
    startAdornment: <Search />,
    title: 'Search users',
    value: '',
    error: null
}

export default SearchUsers
