import { alpha, CircularProgress, makeStyles, TextField } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useDebounce from '../../../Hooks/useDebounce'
import { requestFindUserBy } from '../../../Redux/Users/actions'

const useStyles = makeStyles(theme => ({
    searchIcon: {
        width: 36,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.secondary.main
    },
    inputRoot: props => ({
        height: 48,
        color: 'inherit',
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
            backgroundColor: alpha(theme.palette.background.paper, 0.85)
        },
        borderRadius: 3,
        width: props.growFrom,
        '&:focus-within': {
            width: '100%',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        }
    }),
    searching: {
        padding: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    tableWrap: {
        margin: theme.spacing(1, 3)
    }
}))

function SearchUsers(props) {
    const { growFrom, onChange, title, value, variant, disableUnderline, ...otherProps } = props

    const classes = useStyles({ growFrom })
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [selectedUser, setSelectedUser] = useState()

    const debouncedSearchTerm = useDebounce(searchTerm, 325)

    const onUserChange = (event, values) => {
        setSelectedUser(values)
        typeof onChange === 'function' && onChange(event, values)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearchTerm(e.target.value)
    }

    const getNoOptionsText = () => {
        if (debouncedSearchTerm.length === 0) return 'Search for a user…'
        else return 'No user(s) found…'
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

    useEffect(() => { !open && setIsSearching(false) }, [open])

    useEffect(() => {
        value && setSelectedUser(value)
    }, [value])

    return (
        <Autocomplete
            {...otherProps}
            options = {options}
            noOptionsText = {getNoOptionsText()}
            handleHomeEndKeys
            open = {open}
            onOpen = {() => setOpen(true)}
            onClose = {() => setOpen(false)}
            getOptionLabel = {getOptionLabel}
            getOptionSelected = {(option, selectedValue) => option.id === selectedValue.id}
            loading = {isSearching}
            loadingText = 'Searching…'
            value = {selectedUser ?? null}
            onChange = {onUserChange}
            renderInput = {(params) =>
                <TextField
                    variant = {variant}
                    {...params}
                    label = {title}
                    margin = 'dense'
                    placeholder = 'username, display name, or email'
                    classes = {{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                        focused: classes.inputFocus
                    }}
                    InputProps = {{
                        ...params.InputProps,
                        endAdornment: isSearching ?
                            <CircularProgress color = 'inherit' size = {20} />
                            :
                            <>{params.InputProps.endAdornment}</>,
                        startAdornment: open ? <Search className = {classes.searchIcon}/> : null,
                        onChange: handleSubmit,
                        disableUnderline,
                        style: { paddingRight: '8px' },
                        'data-testid': 'SearchUser__input'
                    }}
                />
            }
            filterOptions = {() => options}
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
    disableClearable: PropTypes.bool,
    disableUnderline: PropTypes.bool,
    variant: PropTypes.string
}

SearchUsers.defaultProps = {
    onChange: undefined,
    growFrom: '50%',
    title: 'Search users',
    value: undefined,
    freeSolo: false,
    disableClearable: false,
    disableUnderline: false,
    variant: 'standard'
}

export default SearchUsers
