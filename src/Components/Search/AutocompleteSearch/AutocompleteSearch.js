import { alpha, CircularProgress, makeStyles, TextField } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

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

const AutocompleteSearch = (props) => {
    const {
        title, placeholder, options, selectedOption, noOptionsText,
        onOptionChange, onTextChange, getOptionLabel,
        setIsSearching, isSearching, growFrom, freeSolo
    } = props

    const classes = useStyles({ growFrom })

    const [open, setOpen] = useState(false)

    const generateOptionLabel = (option) => {
        return option ? getOptionLabel(option) : ''
    }

    useEffect(() => { !open && setIsSearching(false) }, [open])

    return (
        <Autocomplete
            options = {options}
            noOptionsText = {noOptionsText}
            handleHomeEndKeys
            freeSolo = {freeSolo}
            onFocus = {() => setOpen(true)}
            onBlur = {() => setOpen(false)}
            getOptionLabel = {generateOptionLabel}
            getOptionSelected = {(option, selectedValue) => option.id === selectedValue.id}
            loading = {isSearching}
            loadingText = 'Searching…'
            value = {selectedOption ?? ''}
            onChange = {onOptionChange}
            renderInput = {(params) =>
                <TextField
                    {...params}
                    label = {title}
                    margin = 'dense'
                    placeholder = {placeholder}
                    classes = {{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                        focused: classes.inputFocus
                    }}
                    InputProps = {{
                        ...params.InputProps,
                        endAdornment: isSearching
                            ? <CircularProgress color = 'inherit' size = {20} />
                            : <>{params.InputProps.endAdornment}</>,
                        startAdornment: open
                            ? <Search className = {classes.searchIcon}/>
                            : null,
                        style: { paddingRight: '24px' },
                        onChange: onTextChange,
                        'data-testid': 'AutocompleteSearch__input'
                    }}
                />
            }
            filterOptions = {() => options}
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