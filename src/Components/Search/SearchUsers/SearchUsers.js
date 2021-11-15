import { unwrapResult } from '@reduxjs/toolkit'
import { SearchBar } from 'Components/Search'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestFindUserBy } from 'Redux/Users/actions'

function SearchUsers({ onDataReturn, onChange, title, placeholder, value, ...autoCompleteProps }) {
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
            onChange = {onChange}
            onTextFieldChange = {onTextFieldChange}
            getOptionLabel = {getOptionLabel}
            options = {options}
            freeSolo
            loadingText = 'Searching for user(s)...'
            textFieldProps = {{
                label: title,
                placeholder: placeholder,
                margin: 'dense'
            }}
        />
    )
}

SearchUsers.propTypes = {
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            id: PropTypes.number,
            username: PropTypes.string,
            displayName: PropTypes.string
        })
    ]),
    placeholder: PropTypes.string,
    onDataReturn: PropTypes.func
}

SearchUsers.defaultProps = {
    title: 'Search users',
    value: '',
    placeholder: 'username, display name, or email',
    onDataReturn: undefined
}

export default SearchUsers
