import { Grid, makeStyles, Tooltip, Typography } from '@material-ui/core'
import { UserDetails } from 'Components/UserDetails'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestFetchOneUser } from 'Redux/Users/actions'
import { selectUserById } from 'Redux/Users/selectors'

const useStyles = makeStyles((theme) => ({
    tooltip: {
        background: theme.palette.background.paper,
        boxShadow: `0 0 1em ${theme.palette.background.default}`
    }
}))

function TeamMember({ id, title, noUserText }) {
    const dispatch = useDispatch()
    const classes = useStyles()

    const user = useSelector(state => selectUserById(state, id))
    const userNotFound = user.id === undefined

    useEffect(() => {
        id && dispatch(requestFetchOneUser(id))
    }, [id])

    return (
        <Tooltip
            interactive
            title = {<UserDetails id = {id} role = {title}/>}
            classes = {{ tooltip: classes.tooltip }}
        >
            <Grid container wrap = 'wrap' spacing = {1}>
                <Grid item style = {{ minWidth: '42px' }}>
                    <div
                        style = {{
                            height: '42px',
                            width: '42px',
                            borderRadius: '50%',
                            border: 'solid 1px #797979',
                            padding: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography color = 'secondary'>
                            {userNotFound ? '?' : user.username.split(' ').map(name => name[0]).join('')}
                        </Typography>
                    </div>
                </Grid>
                <Grid container item direction = 'column' xs = {9} s = {9}>
                    <Grid item>
                        <Typography variant = 'body2' noWrap>
                            {userNotFound ? noUserText : user.username}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant = 'body2' color = 'textSecondary' noWrap>{title}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Tooltip>
    )
}

TeamMember.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    noUserText: PropTypes.string
}

TeamMember.defaultProps = {
    id: null,
    title: '',
    noUserText: 'User Not Found'
}

export default TeamMember