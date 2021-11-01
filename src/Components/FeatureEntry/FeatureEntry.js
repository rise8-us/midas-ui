import { CheckCircleOutlined } from '@mui/icons-material'
import { DraggableRow } from 'Components/Draggable'
import PropTypes from 'prop-types'
import React from 'react'

function FeatureEntry({ title, hasEdit, onUpdate, onDelete }) {

    return (
        <DraggableRow
            title = {title}
            hasEdit = {hasEdit}
            onUpdate = {onUpdate}
            onDelete = {onDelete}
            startIcon = {
                <CheckCircleOutlined
                    color = 'primary'
                    style = {{ height: '32px' }}
                    data-testid = 'FeatureEntry__icon-checkmark'
                />
            }
        />
    )
}

FeatureEntry.propTypes = {
    title: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    hasEdit: PropTypes.bool
}

FeatureEntry.defaultProps = {
    hasEdit: false
}

export default FeatureEntry