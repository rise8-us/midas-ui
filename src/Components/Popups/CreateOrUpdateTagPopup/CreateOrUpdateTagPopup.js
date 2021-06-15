import { Box, Icon, TextField, Tooltip } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTagTypes } from '../../../Redux/AppSettings/selectors'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestCreateTag, requestUpdateTag } from '../../../Redux/Tags/actions'
import TagConstants from '../../../Redux/Tags/constants'
import { selectTagById } from '../../../Redux/Tags/selectors'
import FormatErrors from '../../../Utilities/FormatErrors'
import { ColorPicker } from '../../ColorPicker'
import { Popup } from '../../Popup'
import { Tag } from '../../Tag'

function CreateOrUpdateTagPopup({ id, type }) {
    const dispatch = useDispatch()

    const tagTypeTooltip = 'This will only allow the tag to be available at certain levels. ' +
        'A Project is the smallest component in a Product. It typically has a gitlab pipeline and CTF associated ' +
        'with it. A Product is a collection of Projects; typically composed of a front and backend project, ' +
        'but it is not confined to only that. A Portfolio is a collection of Products.'

    const tag = useSelector(state => selectTagById(state, id))
    const tagTypes = useSelector(selectTagTypes)

    const isCreate = tag.id === undefined
    const tagConstants = isCreate ? TagConstants.CREATE_TAG : TagConstants.UPDATE_TAG
    const tagTitle = isCreate ? 'Create Tag' : 'Update Tag'
    const tagRequest = (data) => isCreate ? requestCreateTag(data) : requestUpdateTag(data)

    const errors = useSelector(state => selectRequestErrors(state, tagConstants))

    const [label, setLabel] = useState(tag.label)
    const [description, setDescription] = useState(tag.description)
    const [color, setColor] = useState(tag.color)
    const [tagType, setTagType] = useState(type ?? tag.tagType)

    const [labelError, setLabelError] = useState([])
    const [typeError, setTypeError] = useState([])
    const [colorError, setColorError] = useState([])

    const onLabelChange = (e) => setLabel(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)
    const onTagTypeChange = (_e, value) => {
        setTagType(value)
    }
    const onColorChange = (e) => setColor(e)

    const onClose = () => dispatch(closePopup(tagConstants))

    const onSubmit = () => {
        dispatch(tagRequest({
            ...tag,
            label,
            color,
            description,
            tagType
        }))
    }

    useEffect(() => {
        if (errors.length > 0) {
            setLabelError(errors.filter(error => error.includes('label')))
            setColorError(errors.filter(error => error.includes('hex')))
            setTypeError(errors.filter(error => error.includes('TagType')))
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
                <Autocomplete
                    value = {tagType}
                    onChange = {onTagTypeChange}
                    options = {tagTypes}
                    renderInput = {(params) =>
                        <TextField
                            {...params}
                            label = 'Tag Type'
                            InputProps = {{
                                ...params.InputProps,
                                readOnly: true,
                                startAdornment:
                                    <Tooltip arrow placement = 'top' title = {tagTypeTooltip}>
                                        <Icon color = 'secondary'>
                                            <HelpOutline viewBox = '0 0 28 28' />
                                        </Icon>
                                    </Tooltip>,
                            }}
                            margin = 'dense'
                            error = { typeError.length > 0 }
                            helperText = {<FormatErrors errors = {typeError} />}
                        />
                    }
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
    id: PropTypes.number,
    type: PropTypes.oneOf(['ALL', 'PRODUCT', 'PROJECT', 'PORTFOLIO'])
}

CreateOrUpdateTagPopup.defaultProps = {
    id: null,
    type: null
}

export default CreateOrUpdateTagPopup