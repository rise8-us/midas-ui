import { Add } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { DraggableDeliverableList } from 'Components/Draggable'
import PropTypes from 'prop-types'
import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { setPortfolioPageSettings } from 'Redux/AppSettings/reducer'
import * as deliverableActions from 'Redux/Deliverables/actions'
import { selectDeliverablesByCapabilityId } from 'Redux/Deliverables/selectors'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { onDragEnd } from 'Utilities/draggable'

export default function DeliverablesContainer({ capabilityId, portfolioId }) {

    const dispatch = useDispatch()

    const pagePermissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))
    const deliverables = useSelector(state => selectDeliverablesByCapabilityId(state, capabilityId))

    let newDeliverableInput = React.useRef(null)

    const createDeliverable = (value) => {
        value.trim().length > 0 &&
        dispatch(deliverableActions.requestCreateDeliverable({
            title: value,
            capabilityId: capabilityId,
            referenceId: 0,
            index: deliverables.length,
            releaseIds: [],
            children: []
        }))
    }

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

    const updatePortfolioPageSettings = (deliverableId) => {
        dispatch(setPortfolioPageSettings({ id: portfolioId, selectedDeliverableId: deliverableId }))
    }

    return (
        <Grid item marginLeft = '-34px' paddingTop = {2}>
            <DragDropContext onDragEnd = {(result) => onDragEnd(result, deliverables, onDragEndAction)}>
                <Droppable droppableId = 'list'>
                    {provided => (
                        <div ref = {provided.innerRef} {...provided.droppableProps}>
                            <DraggableDeliverableList
                                deliverables = {deliverables}
                                onUpdate = {updateDeliverable}
                                onDelete = {deleteDeliverable}
                                hasEdit = {pagePermissions.edit}
                                onClick = {updatePortfolioPageSettings}
                            />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {pagePermissions.edit &&
                <Grid container paddingLeft = '30px'>
                    <Grid item minWidth = {3} marginRight = {1}>
                        <IconButton title = 'Add Deliverable'
                            style = {{ padding: 0 }}
                            onClick = {()=>
                                newDeliverableInput.current.focus()
                            }
                        >
                            <Add style = {{ fontSize: '22px' }} color = 'secondary' />
                        </IconButton>
                    </Grid>
                    <Grid item style = {{ flexGrow: 1 }}>
                        <AutoSaveTextField
                            placeholder = 'Add new deliverable...'
                            inputRef = {newDeliverableInput}
                            color = 'secondary'
                            onSave = {createDeliverable}
                            fullWidth
                            clearAfterSave
                            canEdit
                        />
                    </Grid>
                </Grid>
            }
        </Grid>
    )
}

DeliverablesContainer.propTypes = {
    capabilityId: PropTypes.number.isRequired,
    portfolioId: PropTypes.number.isRequired,
}
