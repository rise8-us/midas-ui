import { DeleteOutline, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { PropTypes } from 'prop-types'

export default function GanttActionButtons({ onEditClick, onDeleteClick }) {
    return (
        <>
            <IconButton
                onClick = {onEditClick}
                data-testid = 'GanttActionButtons__edit'
                size = 'small'
            >
                <Edit fontSize = 'small' htmlColor = 'black'/>
            </IconButton>
            <IconButton
                onClick = {onDeleteClick}
                data-testid = 'GanttActionButtons__delete'
                size = 'small'
            >
                <DeleteOutline fontSize = 'small' htmlColor = 'black'/>
            </IconButton>
        </>
    )
}

GanttActionButtons.propTypes = {
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
}
