import { Person, PersonAddOutlined, PersonOutlined } from '@mui/icons-material'
import { Chip, Grid, IconButton, Typography, useTheme } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { DraggablePersonaList } from 'Components/Draggable/DraggablePersonaList'
import { LabelTooltip } from 'Components/LabelTooltip'
import { SingleFieldPopup } from 'Components/Popups/SingleFieldPopup'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import * as personaActions from 'Redux/Personas/actions'
import { selectPersonasByProductId } from 'Redux/Personas/selectors'
import { onDragEnd } from 'Utilities/draggable'

function ProductUserPersonas({ productId, hasEdit }) {
    const dispatch = useDispatch()
    const theme = useTheme()

    const personas = useSelector(state => selectPersonasByProductId(state, productId))

    const [popupOpen, setPopupOpen] = useState(false)
    const [selectedPersona, setSelectedPersona] = useState({})

    let newPersonaInput = React.useRef(null)

    const singleFieldUpdate = (key, value, persona) => {
        value.trim().length > 0 && dispatch(personaActions.requestUpdatePersona({
            ...persona,
            [key]: value.trim()
        }))
    }

    const createPersona = (value) => {
        dispatch(personaActions.requestCreatePersona({
            title: value,
            productId,
            index: personas.length,
            description: '',
            isSupported: false
        }))
    }

    const toggleIsSupported = (persona) => {
        dispatch(personaActions.requestUpdatePersona({
            ...persona,
            isSupported: !persona.isSupported
        }))
    }

    const handleInfoClick = (persona) => {
        setSelectedPersona(persona)
        setPopupOpen(prev => !prev)
    }

    const onTooltipUpdate = (newDescription) => {
        singleFieldUpdate('description', newDescription, selectedPersona)
        setPopupOpen(false)
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
                            color: 'text.primary'
                        }}
                        tooltipProps = {{
                            title: Tooltips.PERSONA_DESCRIPTION,
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
                    label = {<Typography variant = 'caption' color = 'text.secondary'>CURRENT</Typography>}
                    size = 'small'
                    variant = 'outlined'
                    style = {{ margin: '8px', marginLeft: 0, borderWidth: 0 }}
                    icon = {<Person style = {{ color: theme.palette.primary.main }}/>}
                />
                <Chip
                    label = {<Typography variant = 'caption' color = 'text.secondary'>FUTURE</Typography>}
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
                                onUpdate = {(newTitle, persona) => singleFieldUpdate('title', newTitle, persona)}
                                onDelete = {deletePersona}
                                onToggleIsSupported = {toggleIsSupported}
                                onInfoClick = {handleInfoClick}
                            />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {hasEdit ?
                <Grid container alignItems = 'center' style = {{ height: '34px' }}>
                    <Grid item minWidth = '28px'>
                        <IconButton title = 'Add Persona'
                            size = 'small'
                            onClick = {()=>
                                newPersonaInput.current.focus()
                            }
                        >
                            <PersonAddOutlined
                                color = 'secondary'
                                style = {{
                                    transform: 'scale(-1, 1)',
                                    marginLeft: '-2px'
                                }}
                            />
                        </IconButton>
                    </Grid>
                    <Grid item flexGrow = {1}>
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
                <div style = {{ height: '34px' }} />
            }
            {popupOpen &&
                <SingleFieldPopup
                    isOpen = {popupOpen}
                    title = 'Update Persona Tooltip'
                    subtitle = {selectedPersona?.title}
                    initialValue = {selectedPersona?.description}
                    onClose = {setPopupOpen}
                    onSubmit = {onTooltipUpdate}
                />
            }
        </Grid>
    )
}

ProductUserPersonas.propTypes = {
    productId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired,
}

export default ProductUserPersonas