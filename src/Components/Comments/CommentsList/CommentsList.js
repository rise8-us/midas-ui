import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import { scrollbar, styled } from 'Styles/materialThemes'
import { Comment } from '../'

const BoxWrap = styled(Box)(({ theme }) => ({
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column-reverse',
    overflowY: 'auto',
    ...scrollbar(theme)
}))

function CommentsList({ commentProps, commentIds }) {
    const commentsListSorted = Array.from(commentIds).sort((a, b) => b - a)

    return (
        <BoxWrap>
            {commentsListSorted.map((id) => (
                <Comment {...commentProps} id = {id} key = {id} />
            ))}
        </BoxWrap>
    )
}

CommentsList.propTypes = {
    commentIds: PropTypes.arrayOf(PropTypes.number).isRequired,
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
