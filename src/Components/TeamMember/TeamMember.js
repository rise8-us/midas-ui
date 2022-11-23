import { ClickAwayListener, Grid, Tooltip, Typography } from '@mui/material'
import { UserDetails } from 'Components/UserDetails'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestFetchOneUser } from 'Redux/Users/actions'
import { selectUserById } from 'Redux/Users/selectors'
import { styled } from '../../Styles/materialThemes'

const StyledDiv = styled('div')(({ theme }) => ({
    height: '42px',
    width: '42px',
    borderRadius: '50%',
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'default',
    color: theme.palette.text.secondary,
    border: `solid 1px ${theme.palette.text.secondary}`,
    transition: 'all 0.35s',
    '&:hover': {
        color: theme.palette.text.primary,
        border: `solid 1px ${theme.palette.text.primary}`,
        transition: 'all 0.35s'
    }
}))

function TeamMember({ id, title, noUserText }) {
    const dispatch = useDispatch()
    const [isTooltipOpen, setIsTooltipOpen] = useState(false)

    const user = useSelector(state => selectUserById(state, id))
    const userNotFound = user.id === undefined

    useEffect(() => {
        id && dispatch(requestFetchOneUser(id))
    }, [id])

    const handleTooltipClose = () => {
        setIsTooltipOpen(false)
    }

    const handleTooltipOpen = () => {
        setIsTooltipOpen(true)
    }

    return (
        <Tooltip
            title = {<UserDetails id = {id} role = {title}/>}
            PopperProps = {{
                style: {
                    display: id ? 'unset' : 'none',
                }
            }}
            open = {isTooltipOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
        >
            <Grid container wrap = 'wrap' spacing = {1}>
                <Grid item style = {{ minWidth: '42px' }}>
                    <ClickAwayListener onClickAway = {handleTooltipClose}>
                        <StyledDiv
                            onClick = {handleTooltipOpen}
                            style = {{ pointerEvents: userNotFound ? 'none' : 'unset' }}
                        >
                            <Typography>
                                {userNotFound ? '?' : user.username.split(' ').map(name => name[0]).join('')}
                            </Typography>
                        </StyledDiv>
                    </ClickAwayListener>
                </Grid>
                <Grid container item direction = 'column' xs = {9} s = {9}>
                    <Grid item>
                        <Typography variant = 'body2' noWrap>
                            {userNotFound ? noUserText : user.username}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant = 'body2' color = 'text.secondary' noWrap>{title}</Typography>
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
