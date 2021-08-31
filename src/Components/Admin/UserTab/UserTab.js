import { alpha, Box, CircularProgress, InputBase, makeStyles } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { unwrapResult } from '@reduxjs/toolkit'
import { Table } from 'Components/Table'
import { UserRoles } from 'Components/UserRoles'
import { UserSettings } from 'Components/UserSettings'
import useDebounce from 'Hooks/useDebounce'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestFindUserBy } from 'Redux/Users/actions'
import { selectUserById } from 'Redux/Users/selectors'

const useStyles = makeStyles(theme => ({
    searchIcon: {
        width: 36,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.secondary.main
    },
    inputRoot: {
        height: 48,
        color: 'inherit',
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
            backgroundColor: alpha(theme.palette.background.paper, 0.85)
        },
        margin: theme.spacing(3, 3, 1, 3),
        borderRadius: 3,
        width: '25%',
        '&:focus-within': {
            width: '50%',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        }
    },
    searching: {
        padding: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    tableWrap: {
        margin: theme.spacing(1, 3)
    }
}))

function UserTab() {

    const classes = useStyles()
    const dispatch = useDispatch()

    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [userId, setUserId] = useState()
    const [show, setShow] = useState(false)

    const user = useSelector(state => selectUserById(state, userId))

    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    const buildRows = useCallback(() => {
        return results.map(r => ({
            data: [
                r.id,
                r.username,
                r.email,
                r.displayName
            ],
            properties: {
                strikeThrough: false
            }
        }))
    }, [results])

    const handleSubmit = (e) => {
        e.preventDefault()
        const searchValue = e.target.value
        const searchString = `username:*${searchValue}* OR email:*${searchValue}* OR displayName:*${searchValue}*`
        setSearchTerm(searchString)
    }

    const showUser = (data) => {
        setUserId(data[0])
        setShow(true)
    }

    useEffect(() => {
        setShow(false)
        if (debouncedSearchTerm) {
            setIsSearching(true)
            dispatch(requestFindUserBy(debouncedSearchTerm)).then(unwrapResult).then(data => {
                setIsSearching(false)
                setResults(data)
            })
        } else {
            setResults([])
        }
    }, [debouncedSearchTerm])

    return (
        <Box display = 'flex' flexDirection = 'column'>
            <InputBase
                placeholder = 'Search…'
                startAdornment = {<Search className = {classes.searchIcon}/>}
                endAdornment = {isSearching ? <CircularProgress className = {classes.searching}/> : null}
                classes = {{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                    focused: classes.inputFocus
                }}
                inputProps = {{ 'data-testid': 'UserTab__search-input' }}
                onChange = {handleSubmit}
            />
            <>
                <div className = {classes.tableWrap}>
                    <Table
                        columns = {['id', 'username', 'email', 'display name']}
                        rows = {buildRows()}
                        onRowClick = {showUser}
                        tableWidth = '100%'
                    />
                </div>
                {show &&
                    <>
                        <UserSettings user = {user.id} />
                        <UserRoles user = {user} editable/>
                    </>
                }
            </>
        </Box>
    )
}

export default UserTab
