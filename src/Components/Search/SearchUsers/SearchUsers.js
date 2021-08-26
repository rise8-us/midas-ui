import { unwrapResult } from '@reduxjs/toolkit'
import useDebounce from 'Hooks/useDebounce'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestFindUserBy } from 'Redux/Users/actions'
import { AutocompleteSearch } from '../AutocompleteSearch'

function SearchUsers(props) {
    const { onChange, value, growFrom, dynamicUpdate, ...autoCompleteProps } = props

    const dispatch = useDispatch()

    const [options, setOptions] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [selectedUser, setSelectedUser] = useState(value)

    const debouncedSearchTerm = useDebounce(searchTerm, 325)

    const onUserChange = (event, values) => {
        setSelectedUser(values)
        typeof onChange === 'function' && onChange(event, values)
    }

    const onSearchChange = (event) => {
        event.preventDefault()
        setSearchTerm(event.target.value)
    }

    const getOptionLabel = (option) => {
        const displayName = option.displayName ? ` (${option.displayName})` : ''
        return `${option.username}${displayName}`
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true)
            const searchString = `username:*${debouncedSearchTerm}* OR \
            email:*${debouncedSearchTerm}* OR \
            displayName:*${debouncedSearchTerm}*`

            dispatch(requestFindUserBy(searchString)).then(unwrapResult)
                .then(data => {
                    setOptions(data)
                    setIsSearching(false)
                })
        } else {
            setOptions([])
        }
    }, [debouncedSearchTerm])

    useEffect(() => {
        dynamicUpdate && setSelectedUser(value)
    }, [value])

    return (
        <AutocompleteSearch
            {...autoCompleteProps}
            options = {options}
            selectedOption = {selectedUser}
            onOptionChange = {onUserChange}
            onTextChange = {onSearchChange}
            getOptionLabel = {getOptionLabel}
            noOptionsText = {(debouncedSearchTerm.length === 0)
                ? 'Search for a user…'
                : 'No user(s) found…'}
            isSearching = {isSearching}
            setIsSearching = {setIsSearching}
            growFrom = {growFrom}
        />
    )
}

SearchUsers.propTypes = {
    onChange: PropTypes.func,
    growFrom: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        displayName: PropTypes.string
    }),
    freeSolo: PropTypes.bool,
    placeholder: PropTypes.string,
    dynamicUpdate: PropTypes.bool,
}

SearchUsers.defaultProps = {
    onChange: undefined,
    growFrom: '50%',
    title: 'Search users',
    value: undefined,
    freeSolo: false,
    placeholder: 'username, display name, or email',
    dynamicUpdate: false
}

export default SearchUsers
