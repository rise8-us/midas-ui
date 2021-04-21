import { Box, makeStyles, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestUpdateTeam, requestCreateTeam } from '../../../Redux/Teams/actions'
import TeamConstants from '../../../Redux/Teams/constants'
import { selectTeamById } from '../../../Redux/Teams/selectors'
import { Popup } from '../../Popup'

const useStyles = makeStyles(() => ({
    numberField: {
        '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            display: 'none'
        }
    }
}))

function CreateOrUpdateTeamPopup({ id }) {
    const dispatch = useDispatch()
    const classes = useStyles()

    const team = useSelector(state => selectTeamById(state, id))

    const isCreate = team.id === undefined
    const teamConstants = isCreate ? TeamConstants.CREATE_TEAM : TeamConstants.UPDATE_TEAM
    const teamTitle = isCreate ? 'Create Team' : 'Update Team'

    const teamRequest = (data) => isCreate ? requestCreateTeam(data) : requestUpdateTeam(data)
    const errors = useSelector(state => selectRequestErrors(state, teamConstants))

    const [name, setName] = useState(team.name)
    const [gitlabGroupId, setGitlabGroupId] = useState(team.gitlabGroupId)
    const [description, setDescription] = useState(team.description)

    const [nameError, setNameError] = useState([])

    const onNameChange = (e) => setName(e.target.value)
    const onGitlabGroupIdChange = (e) => setGitlabGroupId(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)

    const onClose = () => {
        dispatch(closePopup(teamConstants))
    }

    const onSubmit = () => {
        dispatch(teamRequest({
            ...team,
            name,
            gitlabGroupId,
            description,
            userIds: []
        }))
    }

    useEffect(() => {
        if (errors.length > 0) {
            setNameError(errors.filter(error => error.includes('name')))
        }
    }, [errors])

    return (
        <Popup
            title = {teamTitle}
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Team Name'
                    data-testid = 'CreateOrUpdateTeamPopup__input-name'
                    value = {name}
                    onChange = {onNameChange}
                    error = {nameError.length > 0}
                    helperText = {nameError[0] ?? ''}
                    margin = 'dense'
                    required
                />
                <TextField
                    className = {classes.numberField}
                    label = 'Gitlab Group Id'
                    type = 'number'
                    data-testid = 'CreateOrUpdateTeamPopup__input-gitlabGroupId'
                    value = {gitlabGroupId}
                    onChange = {onGitlabGroupIdChange}
                    margin = 'dense'
                />
                <TextField
                    label = 'Description'
                    data-testid = 'CreateOrUpdateTeamPopup__input-description'
                    value = {description}
                    onChange = {onDescriptionChange}
                    margin = 'dense'
                    multiline
                />
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
