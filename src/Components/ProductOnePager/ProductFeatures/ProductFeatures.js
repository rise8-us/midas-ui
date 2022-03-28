import { Add } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { DraggableFeatureList } from 'Components/Draggable'
import { LabelTooltip } from 'Components/LabelTooltip'
import Tooltips from 'Constants/Tooltips'
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

    let newFeatureInput = React.useRef(null)

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
            <Grid container direction = 'row' alignItems = 'stretch' spacing = {1}>
                <Grid item style = {{ paddingLeft: 6 }}>
                    <LabelTooltip
                        typographyProps = {{
                            variant: 'h6',
                            color: 'text.primary'
                        }}
                        tooltipProps = {{
                            title: Tooltips.FEATURE_DESCRIPTION,
                            placement: 'bottom-start',
                            enterDelay: 500,
                            arrow: true
                        }}
                        text = 'FEATURES'
                        iconFontSize = 'small'
                    />
                </Grid>
            </Grid>
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
                        <IconButton title = 'Add Feature'
                            size = 'small'
                            style = {{ padding: 0 }}
                            onClick = {()=>
                                newFeatureInput.current.focus()
                            }
                        >
                            <Add color = 'secondary' />
                        </IconButton>
                    </Grid>
                    <Grid item style = {{ flexGrow: 1 }}>
                        <AutoSaveTextField
                            dataTestId = 'ProductFeatures__create-feature'
                            placeholder = 'Add new feature...'
                            inputRef = {newFeatureInput}
                            color = 'secondary'
                            onSave = {createFeature}
                            fullWidth
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

