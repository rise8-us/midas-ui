import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { styled } from 'Styles/materialThemes'
import { Comment } from '../'

const BoxWrap = styled(Box)(({ theme }) => ({
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column-reverse',
    overflowY: 'auto',

    '&::-webkit-scrollbar': {
        width: '12px'
    },

    '&::-webkit-scrollbar-thumb': {
        height: '15%',
        border: '3px solid transparent',
        backgroundClip: 'padding-box',
        backgroundColor: theme.palette.divider,
        WebkitBorderRadius: '12px'
    }
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
