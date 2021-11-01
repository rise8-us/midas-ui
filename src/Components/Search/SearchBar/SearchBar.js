import { Close, Search } from '@mui/icons-material'
import { CircularProgress, IconButton, TextField } from '@mui/material'
import useDebounce from 'Hooks/useDebounce'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { styled } from 'Styles/materialThemes'

const SearchStyled = styled(Search)(({ theme }) => ({
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.secondary.main
}))

const transitions = {
    transition: (theme) => theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    })
}

function SearchBar(props) {
    const {
        growFrom,
        growTo,
        enableUnderline,
        disableClearable,
        fontSize,
        defaultValue,
        search,
        height,
        borderRadius,
        searchIconHeight,
        ...textFieldProps
    } = props

    const [searchTerm, setSearchTerm] = useState(defaultValue)
    const [isSearching, setIsSearching] = useState(false)

    const debouncedSearchTerm = useDebounce(searchTerm.trim(), 325)

    const handleOnChange = (e) => setSearchTerm(e.target.value)

    useEffect(() => {
        setIsSearching(true)
        typeof search === 'function' && search(debouncedSearchTerm)
        setIsSearching(false)
    }, [debouncedSearchTerm])

    return (
        <TextField
            {...textFieldProps}
            sx = {{
                height: height,
                width: growFrom,
                '&:focus-within': {
                    ...transitions,
                    width: growTo,
                },
                ...transitions,
            }}
            onChange = {handleOnChange}
            value = {searchTerm}
            InputProps = {{
                endAdornment: (
                    <>
                        {isSearching &&
                        <CircularProgress
                            color = 'primary'
                            size = {20}
                            title = 'searching'
                            sx = {{ m: '8px' }}
                        />}
                        {!disableClearable && searchTerm.length > 0 && (
                            <IconButton
                                sx = {{ m: 1 }}
                                title = 'clear'
                                size = 'small'
                                onClick = {() => setSearchTerm('')}
                            >
                                <Close />
                            </IconButton>
                        )}
                    </>
                ),
                startAdornment: <SearchStyled sx = {{ width: '36px', height: searchIconHeight }} />,
                disableUnderline: !enableUnderline,
                sx: {
                    backgroundColor: 'background.paper',
                    '&:hover': {
                        borderRadius,
                        backgroundColor: 'grey.800'
                    },
                },
                style: {
                    height: '100%',
                    margin: 'auto 0',
                    fontSize,
                    borderRadius,
                },
                'data-testid': 'Search__input'
            }}
        />
    )
}
SearchBar.propTypes = {
    borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    defaultValue: PropTypes.string,
    disableClearable: PropTypes.bool,
    enableUnderline: PropTypes.bool,
    fontSize: PropTypes.string,
    growFrom: PropTypes.string,
    growTo: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    search: PropTypes.func,
    searchIconHeight: PropTypes.string,
    title: PropTypes.string,
    variant: PropTypes.oneOf(['standard', 'outlined', 'filled'])
}

SearchBar.defaultProps = {
    borderRadius: 3,
    defaultValue: '',
    disableClearable: false,
    enableUnderline: false,
    fontSize: 'initial',
    growFrom: '50%',
    growTo: '100%',
    height: 48,
    label: undefined,
    onChange: undefined,
    placeholder: undefined,
    search: undefined,
    searchIconHeight: '28px',
    title: 'Search',
    variant: 'standard'
}

export default SearchBar
