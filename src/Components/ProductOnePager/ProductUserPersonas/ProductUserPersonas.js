
import { Chip, Grid, Typography, useTheme } from '@material-ui/core'
import { PersonAddOutlined, PersonOutlined } from '@material-ui/icons'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { DraggablePersonaList } from 'Components/Draggable/DraggablePersonaList'
import PropTypes from 'prop-types'
import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import * as personaActions from 'Redux/Personas/actions'
import { selectPersonasByProductId } from 'Redux/Personas/selectors'
import { onDragEnd } from 'Utilities/draggable'
function ProductUserPersonas({ productId, hasEdit }) {
    const dispatch = useDispatch()
    const theme = useTheme()

    const personas = useSelector(state => selectPersonasByProductId(state, productId))

    const createPersona = (value) => {
        dispatch(personaActions.requestCreatePersona({
            title: value,
            productId,
            index: personas.length,
            description: '',
            isSupported: false
        }))
    }

    const updatePersona = (newTitle, selectedPersona) => {
        newTitle.trim().length > 0 && dispatch(personaActions.requestUpdatePersona({
            ...selectedPersona,
            title: newTitle.trim()
        }))
    }

    const toggleIsSupported = (persona) => {
        dispatch(personaActions.requestUpdatePersona({
            ...persona,
            isSupported: !persona.isSupported
        }))
    }

    const deletePersona = (id) => {
        dispatch(personaActions.requestDeletePersona(id))
    }

    const onDragEndAction = (newPersonasList) => {
        const updatedIndexes = newPersonasList.map((persona, index) => ({ ...persona, index }))

        dispatch(personaActions.requestUpdatePersonasBulk(updatedIndexes))
    }

    return (
        <Grid container direction = 'column' spacing = {0}>
            <Grid item>
                <Typography variant = 'h6' color = 'textPrimary'>PERSONAS</Typography>
            </Grid>
            <Grid item>
                <Chip
                    label = {<Typography variant = 'caption' color = 'textSecondary'>CURRENT</Typography>}
                    size = 'small'
                    variant = 'outlined'
                    style = {{ margin: '8px', marginLeft: 0, borderWidth: 0 }}
                    icon = {<PersonOutlined style = {{ color: theme.palette.primary.main }}/>}
                />
                <Chip
                    label = {<Typography variant = 'caption' color = 'textSecondary'>FUTURE</Typography>}
                    size = 'small'
                    variant = 'outlined'
                    style = {{ margin: '8px', borderWidth: 0 }}
                    icon = {<PersonOutlined style = {{ color: theme.palette.secondary.main }}/>}
                />
            </Grid>
            <DragDropContext onDragEnd = {(result) => onDragEnd(result, personas, onDragEndAction)}>
                <Droppable droppableId = 'list'>
                    {provided => (
                        <div ref = {provided.innerRef} {...provided.droppableProps}>
                            <DraggablePersonaList
                                personas = {personas}
                                hasEdit = {hasEdit}
                                onUpdate = {updatePersona}
                                onDelete = {deletePersona}
                                onToggleIsSupported = {toggleIsSupported}
                            />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {hasEdit &&
                <Grid container alignItems = 'center'>
                    <Grid item style = {{ minWidth: '24px', marginRight: '8px' }}>
                        <PersonAddOutlined color = 'secondary' style = {{ marginLeft: '-2px' }}/>
                    </Grid>
                    <Grid item style = {{ flexGrow: 1 }}>
                        <AutoSaveTextField
                            fullWidth
                            color = 'secondary'
                            placeholder = 'Add new user persona...'
                            onSave = {createPersona}
                            clearAfterSave
                            canEdit
                        />
                    </Grid>
                </Grid>
            }
        </Grid>
    )
}

ProductUserPersonas.propTypes = {
    productId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool
}

ProductUserPersonas.defaultProps = {
    hasEdit: false
}

export default ProductUserPersonas