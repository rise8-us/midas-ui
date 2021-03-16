import { Box, makeStyles, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestCreateTeam } from '../../../Redux/Teams/actions'
import TeamConstants from '../../../Redux/Teams/constants'
import Popup from '../../Popup/Popup'

const useStyles = makeStyles(() => ({
    textField: {
        '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            display: 'none'
        }
    }
}))

function CreateTeamPopup() {
    const dispatch = useDispatch()
    const classes = useStyles()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [gitlabGroupId, setGitlabGroupId] = useState('')

    const onNameChange = (e) => setName(e.target.value)
    const onGitlabGroupIdChange = (e) => setGitlabGroupId(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)

    const onClose = () => {
        dispatch(closePopup(TeamConstants.CREATE_TEAM))
    }

    const onSubmit = () => {
        dispatch(requestCreateTeam({
            name,
            gitlabGroupId,
            description
        }))
    }

    return (
        <Popup
            title = 'Create New Team'
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' style = {{ flexDirection: 'column' }}>
                <TextField
                    label = 'Team Name'
                    data-testid = 'CreateTeamPopup__input-name'
                    value = {name}
                    onChange = {onNameChange}
                    margin = 'dense'
                    required
                />
                <TextField
                    className = {classes.textField}
                    label = 'Gitlab Group Id'
                    type = 'number'
                    data-testid = 'CreateTeamPopup__input-gitlabGroupId'
                    inputProps = {{ className: 'digitsOnly' }}
                    value = {gitlabGroupId}
                    onChange = {onGitlabGroupIdChange}
                    margin = 'dense'
                />
                <TextField
                    label = 'Description'
                    data-testid = 'CreateTeamPopup__input-description'
                    value = {description}
                    onChange = {onDescriptionChange}
                    margin = 'dense'
                    multiline
                />
            </Box>
        </Popup>
    )
}

export default CreateTeamPopup
