import { Box, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import useAssertionStatuses from '../../../Hooks/useAssertionStatuses'
import { Tag } from '../../Tag'

// TODO: Add edit caps.
// TODO: Limit actions only to owner of comment

const parseStatus = (body) => {
    const [message, statusReceived] = body.split('###')

    const allStatuses = useAssertionStatuses()
    const status = Object.values(allStatuses).filter(s => s.name === statusReceived)[0] ?? null

    return (
        <>
            <Typography color = 'textSecondary' style = {{ marginLeft: '48px' }}>
                {message}
            </Typography>
            {status &&
                <div style = {{ marginRight: 'auto' }}>
                    <Tag label = {`status::${status.label}`} color = {status.color} />
                </div>
            }
        </>
    )
}
function Comment({ id, authorId, author, lastEdit, text, handleStatusUpdates }) {

    return (
        <Box display = 'flex' flexDirection = 'column' id = {id} margin = '4px' style = {{ marginBottom: '16px' }}>
            <div style = {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography color = 'textSecondary' style = {{ fontWeight: 'bold' }} id = {authorId}>
                    {author}
                </Typography>
                <Typography variant = 'caption' color = 'textSecondary'>{lastEdit}</Typography>
            </div>
            {handleStatusUpdates ?
                parseStatus(text)
                :
                <Typography color = 'textSecondary' style = {{ marginLeft: '48px' }}>
                    {text}
                </Typography>
            }
        </Box>
    )
}

Comment.propTypes = {
    id: PropTypes.number.isRequired,
    authorId: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    lastEdit: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    handleStatusUpdates: PropTypes.bool
}

Comment.defaultProps = {
    handleStatusUpdates: false
}

export default Comment