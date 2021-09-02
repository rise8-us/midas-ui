import { Grid, Typography } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { DraggableFeatureList } from 'Components/Draggable'
import PropTypes from 'prop-types'
import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import * as featureActions from 'Redux/Features/actions'
import { selectFeaturesByProductId } from 'Redux/Features/selectors'
import { onDragEnd } from 'Utilities/draggable'

function ProductFeatures({ productId, hasEdit }) {
    const dispatch = useDispatch()

    const features = useSelector(state => selectFeaturesByProductId(state, productId))

    const createFeature = (value) => {
        dispatch(featureActions.requestCreateFeature({
            title: value,
            productId,
            index: features.length,
            description: '',
        }))
    }

    const updateFeature = (newTitle, selectedFeature) => {
        newTitle.trim().length > 0 && dispatch(featureActions.requestUpdateFeature({
            ...selectedFeature,
            title: newTitle.trim()
        }))
    }

    const deleteFeature = (featureId) => {
        dispatch(featureActions.requestDeleteFeature(featureId))
    }

    const onDragEndAction = (newFeatureList) => {
        const updatedIndexes = newFeatureList.map((feature, index) => ({ ...feature, index }))

        dispatch(featureActions.requestUpdateFeaturesBulk(updatedIndexes))
    }

    return (
        <>
            <Typography variant = 'h6'>FEATURES</Typography>
            <DragDropContext onDragEnd = {(result) => onDragEnd(result, features, onDragEndAction)}>
                <Droppable droppableId = 'list'>
                    {provided => (
                        <div ref = {provided.innerRef} {...provided.droppableProps}>
                            <DraggableFeatureList
                                features = {features}
                                hasEdit = {hasEdit}
                                onUpdate = {updateFeature}
                                onDelete = {deleteFeature}
                            />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {hasEdit &&
                <Grid container alignItems = 'center'>
                    <Grid item style = {{ minWidth: '24px', marginRight: '8px' }}>
                        <Add color = 'secondary' />
                    </Grid>
                    <Grid item style = {{ flexGrow: 1 }}>
                        <AutoSaveTextField
                            fullWidth
                            color = 'secondary'
                            placeholder = 'Add new feature...'
                            onSave = {createFeature}
                            clearAfterSave
                            canEdit
                        />
                    </Grid>
                </Grid>
            }
        </>
    )
}

ProductFeatures.propTypes = {
    productId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool
}

ProductFeatures.defaultProps = {
    hasEdit: true
}

export default ProductFeatures

