import { Search } from '@mui/icons-material'
import { alpha, Autocomplete, CircularProgress, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { styled } from 'Styles/materialThemes'

const TextFieldStyled = styled(TextField)(({ theme }) => ({
    height: 48,
    color: 'inherit',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
        backgroundColor: alpha(theme.palette.background.paper, 0.85)
    },
    borderRadius: 3,
    '&:focus-within': {
        width: '100%',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    }
}))
const SearchStyled = styled(Search)(({ theme }) => ({
    width: 36,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.secondary.main,
}))

const AutocompleteSearch = (props) => {
    const {
        title,
        placeholder,
        options,
        selectedOption,
        noOptionsText,
        onOptionChange,
        onTextChange,
        getOptionLabel,
        setIsSearching,
        isSearching,
        growFrom,
        freeSolo,
        ...autoCompleteProps
    } = props


    const [open, setOpen] = useState(false)

    const generateOptionLabel = (option) => {
        return option ? getOptionLabel(option) : ''
    }

    useEffect(() => {
        !open && setIsSearching(false)
    }, [open])

    return (
        <Autocomplete
            options = {options}
            noOptionsText = {noOptionsText}
            handleHomeEndKeys
            freeSolo = {freeSolo}
            onFocus = {() => setOpen(true)}
            onBlur = {() => setOpen(false)}
            getOptionLabel = {generateOptionLabel}
            isOptionEqualToValue = {(option, selectedValue) =>
                option.id === selectedValue.id
            }
            loading = {isSearching}
            loadingText = 'Searching…'
            value = {selectedOption ?? ''}
            onChange = {onOptionChange}
            renderInput = {(params) => (
                <TextFieldStyled
                    {...params}
                    label = {title}
                    margin = 'dense'
                    placeholder = {placeholder}
                    sx = {{
                        width: growFrom
                    }}
                    InputProps = {{
                        ...params.InputProps,
                        endAdornment: isSearching ? (
                            <CircularProgress color = 'inherit' size = {20} />
                        ) : (
                            <>{params.InputProps.endAdornment}</>
                        ),
                        startAdornment: open ? <SearchStyled /> : null,
                        style: { paddingRight: '24px' },
                        onChange: onTextChange,
                        'data-testid': 'AutocompleteSearch__input',
                    }}
                />
            )}
            {...autoCompleteProps}
        />
    )
}

AutocompleteSearch.propTypes = {
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.array.isRequired,
    selectedOption: PropTypes.any,
    onOptionChange: PropTypes.func,
    onTextChange: PropTypes.func,
    getOptionLabel: PropTypes.func.isRequired,
    noOptionsText: PropTypes.string,
    setIsSearching: PropTypes.func,
    isSearching: PropTypes.bool,
    growFrom: PropTypes.string,
    freeSolo: PropTypes.bool,
}

AutocompleteSearch.defaultProps = {
    placeholder: '',
    selectedOption: '',
    onOptionChange: undefined,
    onTextChange: undefined,
    noOptionsText: 'No Options',
    setIsSearching: undefined,
    isSearching: false,
    growFrom: '50%',
    freeSolo: false,
}

export default AutocompleteSearch