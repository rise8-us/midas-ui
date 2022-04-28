import { DeleteOutline, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import PropTypes from 'prop-types'

export default function GanttActionButtons({ color, htmlColor, onDeleteClick, onEditClick }) {
    return (
        <>
            <IconButton
                onClick = {onEditClick}
                data-testid = 'GanttActionButtons__edit'
                size = 'small'
            >
                <Edit fontSize = 'small' color = {color} htmlColor = {htmlColor}/>
            </IconButton>
            <IconButton
                onClick = {onDeleteClick}
                data-testid = 'GanttActionButtons__delete'
                size = 'small'
            >
                <DeleteOutline fontSize = 'small' color = {color} htmlColor = {htmlColor}/>
            </IconButton>
        </>
    )
}

GanttActionButtons.propTypes = {
    color: PropTypes.oneOf([
        'inherit',
        'action',
        'disabled',
        'primary',
        'secondary',
        'error',
        'info',
        'success',
        'warning'
    ]),
    htmlColor: PropTypes.string,
    onDeleteClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
}

GanttActionButtons.defaultProps = {
    color: 'inherit',
    htmlColor: 'black'
}
