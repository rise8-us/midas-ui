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
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
            backgroundColor: fade(theme.palette.background.paper, 0.85)
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
    clearableIcon: {
        margin: theme.spacing(1)
    }
}))

function SeachBar(props) {
    const { growFrom, enableUnderline, disableClearable, search, height, ...textFieldProps } = props

    const classes = useStyles({ growFrom, height })

    const [searchTerm, setSearchTerm] = useState('')
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
                startAdornment: <Search className = {classes.searchIcon}/>,
                disableUnderline: !enableUnderline,
                style: {
                    height: '100%',
                    margin: 'auto 0'
                },
                'data-testid': 'Search__input'
            }}
        />
    )
}

SeachBar.propTypes = {
    onChange: PropTypes.func,
    growFrom: PropTypes.string,
    enableUnderline: PropTypes.bool,
    disableClearable: PropTypes.bool,
    search: PropTypes.func,
    height: PropTypes.number,
    title: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
}

SeachBar.defaultProps = {
    onChange: undefined,
    growFrom: '50%',
    enableUnderline: false,
    search: undefined,
    height: 48,
    disableClearable: false,
    title: 'Search',
    label: undefined,
    placeholder: undefined,
    variant: 'standard',
}

export default SeachBar
