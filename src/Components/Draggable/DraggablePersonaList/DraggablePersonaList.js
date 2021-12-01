import { Typography } from '@mui/material'
import { PersonaEntry } from 'Components/PersonaEntry'
import PropTypes from 'prop-types'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const DraggablePersonaList = React.memo(
    function DraggablePersonaList({ personas, hasEdit, onUpdate, onDelete, onToggleIsSupported, onInfoClick }) {
        return (
            <>
                {personas.map((persona, index) => (
                    <React.Fragment key = {persona.id}>
                        <Draggable
                            key = {persona.id}
                            draggableId = {persona.title}
                            index = {index}
                            isDragDisabled = {!hasEdit}
                        >
                            {provider => (
                                <div
                                    data-testid = 'DraggablePersonaList__draggable'
                                    ref = {provider.innerRef}
                                    {...provider.draggableProps}
                                    {...provider.dragHandleProps}
                                >
                                    <PersonaEntry
                                        title = {persona.title}
                                        description = {persona.description}
                                        hasEdit = {hasEdit}
                                        isSupported = {persona.isSupported}
                                        onSupportedToggle
                                        onUpdate = {newValue => onUpdate(newValue, persona)}
                                        onDelete = {() => onDelete(persona.id)}
                                        onToggleIsSupported = {() => onToggleIsSupported(persona)}
                                        onInfoClick = {() => onInfoClick(persona)}
                                    />
                                </div>
                            )}
                        </Draggable>
                    </React.Fragment>
                ))}
                {personas.length === 0 &&
                    <Typography
                        color = 'text.secondary'
                        variant = 'body2'
                        style = {{ fontStyle: 'italic', height: '34px', padding: '5px 8px' }}
                    >
                        No Personas added yet.
                    </Typography>
                }
            </>
        )
    }
)

DraggablePersonaList.propTypes = {
    personas: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        index: PropTypes.number,
        id: PropTypes.number,
        isSupported: PropTypes.bool
    })).isRequired,
    hasEdit: PropTypes.bool.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onInfoClick: PropTypes.func.isRequired,
    onToggleIsSupported: PropTypes.func.isRequired,
}

export default DraggablePersonaList

