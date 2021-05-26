import { IconButton } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { MoreOptionsPopperMenu } from '../../MoreOptionsPopperMenu'

function EditCommentOptions({ canAccess, onEditClick }) {

    const options = [
        {
            icon: <IconButton size = 'small' color = 'secondary'><Edit /></IconButton>,
            text: 'Edit',
            onClick: onEditClick
        }
    ]

    if (canAccess) return (
        <MoreOptionsPopperMenu options = {options} />
    )
    else return null
}

EditCommentOptions.propTypes = {
    canAccess: PropTypes.bool,
    onEditClick: PropTypes.func.isRequired
}

EditCommentOptions.defaultProps = {
    canAccess: false
}

export default EditCommentOptions