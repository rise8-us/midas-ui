import { DraggableRow } from 'Components/Draggable'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectCapabilitiesPagePermission } from 'Redux/PageAccess/selectors'

function DeliverableEntry({ title, onUpdate, onDelete }) {

    const hasEdit = useSelector(state => selectCapabilitiesPagePermission(state, 'edit'))

    return (
        <DraggableRow
            title = {title}
            hasEdit = {hasEdit}
            multiLine = {true}
            onUpdate = {onUpdate}
            onDelete = {onDelete}
            startIcon = {
                <div data-testid = 'DeliverableEntry__empty-div' style = {{ height: 1, width: 24 }}/>
            }
        />
    )
}

DeliverableEntry.propTypes = {
    title: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default DeliverableEntry