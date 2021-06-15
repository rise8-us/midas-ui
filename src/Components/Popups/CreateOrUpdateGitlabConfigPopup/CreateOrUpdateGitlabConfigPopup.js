import { Box, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { requestCreateGitlabConfig, requestUpdateGitlabConfig } from '../../../Redux/GitlabConfigs/actions'
import ConfigConstants from '../../../Redux/GitlabConfigs/constants'
import { selectGitlabConfigById } from '../../../Redux/GitlabConfigs/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import FormatErrors from '../../../Utilities/FormatErrors'
import { Popup } from '../../Popup'

function CreateOrUpdateGitlabConfigPopup({ id }) {
    const dispatch = useDispatch()

    const config = useSelector(state => selectGitlabConfigById(state, id))

    const isCreate = config.id === undefined
    const configConstants = isCreate ? ConfigConstants.CREATE_CONFIG : ConfigConstants.UPDATE_CONFIG
    const configTitle = isCreate ? 'Create Config' : 'Update Config'

    const configRequest = (data) => isCreate ? requestCreateGitlabConfig(data) : requestUpdateGitlabConfig(data)
    const errors = useSelector(state => selectRequestErrors(state, configConstants))

    const [name, setName] = useState(config.name)
    const [baseUrl, setBaseUrl] = useState(config.baseUrl)
    const [description, setDescription] = useState(config.description)
    const [token, setToken] = useState(config.token)

    const [nameError, setNameError] = useState([])

    const onNameChange = (e) => setName(e.target.value)
    const onBaseUrlChange = (e) => setBaseUrl(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)
    const onTokenChange = (e) => setToken(e.target.value)

    const onClose = () => {
        dispatch(closePopup(configConstants))
    }

    const onSubmit = () => {
        dispatch(configRequest({
            ...config,
            name,
            description,
            baseUrl,
            token
        }))
    }

    useEffect(() => {
        if (errors.length > 0) {
            setNameError(errors.filter(error => error.includes('name')))
        }
    }, [errors])

    return (
        <Popup
            title = {configTitle}
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Gitlab Name'
                    inputProps = {{
                        'data-testid': 'CreateOrUpdateGitlabConfigPopup__input-name'
                    }}
                    value = {name}
                    onChange = {onNameChange}
                    error = {nameError.length > 0}
                    helperText = {<FormatErrors errors = {nameError}/>}
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Gitlab Url'
                    inputProps = {{
                        'data-testid': 'CreateOrUpdateGitlabConfigPopup__input-baseUrl'
                    }}
                    value = {baseUrl}
                    error = {nameError.length > 0}
                    onChange = {onBaseUrlChange}
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Description'
                    inputProps = {{
                        'data-testid': 'CreateOrUpdateGitlabConfigPopup__input-description'
                    }}
                    value = {description}
                    onChange = {onDescriptionChange}
                    margin = 'dense'
                    multiline
                />
                <TextField
                    label = 'Token'
                    type = 'password'
                    inputProps = {{
                        'data-testid': 'CreateOrUpdateGitlabConfigPopup__input-token'
                    }}
                    value = {token}
                    onChange = {onTokenChange}
                    margin = 'dense'
                    required
                />
            </Box>
        </Popup>
    )
}

CreateOrUpdateGitlabConfigPopup.propTypes = {
    id: PropTypes.number
}

CreateOrUpdateGitlabConfigPopup.defaultProps = {
    id: null
}

export default CreateOrUpdateGitlabConfigPopup
