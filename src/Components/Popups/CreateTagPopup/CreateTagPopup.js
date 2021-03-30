import { Box, TextField } from '@material-ui/core'
import { CirclePicker } from 'react-color'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestCreateTag } from '../../../Redux/Tags/actions'
import TagConstants from '../../../Redux/Tags/constants'
import Popup from '../../Popup/Popup'
import Tag from '../../Tag/Tag'


function CreateTagPopup() {
    const dispatch = useDispatch()

    const errors = useSelector(state => selectRequestErrors(state, TagConstants.CREATE_TAG))

    const [label, setLabel] = useState('')
    const [description, setDescription] = useState('')
    const [color, setColor] = useState('#969696')
    const [labelError, setLabelError] = useState([])
    const [colorError, setGitlabError] = useState([])

    const onLabelChange = (e) => setLabel(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)
    const onColorPickerChange = (color) => {
        setColor(color.hex)
    }

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
            setGitlabError(errors.filter(error => error.includes('hex')))
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
                <TextField
                    label = 'Select Color'
                    data-testid = 'CreateTagPopup__input-color'
                    value = {color}
                    error = { colorError.length > 0 }
                    helperText = { colorError[0] ?? '' }
                    margin = 'dense'
                    disabled = {false}
                />
                <div style = {{ paddingTop: '20px', paddingLeft: '35px' }}>
                    <CirclePicker
                        color = {color}
                        onChange = {onColorPickerChange} />
                </div>
                <div style = {{
                    paddingTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    margin: 'auto'
                }}>
                    <Tag label = {label} description = {description} color = {color} />
                </div>
            </Box>
        </Popup>
    )
}

export default CreateTagPopup