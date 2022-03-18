import { Feedback } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import PropTypes from 'prop-types'

function FeedbackMessage({ link, message }) {
    return (
        <>
            <Typography>{message}</Typography>
            <IconButton
                href = {link}
                target = '_blank'
                rel = 'noopener noreferrer'
                data-testid = 'FeedbackMessage__iconButton'
            >
                <Feedback />
            </IconButton>
        </>
    )
}

FeedbackMessage.propTypes = {
    link: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
}

export default FeedbackMessage