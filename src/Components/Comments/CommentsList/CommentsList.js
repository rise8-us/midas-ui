import { Box, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Comment } from '../'
import { selectUserLoggedIn } from '../../../Redux/Auth/selectors'

const useStyles = makeStyles(theme => ({
    wrap: {
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column-reverse',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '12px'
        },
        '&::-webkit-scrollbar-thumb': {
            height: '15%',
            border: '3px solid rgba(0, 0, 0, 0)',
            backgroundClip: 'padding-box',
            backgroundColor: theme.palette.divider,
            '-webkit-border-radius': '12px'
        }
    }
}))

function CommentsList({ commentProps, commentIds }) {
    const classes = useStyles()

    const userLoggedIn = useSelector(selectUserLoggedIn)
    const commentsListSorted = Array.from(commentIds).sort((a, b) => b - a)

    return (
        <Box className = {classes.wrap}>
            {commentsListSorted.map(id => (
                <Comment {...commentProps} id = {id} key = {id} viewerId = {userLoggedIn.id}/>
            ))}
        </Box>
    )
}

CommentsList.propTypes = {
    commentIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    commentProps: PropTypes.shape({
        handleStatusUpdates: PropTypes.bool
    }),
}

CommentsList.defaultProps = {
    commentProps: {
        handleStatusUpdates: false
    }
}

export default CommentsList