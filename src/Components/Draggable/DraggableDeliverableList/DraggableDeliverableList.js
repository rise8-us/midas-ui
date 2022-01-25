import { Typography } from '@mui/material'
import { DeliverableEntry } from 'Components/DeliverableEntry'
import PropTypes from 'prop-types'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { selectDeliverablesByCapabilityId } from 'Redux/Deliverables/selectors'
import { selectCapabilitiesPagePermission } from 'Redux/PageAccess/selectors'

const DraggableDeliverableList = React.memo(function DraggableDeliverableList({
    capabilityId,
    onUpdate,
    onDelete
}) {

    const hasEdit = useSelector(state => selectCapabilitiesPagePermission(state, 'edit'))
    const deliverables = useSelector(state => selectDeliverablesByCapabilityId(state, capabilityId))

    return (
        <>
            {deliverables.map((deliverable, index) => (
                <Draggable
                    key = {deliverable.id}
                    draggableId = {deliverable.title}
                    index = {index}
                    isDragDisabled = {!hasEdit}
                >
                    {provider => (
                        <div
                            data-testid = 'DraggableDeliverableList__draggable'
                            ref = {provider.innerRef}
                            {...provider.draggableProps}
                            {...provider.dragHandleProps}
                        >
                            <DeliverableEntry
                                id = {deliverable.id}
                                title = {deliverable.title}
                                onUpdate = {newValue => onUpdate(newValue, deliverable)}
                                onDelete = {() => onDelete(deliverable.id)}
                            />
                        </div>
                    )}
                </Draggable>
            ))}
            {deliverables.length === 0 && !hasEdit &&
                <Typography
                    color = 'text.secondary'
                    variant = 'body2'
                    style = {{ fontStyle: 'italic', height: '32px', padding: '5px 8px', marginLeft: '24px' }}
                >
                    No Deliverables added yet.
                </Typography>
            }
        </>
    )
})

DraggableDeliverableList.propTypes = {
    capabilityId: PropTypes.number.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default DraggableDeliverableList

