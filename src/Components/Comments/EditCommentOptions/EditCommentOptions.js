import { Delete, Edit } from '@mui/icons-material'
import { useTheme } from '@mui/material'
import { MoreOptionsPopperMenu } from 'Components/MoreOptionsPopperMenu'
import PropTypes from 'prop-types'

function EditCommentOptions({ onEditClick, onDeleteClick }) {
    const theme = useTheme()

    const options = [
        {
            icon: <Edit color = 'secondary'/>,
            text: 'Edit Comment',
            onClick: onEditClick,
            color: theme.palette.text.secondary
        }
    ]

    typeof onDeleteClick === 'function' && options.push({
        icon: <Delete style = {{ color: theme.palette.error.main }}/>,
        text: 'Delete Comment',
        color: theme.palette.error.main,
        onClick: onDeleteClick
    })

    return (
        <MoreOptionsPopperMenu options = {options} />
    )
}

EditCommentOptions.propTypes = {
    onDeleteClick: PropTypes.func,
    onEditClick: PropTypes.func.isRequired,
}

EditCommentOptions.defaultProps = {
    onDeleteClick: null
}

export default EditCommentOptions