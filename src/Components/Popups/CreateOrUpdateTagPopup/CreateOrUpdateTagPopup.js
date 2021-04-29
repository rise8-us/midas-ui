import { Box, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestCreateTag, requestUpdateTag } from '../../../Redux/Tags/actions'
import TagConstants from '../../../Redux/Tags/constants'
import { selectTagById } from '../../../Redux/Tags/selectors'
import { ColorPicker } from '../../ColorPicker'
import { Popup } from '../../Popup'
import { Tag } from '../../Tag'

function CreateOrUpdateTagPopup({ id }) {
    const dispatch = useDispatch()

    const tag = useSelector(state => selectTagById(state, id))

    const isCreate = tag.id === undefined
    const tagConstants = isCreate ? TagConstants.CREATE_TAG : TagConstants.UPDATE_TAG
    const tagTitle = isCreate ? 'Create Tag' : 'Update Tag'
    const tagRequest = (data) => isCreate ? requestCreateTag(data) : requestUpdateTag(data)

    const errors = useSelector(state => selectRequestErrors(state, tagConstants))

    const [label, setLabel] = useState(tag.label)
    const [description, setDescription] = useState(tag.description)
    const [color, setColor] = useState(tag.color)

    const [labelError, setLabelError] = useState([])
    const [colorError, setColorError] = useState([])

    const onLabelChange = (e) => setLabel(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)
    const onColorChange = (e) => setColor(e)

    const onClose = () => dispatch(closePopup(tagConstants))

    const onSubmit = () => {
        dispatch(tagRequest({
            ...tag,
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
            title = {tagTitle}
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Label'
                    data-testid = 'CreateOrUpdateTagPopup__input-label'
                    value = {label}
                    onChange = {onLabelChange}
                    error = { labelError.length > 0 }
                    helperText = { labelError[0] ?? 'Use :: to create a scoped label set (eg. priority::1)' }
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Description'
                    data-testid = 'CreateOrUpdateTagPopup__input-description'
                    value = {description}
                    onChange = {onDescriptionChange}
                    margin = 'dense'
                    multiline
                />
                <ColorPicker
                    onChange = {onColorChange}
                    errors = {colorError}
                    initialColor = {color}
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

CreateOrUpdateTagPopup.propTypes = {
    id: PropTypes.number
}

CreateOrUpdateTagPopup.defaultProps = {
    id: null
}

export default CreateOrUpdateTagPopup