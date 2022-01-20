import { Grid } from '@mui/material'
import { DraggableDeliverableList } from 'Components/Draggable'
import PropTypes from 'prop-types'
import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import * as deliverableActions from 'Redux/Deliverables/actions'
import { selectDeliverablesByCapabilityId } from 'Redux/Deliverables/selectors'
import { onDragEnd } from 'Utilities/draggable'

export default function DeliverablesContainer({ capabilityId }) {

    const dispatch = useDispatch()

    const deliverables = useSelector(state => selectDeliverablesByCapabilityId(state, capabilityId))

    const updateDeliverable = (newValue, selectedDeliverable) => {
        dispatch(deliverableActions.requestUpdateDeliverable({
            ...selectedDeliverable,
            title: newValue,
        }))
    }

    const deleteDeliverable = (deliverableId) => {
        dispatch(deliverableActions.requestDeleteDeliverable(deliverableId))
    }

    const onDragEndAction = (newDeliverableList) => {
        const updatedIndexes = newDeliverableList.map((deliverable, index) => ({ ...deliverable, index }))

        dispatch(deliverableActions.requestUpdateDeliverablesBulk(updatedIndexes))
    }

    return (
        <Grid item marginLeft = '-34px' >
            <DragDropContext onDragEnd = {(result) => onDragEnd(result, deliverables, onDragEndAction)}>
                <Droppable droppableId = 'list'>
                    {provided => (
                        <div ref = {provided.innerRef} {...provided.droppableProps}>
                            <DraggableDeliverableList
                                capabilityId = {capabilityId}
                                onUpdate = {updateDeliverable}
                                onDelete = {deleteDeliverable}
                            />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Grid>
    )
}

DeliverablesContainer.propTypes = {
    capabilityId: PropTypes.number.isRequired,
}