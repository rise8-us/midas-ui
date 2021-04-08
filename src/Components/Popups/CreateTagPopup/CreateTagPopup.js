import { Box, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestCreateTag } from '../../../Redux/Tags/actions'
import TagConstants from '../../../Redux/Tags/constants'
import { ColorPicker } from '../../ColorPicker'
import { Popup } from '../../Popup'
import { Tag } from '../../Tag'

function CreateTagPopup() {
    const dispatch = useDispatch()

    const errors = useSelector(state => selectRequestErrors(state, TagConstants.CREATE_TAG))

    const [label, setLabel] = useState('')
    const [description, setDescription] = useState('')
    const [color, setColor] = useState('')
    const [labelError, setLabelError] = useState([])
    const [colorError, setColorError] = useState([])

    const onLabelChange = (e) => setLabel(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)
    const onColorChange = (e) => setColor(e)

    const onClose = () => {
        dispatch(closePopup(TagConstants.CREATE_TAG))
    }

    const onSubmit = () => {
        dispatch(requestCreateTag({
            label,
            color,
            description
        }))
    }

    useEffect(() => {
        if (errors.length > 0) {
            setLabelError(errors.filter(error => error.includes('label')))
            setColorError(errors.filter(error => error.includes('hex')))
        }
    }, [errors])

    return (
        <Popup
            title = 'Create Tag'
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Tag Label'
                    data-testid = 'CreateTagPopup__input-label'
                    value = {label}
                    onChange = {onLabelChange}
                    error = { labelError.length > 0 }
                    helperText = { labelError[0] ?? 'Use :: to create a scoped label set (eg. priority::1)' }
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Description'
                    data-testid = 'CreateTagPopup__input-description'
                    value = {description}
                    onChange = {onDescriptionChange}
                    margin = 'dense'
                    multiline
                />
                <ColorPicker
                    onChange = {onColorChange}
                    errors = {colorError}
                />
                <Box display = 'flex' justifyContent = 'space-around' margin = 'auto' style = {{ paddingTop: '20px' }}>
                    {label && color ?
                        <Tag label = {label} description = {description} color = {color} />
                        :
                        <div style = {{ height: '24px' }}/>
                    }
                </Box>
            </Box>
        </Popup>
    )
}

export default CreateTagPopup