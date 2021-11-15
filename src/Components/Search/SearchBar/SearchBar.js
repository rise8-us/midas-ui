import { Search } from '@mui/icons-material'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import useDebounce from 'Hooks/useDebounce'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { styled } from 'Styles/materialThemes'

const StyledAutocomplete = styled(Autocomplete)(({ theme, growfrom, growto }) => ({
    width: growfrom,
    '&:focus-within': {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        width: growto,
    },
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
}))

const TextFieldStyled = styled(TextField)(() => ({
    height: '100%',
    justifyContent: 'center',
    marginTop: 0
}))

const displayOnSearchAdornment = (displayOnSearch, onFocus, icon) => {
    if (displayOnSearch && onFocus) return icon
    if (displayOnSearch) return icon
    return null
}

function SearchBar({
    options,
    onChange,
    textFieldProps,
    onTextFieldChange,
    getOptionLabel,
    disableUnderline,
    growFrom,
    growTo,
    displayOnSearch,
    inputDataTestId,
    startAdornment,
    showLoading,
    inputFontSize,
    ...autoCompleteProps
}) {

    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [focus, setFocus] = React.useState(false)
    const onFocus = () => setFocus(true)
    const onBlur = () => setFocus(false)

    const debouncedSearchTerm = useDebounce(searchTerm, 325)

    const handleTextFieldOnChange = (e) => {
        setIsLoading(showLoading && e.target.value.length > 0)
        setSearchTerm(e.target.value)
    }

    useEffect(() => {
        onTextFieldChange(debouncedSearchTerm)
        setIsLoading(false)
    }, [debouncedSearchTerm])

    return (
        <StyledAutocomplete
            {...autoCompleteProps}
            growfrom = {growFrom}
            growto = {growTo}
            loading = {showLoading && isLoading}
            noOptionsText = 'No options available'
            onChange = {onChange}
            options = {options}
            getOptionLabel = {getOptionLabel}
            renderInput = {(params) => (
                <TextFieldStyled
                    fullWidth
                    {...params}
                    {...textFieldProps}
                    onChange = {handleTextFieldOnChange}
                    onFocus = { onFocus }
                    onBlur = { onBlur }
                    InputProps = {{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {isLoading && <CircularProgress color = 'inherit' size = {20} />}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                        style: { fontSize: inputFontSize },
                        startAdornment: displayOnSearchAdornment(displayOnSearch, focus, startAdornment),
                        disableUnderline,
                        'data-testid': inputDataTestId,
                    }}
                />
            )}
        />
    )
}

SearchBar.propTypes = {
    onChange: PropTypes.func,
    onTextFieldChange: PropTypes.func,
    getOptionLabel: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            id: PropTypes.number
        })
    ])
    ),
    textFieldProps: PropTypes.shape({
        label: PropTypes.string,
        placeholder: PropTypes.string
    }),
    disableUnderline: PropTypes.bool,
    growFrom: PropTypes.string,
    growTo: PropTypes.string,
    displayOnSearch: PropTypes.bool,
    inputDataTestId: PropTypes.string,
    showLoading: PropTypes.bool,
    startAdornment: PropTypes.node,
    inputFontSize: PropTypes.string,
}

SearchBar.defaultProps = {
    options: [],
    onChange: () => { /* Empty */ },
    onTextFieldChange: () => { /* Empty */ },
    getOptionLabel: (value) => value,
    textFieldProps: {
        label: undefined,
        placeholder: undefined
    },
    disableUnderline: false,
    growFrom: '100%',
    growTo: '100%',
    displayOnSearch: true,
    inputDataTestId: 'SearchBar__input',
    startAdornment: <Search />,
    showLoading: true,
    inputFontSize: 'inherit',
}

export default SearchBar