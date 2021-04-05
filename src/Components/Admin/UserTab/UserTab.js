import { IconButton, InputBase, makeStyles, Paper, Typography } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestFetchOneUser } from '../../../Redux/Users/actions'
import { getUserById } from '../../../Redux/Users/selectors'
import { Header } from '../../Header'
import { UserRoles } from '../../UserRoles'
import { UserSettings } from '../../UserSettings'

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        marginLeft: 20
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}))

function UserTab() {

    const classes = useStyles()
    const dispatch = useDispatch()

    const [userId, setUserId] = useState('')
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)

    const user = useSelector((state) => getUserById(state, userId))

    useEffect(() => {
        if (Object.keys(user).length === 0 && userId.length > 0) dispatch(requestFetchOneUser(userId))
    }, [userId])

    const handleChange = (e) => {
        const value = e.target.value.trim()
        if (value === '') {
            setShow(false)
            setError(false)
        }
        setUserId(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (userId === '') return

        if (Object.keys(user).length === 0) {
            setError(true)
            return
        } else {
            setShow(true)
        }
    }

    return (
        <>
            <Header title = 'User Management' />
            <Paper component = 'form' className = {classes.root} onSubmit = {handleSubmit}>
                <InputBase
                    className = {classes.input}
                    placeholder = 'Search by User ID'
                    inputProps = {{ 'aria-label': 'search userId' }}
                    type = 'text'
                    id = 'userId'
                    name = 'userId'
                    value = {userId}
                    onChange = {handleChange}
                    data-testid = 'InputBase__input-user-id'
                />
                <IconButton
                    type = 'submit'
                    className = {classes.iconButton}
                    aria-label = 'search'
                    data-testid = 'InputBase__button-user-id'
                >
                    <Search/>
                </IconButton>
            </Paper>
            <>
                {error && <Typography variant = 'h3'>{`User ID: ${userId} Does not exist`}</Typography>}
                {show &&
                    <>
                        <UserSettings user = {user} />
                        <UserRoles user = {user} editable/>
                    </>
                }
            </>
        </>
    )
}

export default UserTab
