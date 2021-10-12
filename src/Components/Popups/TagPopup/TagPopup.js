import { Box, Icon, TextField, Tooltip } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'
import { ColorPicker } from 'Components/ColorPicker'
import { Popup } from 'Components/Popup'
import { Tag } from 'Components/Tag'
import Tooltips from 'Constants/Tooltips'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTagTypes } from 'Redux/AppSettings/selectors'
import { selectRequestErrors } from 'Redux/Errors/selectors'
import { closePopup } from 'Redux/Popups/actions'
import { requestCreateTag, requestUpdateTag } from 'Redux/Tags/actions'
import TagConstants from 'Redux/Tags/constants'
import { selectTagById } from 'Redux/Tags/selectors'
import FormatErrors from 'Utilities/FormatErrors'

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Tag' : 'Update Tag',
        constant: create ? TagConstants.CREATE_TAG : TagConstants.UPDATE_TAG,
        request: (data) => create ? requestCreateTag(data) : requestUpdateTag(data)
    }
}

function TagPopup({ id, type }) {
    const dispatch = useDispatch()

    const tag = useSelector(state => selectTagById(state, id))
    const context = initDetails(tag.id === undefined)

    const errors = useSelector(state => selectRequestErrors(state, context.constant))
    const labelError = useMemo(() => errors.filter(error => error.includes('label')), [errors])
    const typeError = useMemo(() => errors.filter(error => error.includes('TagType')), [errors])
    const colorError = useMemo(() => errors.filter(error => error.includes('hex')), [errors])

    const types = useSelector(selectTagTypes)

    const [formValues, formDispatch] = React.useReducer(useFormReducer, {
        label: tag.label,
        description: tag.description,
        color: tag.color,
        type: type ?? tag.tagType
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
            ...tag,
            label: formValues.label,
            description: formValues.description,
            color: formValues.color,
            tagType: formValues.type
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
                    label = 'Label'
                    data-testid = 'TagPopup__input-label'
                    value = { formValues.label}
                    onChange = {(e) => handleChange('label', e.target.value)}
                    error = { labelError.length > 0 }
                    helperText = { labelError[0] ?? 'Use :: to create a scoped label set (eg. priority::1)' }
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Description'
                    data-testid = 'TagPopup__input-description'
                    value = { formValues.description}
                    onChange = {(e) => handleChange('description', e.target.value)}
                    margin = 'dense'
                    multiline
                />
                <Autocomplete
                    value = { formValues.tagType}
                    onChange = {(_e, values) => handleChange('type', values)}
                    options = {types}
                    renderInput = {(params) =>
                        <TextField
                            {...params}
                            label = 'Tag Type'
                            InputProps = {{
                                ...params.InputProps,
                                readOnly: true,
                                startAdornment:
                                    <Tooltip arrow placement = 'top' title = {Tooltips.TAG_TYPE}>
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
                    onChange = {(e) => handleChange('color', e)}
                    errors = {colorError}
                    initialColor = {formValues.color}
                />
                <Box
                    display = 'flex'
                    justifyContent = 'space-around'
                    margin = 'auto'
                    style = {{ paddingTop: '20px', height: '24px' }}
                >
                    {formValues.label && formValues.color &&
                        <Tag
                            label = {formValues.label}
                            description = {formValues.description}
                            color = {formValues.color}
                        />
                    }
                </Box>
            </Box>
        </Popup>
    )
}

TagPopup.propTypes = {
    id: PropTypes.number,
    type: PropTypes.oneOf(['ALL', 'PRODUCT', 'PROJECT', 'PORTFOLIO'])
}

TagPopup.defaultProps = {
    id: null,
    type: null
}

export default TagPopup