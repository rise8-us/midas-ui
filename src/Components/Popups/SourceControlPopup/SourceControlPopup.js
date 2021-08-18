import { Box, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFormReducer from '../../../Hooks/useFormReducer'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestCreateSourceControl, requestUpdateSourceControl } from '../../../Redux/SourceControls/actions'
import ConfigConstants from '../../../Redux/SourceControls/constants'
import { selectSourceControlById } from '../../../Redux/SourceControls/selectors'
import FormatErrors from '../../../Utilities/FormatErrors'
import { Popup } from '../../Popup'

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Config' : 'Update Config',
        constant: create ? ConfigConstants.CREATE_CONFIG : ConfigConstants.UPDATE_CONFIG,
        request: (data) => create ? requestCreateSourceControl(data) : requestUpdateSourceControl(data)
    }
}

function SourceControlPopup({ id }) {
    const dispatch = useDispatch()

    const config = useSelector(state => selectSourceControlById(state, id))
    const context = initDetails(config.id === undefined)

    const errors = useSelector(state => selectRequestErrors(state, context.constant))
    const nameError = useMemo(() => errors.filter(error => error.includes('name')), [errors])

    const [formValues, formDispatch] = React.useReducer(useFormReducer, {
        name: config.name,
        description: config.description,
        baseUrl: config.baseUrl,
        token: null
    })

    const handleChange = (name, value) => {
        formDispatch({
            type: 'onChange',
            payload: { name, value }
        })
    }

    const onClose = () => {
        dispatch(closePopup(context.constant))
    }

    const onSubmit = () => {
        dispatch(context.request({
            ...config,
            name: formValues.name,
            description: formValues.description,
            baseUrl: formValues.baseUrl,
            token: formValues.token
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
                    label = 'Source Control Name'
                    inputProps = {{
                        'data-testid': 'SourceControlPopup__input-name'
                    }}
                    value = {formValues.name}
                    onChange = {(e) => handleChange('name', e.target.value)}
                    error = {nameError.length > 0}
                    helperText = {<FormatErrors errors = {nameError}/>}
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Source Control Url'
                    inputProps = {{
                        'data-testid': 'SourceControlPopup__input-baseUrl'
                    }}
                    value = {formValues.baseUrl}
                    error = {nameError.length > 0}
                    onChange = {(e) => handleChange('baseUrl', e.target.value)}
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Description'
                    inputProps = {{
                        'data-testid': 'SourceControlPopup__input-description'
                    }}
                    value = {formValues.description}
                    onChange = {(e) => handleChange('description', e.target.value)}
                    margin = 'dense'
                    multiline
                />
                <TextField
                    label = 'Token'
                    type = 'password'
                    inputProps = {{
                        'data-testid': 'SourceControlPopup__input-token'
                    }}
                    value = {formValues.token ?? ''}
                    onChange = {(e) => handleChange('token', e.target.value)}
                    margin = 'dense'
                    required
                />
            </Box>
        </Popup>
    )
}

SourceControlPopup.propTypes = {
    id: PropTypes.number
}

SourceControlPopup.defaultProps = {
    id: null
}

export default SourceControlPopup
