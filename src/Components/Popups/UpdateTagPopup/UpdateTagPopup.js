import { Box, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import ColorPicker from '../../ColorPicker/ColorPicker'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestUpdateTag } from '../../../Redux/Tags/actions'
import TagConstants from '../../../Redux/Tags/constants'
import { selectTagById } from '../../../Redux/Tags/selectors'
import Popup from '../../Popup/Popup'
import Tag from '../../Tag/Tag'

function UpdateTagPopup({ id }) {
    const dispatch = useDispatch()
    const updateTag = useSelector(state => selectTagById(state, id))

    const errors = useSelector(state => selectRequestErrors(state, TagConstants.CREATE_TAG))

    const [label, setLabel] = useState('')
    const [description, setDescription] = useState('')
    const [color, setColor] = useState('')
    const [labelError, setLabelError] = useState([])
    const [colorError, setGitlabError] = useState([])

    const onLabelChange = (e) => setLabel(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)
    const onColorPickerChange = (color) => {
        setColor(color.hex)
    }

    const onClose = () => {
        dispatch(closePopup(TagConstants.UPDATE_TAG))
    }

    const onSubmit = () => {
        dispatch(requestUpdateTag({
            ...updateTag,
            label,
            color,
            description
        }))
    }

    useEffect(() => {
        setLabel(updateTag.label)
        setColor(updateTag.color)
        setDescription(updateTag.description)
    }, [updateTag])

    useEffect(() => {
        if (errors.length > 0) {
            setLabelError(errors.filter(error => error.includes('label')))
            setGitlabError(errors.filter(error => error.includes('hex')))
        }
    }, [errors])

    return (
        <Popup
            title = 'Update Tag'
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Tag Label'
                    data-testid = 'UpdateTagPopup__input-label'
                    value = {label}
                    onChange = {onLabelChange}
                    error = { labelError.length > 0 }
                    helperText = { labelError[0] ?? 'Use :: to create a scoped label set (eg. priority::1)' }
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Description'
                    data-testid = 'UpdateTagPopup__input-description'
                    value = {description}
                    onChange = {onDescriptionChange}
                    margin = 'dense'
                    multiline
                />
                <ColorPicker
                    onColorPickerChange = {onColorPickerChange}
                    color = {color}
                    colorError = {colorError}
                />
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

UpdateTagPopup.propTypes = {
    id: PropTypes.number.isRequired
}

export default UpdateTagPopup