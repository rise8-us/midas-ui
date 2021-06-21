import { useTheme } from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { MoreOptionsPopperMenu } from '../../MoreOptionsPopperMenu'

function EditCommentOptions({ canAccess, onEditClick, onDeleteClick }) {
    const theme = useTheme()

    if (!canAccess) return null

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
    canAccess: PropTypes.bool,
    onDeleteClick: PropTypes.func,
    onEditClick: PropTypes.func.isRequired,
}

EditCommentOptions.defaultProps = {
    canAccess: false,
    onDeleteClick: null
}

export default EditCommentOptions