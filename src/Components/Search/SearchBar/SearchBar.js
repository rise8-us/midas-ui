import { Search } from '@mui/icons-material'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import useDebounce from 'Hooks/useDebounce'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
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
    disableUnderline,
    displayOnSearch,
    getOptionLabel,
    growFrom,
    growTo,
    inputDataTestId,
    inputFontSize,
    onChange,
    onTextFieldChange,
    options,
    loading,
    showLoading,
    startAdornment,
    textFieldProps,
    ...autoCompleteProps
}) {

    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [focus, setFocus] = useState(false)

    const unsupportedOutlinedVariantProps = {}
    textFieldProps.variant !== 'outlined' && (unsupportedOutlinedVariantProps.disableUnderline = disableUnderline)

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

    const handleOnChange = (event, values, reason) => {
        onChange(event, values, reason)
    }

    return (
        <StyledAutocomplete
            {...autoCompleteProps}
            growfrom = {growFrom}
            growto = {growTo}
            loading = {(showLoading && isLoading) || loading}
            noOptionsText = 'No options available'
            onChange = {handleOnChange}
            options = {options}
            getOptionLabel = {getOptionLabel}
            renderInput = {(params) => (
                <TextFieldStyled
                    fullWidth
                    {...params}
                    {...textFieldProps}
                    onChange = {handleTextFieldOnChange}
                    onFocus = {onFocus}
                    onBlur = {onBlur}
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
                        'data-testid': inputDataTestId,
                        ...unsupportedOutlinedVariantProps
                    }}
                />
            )}
        />
    )
}

SearchBar.propTypes = {
    disableUnderline: PropTypes.bool,
    displayOnSearch: PropTypes.bool,
    getOptionLabel: PropTypes.func,
    growFrom: PropTypes.string,
    growTo: PropTypes.string,
    inputDataTestId: PropTypes.string,
    inputFontSize: PropTypes.string,
    loading: PropTypes.bool,
    onChange: PropTypes.func,
    onTextFieldChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            id: PropTypes.number
        })
    ])),
    showLoading: PropTypes.bool,
    startAdornment: PropTypes.node,
    textFieldProps: PropTypes.shape({
        label: PropTypes.string,
        placeholder: PropTypes.string,
        variant: PropTypes.oneOf(['filled', 'outlined', 'standard'])
    }),
}

SearchBar.defaultProps = {
    disableUnderline: false,
    displayOnSearch: true,
    getOptionLabel: (value) => value,
    growFrom: '100%',
    growTo: '100%',
    inputDataTestId: 'SearchBar__input',
    inputFontSize: 'inherit',
    loading: false,
    onChange: (e) => e,
    onTextFieldChange: (e) => e,
    options: [],
    showLoading: true,
    startAdornment: <Search />,
    textFieldProps: {
        label: undefined,
        placeholder: undefined,
        variant: 'standard'
    },
}

export default SearchBar