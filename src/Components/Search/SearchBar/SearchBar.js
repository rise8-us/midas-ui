import { CircularProgress, fade, IconButton, makeStyles, TextField } from '@material-ui/core'
import { Close, Search } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import useDebounce from '../../../Hooks/useDebounce'

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
        height: props.height,
        color: 'inherit',
        borderRadius: props.borderRadius,
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
            backgroundColor: fade(theme.palette.background.paper, 0.85)
        },
        width: props.growFrom,
        '&:focus-within': {
            width: props.growTo,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    }),
    clearableIcon: {
        margin: theme.spacing(1)
    }
}))

function SearchBar(props) {
    const { growFrom, growTo, enableUnderline, disableClearable, fontSize, defaultValue,
        search, height, borderRadius, searchIconHeight, ...textFieldProps } = props

    const classes = useStyles({ growFrom, growTo, height, borderRadius })

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
            { ...textFieldProps }
            classes = {{
                root: classes.inputRoot,
                input: classes.inputInput,
                focused: classes.inputFocus
            }}
            onChange = {handleOnChange}
            value = {searchTerm}
            InputProps = {{
                endAdornment: <>
                    {isSearching &&
                        <CircularProgress
                            color = 'primary'
                            size = {20}
                            title = 'searching'
                            style = {{ margin: '8px' }}
                        />
                    }
                    {!disableClearable && searchTerm.length > 0 &&
                        <IconButton
                            title = 'clear'
                            size = 'small'
                            className = {classes.clearableIcon}
                            onClick = {() => setSearchTerm('')}
                        >
                            <Close/>
                        </IconButton>
                    }
                </>,
                startAdornment: <Search className = {classes.searchIcon} style = {{ height: searchIconHeight }}/>,
                disableUnderline: !enableUnderline,
                style: {
                    height: '100%',
                    margin: 'auto 0',
                    fontSize
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
    variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
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
    variant: 'standard',
}

export default SearchBar
