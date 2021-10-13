import { Chip, Grid, IconButton, Typography, useTheme } from '@material-ui/core'
import { Person, PersonAddOutlined, PersonOutlined } from '@material-ui/icons'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { DraggablePersonaList } from 'Components/Draggable/DraggablePersonaList'
import { LabelTooltip } from 'Components/LabelTooltip'
import Tooltips from 'Constants/Tooltips'
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

    let newPersonaInput = React.useRef(null)

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
            <Grid container direction = 'row' alignItems = 'stretch' spacing = {1}>
                <Grid item style = {{ paddingLeft: 8 }}>
                    <LabelTooltip
                        typographyProps = {{
                            variant: 'h6',
                            color: 'textPrimary'
                        }}
                        tooltipProps = {{
                            title: Tooltips.FEATURE_DESCRIPTION,
                            placement: 'bottom-start',
                            enterDelay: 500,
                            arrow: true
                        }}
                        text = 'PERSONAS'
                        iconFontSize = 'small'
                    />
                </Grid>
            </Grid>
            <Grid item>
                <Chip
                    label = {<Typography variant = 'caption' color = 'textSecondary'>CURRENT</Typography>}
                    size = 'small'
                    variant = 'outlined'
                    style = {{ margin: '8px', marginLeft: 0, borderWidth: 0 }}
                    icon = {<Person style = {{ color: theme.palette.primary.main }}/>}
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
            {hasEdit
                ?
                <Grid container alignItems = 'center'>
                    <Grid item style = {{ minWidth: '24px', marginRight: '8px' }}>
                        <IconButton title = 'Add Persona'
                            size = 'small'
                            // style = {{ padding: 3, marginLeft: -3, marginRight: -2 }}
                            onClick = {()=>
                                newPersonaInput.current.focus()
                            }
                        >
                            <PersonAddOutlined color = 'secondary'/>
                        </IconButton>
                    </Grid>
                    <Grid item style = {{ flexGrow: 1 }}>
                        <AutoSaveTextField
                            placeholder = 'Add new user persona...'
                            inputRef = {newPersonaInput}
                            color = 'secondary'
                            fullWidth
                            onSave = {createPersona}
                            clearAfterSave
                            canEdit
                        />
                    </Grid>
                </Grid>
                :
                <div style = {{ height: '32px' }} />
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