import { Box, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Comment } from '../'
import { selectCommentsByAssertionId } from '../../../Redux/Comments/selectors'

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

function CommentsList({ assertionId, commentProps }) {

    const classes = useStyles()

    const comments = useSelector(state => selectCommentsByAssertionId(state, assertionId))

    return (
        <Box className = {classes.wrap}>
            {comments.map((comment, index) => (
                <Comment
                    key = {index}
                    id = {comment.id}
                    authorId = {comment.author.id}
                    author = {comment.author?.displayName ?? comment.author?.email ?? comment.author?.username}
                    text = {comment.text}
                    lastEdit = {comment.lastEdit ?? comment.creationDate}
                    {...commentProps}
                />
            ))}
        </Box>
    )
}

CommentsList.propTypes = {
    assertionId: PropTypes.number.isRequired,
    commentProps: PropTypes.shape({
        handleStatusUpdates: PropTypes.bool
    })
}

CommentsList.defaultProps = {
    commentProps: {
        handleStatusUpdates: false
    }
}

export default CommentsList