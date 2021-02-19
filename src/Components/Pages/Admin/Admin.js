import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../../Header/Header'
import Page from '../../Page/Page'
import { UserSettings } from '../../UserSettings'
import { Search } from '@material-ui/icons'
import { InputBase, IconButton, makeStyles, Paper, Typography } from '@material-ui/core'
import { getUserById } from '../../../Redux/Users/selectors'
import { requestFetchOneUser } from '../../../Redux/Users/actions'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
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

const Admin = () => {

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
        <Page>
            <Header title = 'Admin Portal'  />

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
                        <UserSettings user = { user } />
                    </> }
            </>
        </Page>
    )
}

export default Admin
