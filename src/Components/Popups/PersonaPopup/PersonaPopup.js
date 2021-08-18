import { Box, TextField } from '@material-ui/core'
import { Popup } from 'Components/Popup'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreatePersona, requestUpdatePersona } from 'Redux/Personas/actions'
import PersonaConstants from 'Redux/Personas/constants'
import { selectPersonaById } from 'Redux/Personas/selectors'
import { closePopup } from 'Redux/Popups/actions'

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Persona' : 'Update Persona',
        constant: create ? PersonaConstants.CREATE_PERSONA : PersonaConstants.UPDATE_PERSONA,
        request: (data) => create ? requestCreatePersona(data) : requestUpdatePersona(data)
    }
}

function PersonaPopup({ id, index, productId }) {
    const dispatch = useDispatch()

    const persona = useSelector(state => selectPersonaById(state, id))
    const context = initDetails(persona.id === undefined)

    const [formValues, formDispatch] = React.useReducer(useFormReducer, {
        title: persona.title,
        description: persona.description,
    })

    const handleChange = (name, value) => {
        formDispatch({
            type: 'onChange',
            payload: { name, value }
        })
    }

    const onClose = () => dispatch(closePopup(context.constant))

    const onSubmit = () => {
        dispatch(context.request({
            ...persona,
            title: formValues.title,
            description: formValues.description,
            index,
            productId
        }))
    }

    return (
        <Popup
            title = {context.title}
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Title'
                    data-testid = 'PersonaPopup__input-title'
                    value = {formValues.title}
                    onChange = {(e) => handleChange('title', e.target.value)}
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Description'
                    data-testid = 'PersonaPopup__input-description'
                    value = {formValues.description}
                    onChange = {(e) => handleChange('description', e.target.value)}
                    margin = 'dense'
                    multiline
                />
            </Box>
        </Popup>
    )
}

PersonaPopup.propTypes = {
    id: PropTypes.number,
    index: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
}

PersonaPopup.defaultProps = {
    id: null
}

export default PersonaPopup