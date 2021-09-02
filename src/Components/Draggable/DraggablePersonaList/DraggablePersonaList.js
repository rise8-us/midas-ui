import { PersonaEntry } from 'Components/PersonaEntry'
import PropTypes from 'prop-types'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const DraggablePersonaList = React.memo(
    function DraggablePersonaList({ personas, hasEdit, onUpdate, onDelete, onToggleIsSupported }) {
        return personas.map((persona, index) => (
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
                            hasEdit = {hasEdit}
                            isSupported = {persona.isSupported}
                            onSupportedToggle
                            onUpdate = {newValue => onUpdate(newValue, persona)}
                            onDelete = {() => onDelete(persona.id)}
                            onToggleIsSupported = {() => onToggleIsSupported(persona)}
                        />
                    </div>
                )}
            </Draggable>
        ))
    }
)

DraggablePersonaList.propTypes = {
    personas: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        index: PropTypes.number,
        id: PropTypes.number,
        isSupported: PropTypes.bool
    })).isRequired,
    hasEdit: PropTypes.bool.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleIsSupported: PropTypes.func.isRequired,
}

export default DraggablePersonaList

