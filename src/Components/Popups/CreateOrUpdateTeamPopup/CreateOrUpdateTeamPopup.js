import { Box, makeStyles, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestCreateTeam, requestUpdateTeam } from '../../../Redux/Teams/actions'
import TeamsConstants from '../../../Redux/Teams/constants'
import { selectTeamById } from '../../../Redux/Teams/selectors'
import FormatErrors from '../../../Utilities/FormatErrors'
import { Popup } from '../../Popup'
import { TeamUsers } from '../../TeamUsers'

const useStyles = makeStyles(() => ({
    numberField: {
        '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            display: 'none'
        }
    }
}))

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Team' : 'Update Team',
        constant: create ? TeamsConstants.CREATE_TEAM : TeamsConstants.UPDATE_TEAM,
        request: (data) => create ? requestCreateTeam(data) : requestUpdateTeam(data)
    }
}

function CreateOrUpdateTeamPopup({ id }) {
    const dispatch = useDispatch()
    const classes = useStyles()

    const team = useSelector(state => selectTeamById(state, id))

    const context = initDetails(team.id === undefined)

    const errors = useSelector(state => selectRequestErrors(state, context.constant))

    const [name, setName] = useState(team.name)
    const [gitlabGroupId, setGitlabGroupId] = useState(team.gitlabGroupId)
    const [description, setDescription] = useState(team.description)
    const [userIds, setUserIds] = useState(team.userIds)

    const onNameChange = (e) => setName(e.target.value)
    const onGitlabGroupIdChange = (e) => setGitlabGroupId(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)

    const onClose = () => {
        dispatch(closePopup(context.constant))
    }

    const onSubmit = () => {
        dispatch(context.request({
            ...team,
            name,
            gitlabGroupId,
            description,
            userIds
        }))
    }

    const nameErrors = useMemo(() => errors.filter(error => error.includes('name')), [errors])

    return (
        <Popup
            title = {context.title}
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Team Name'
                    inputProps = {{
                        'data-testid': 'CreateOrUpdateTeamPopup__input-name'
                    }}
                    value = {name}
                    onChange = {onNameChange}
                    error = {nameErrors.length > 0}
                    helperText = {<FormatErrors errors = {nameErrors}/>}
                    margin = 'dense'
                    required
                />
                <TextField
                    className = {classes.numberField}
                    label = 'Gitlab Group Id'
                    type = 'number'
                    inputProps = {{
                        'data-testid': 'CreateOrUpdateTeamPopup__input-gitlabGroupId'
                    }}
                    value = {gitlabGroupId}
                    onChange = {onGitlabGroupIdChange}
                    margin = 'dense'
                />
                <TextField
                    label = 'Description'
                    inputProps = {{
                        'data-testid': 'CreateOrUpdateTeamPopup__input-description'
                    }}
                    value = {description}
                    onChange = {onDescriptionChange}
                    margin = 'dense'
                    multiline
                />
                <TeamUsers userIds = {userIds} setUserIds = {setUserIds} />
            </Box>
        </Popup>
    )
}

CreateOrUpdateTeamPopup.propTypes = {
    id: PropTypes.number
}

CreateOrUpdateTeamPopup.defaultProps = {
    id: null
}

export default CreateOrUpdateTeamPopup
