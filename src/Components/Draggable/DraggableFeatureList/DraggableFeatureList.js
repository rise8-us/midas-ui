import { Typography } from '@mui/material'
import { FeatureEntry } from 'Components/FeatureEntry'
import PropTypes from 'prop-types'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const DraggableFeatureList = React.memo(function DraggableFeatureList({ features, hasEdit, onUpdate, onDelete }) {
    return (
        <>
            {features.map((feature, index) => (
                <Draggable
                    key = {feature.id}
                    draggableId = {feature.title}
                    index = {index}
                    isDragDisabled = {!hasEdit}
                >
                    {provider => (
                        <div
                            data-testid = 'DraggableFeatureList__draggable'
                            ref = {provider.innerRef}
                            {...provider.draggableProps}
                            {...provider.dragHandleProps}
                        >
                            <FeatureEntry
                                title = {feature.title}
                                hasEdit = {hasEdit}
                                onUpdate = {newValue => onUpdate(newValue, feature)}
                                onDelete = {() => onDelete(feature.id)}
                            />
                        </div>
                    )}
                </Draggable>
            ))}
            {features.length === 0 && !hasEdit &&
                <Typography
                    color = 'text.secondary'
                    variant = 'body2'
                    style = {{ fontStyle: 'italic', height: '32px', padding: '5px 8px' }}
                >
                    No Features added yet.
                </Typography>
            }
        </>
    )
})

DraggableFeatureList.propTypes = {
    features: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        index: PropTypes.number,
        id: PropTypes.number
    })).isRequired,
    hasEdit: PropTypes.bool.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default DraggableFeatureList

