import { Box, makeStyles, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestUpdateTeam } from '../../../Redux/Teams/actions'
import TeamConstants from '../../../Redux/Teams/constants'
import { getTeamById } from '../../../Redux/Teams/selectors'
import Popup from '../../Popup/Popup'

const useStyles = makeStyles(() => ({
    textField: {
        '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            display: 'none'
        }
    }
}))

function UpdateTeamPopup({ id }) {
    const dispatch = useDispatch()
    const classes = useStyles()

    const updateTeam = useSelector(state => getTeamById(state, id))
    const errors = useSelector(state => selectRequestErrors(state, TeamConstants.UPDATE_TEAM))

    const [name, setName] = useState('')
    const [gitlabGroupId, setGitlabGroupId] = useState('')
    const [description, setDescription] = useState('')
    const [nameError, setNameError] = useState([])

    const onNameChange = (e) => setName(e.target.value)
    const onGitlabGroupIdChange = (e) => setGitlabGroupId(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)

    const onClose = () => {
        dispatch(closePopup(TeamConstants.UPDATE_TEAM))
    }

    const onSubmit = () => {
        dispatch(requestUpdateTeam({
            id: updateTeam.id,
            isArchived: updateTeam.isArchived,
            name,
            gitlabGroupId,
            description
        }))
    }

    useEffect(() => {
        setName(updateTeam.name)
        setGitlabGroupId(updateTeam.gitlabGroupId)
        setDescription(updateTeam.description)
    }, [updateTeam])

    useEffect(() => {
        if (errors.length > 0) {
            setNameError(errors.filter(error => error.includes('name')))
        }
    }, [errors])

    return (
        <Popup
            title = 'Update Team'
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' style = {{ flexDirection: 'column' }}>
                <TextField
                    label = 'Team Name'
                    data-testid = 'UpdateTeamPopup__input-name'
                    value = {name}
                    onChange = {onNameChange}
                    error = { nameError.length > 0 }
                    helperText = { nameError[0] ?? '' }
                    margin = 'dense'
                    required
                />
                <TextField
                    className = {classes.textField}
                    label = 'Gitlab Group Id'
                    type = 'number'
                    data-testid = 'UpdateTeamPopup__input-gitlabGroupId'
                    inputProps = {{ className: 'digitsOnly' }}
                    value = {gitlabGroupId}
                    onChange = {onGitlabGroupIdChange}
                    margin = 'dense'
                />
                <TextField
                    label = 'Description'
                    data-testid = 'UpdateTeamPopup__input-description'
                    value = {description}
                    onChange = {onDescriptionChange}
                    margin = 'dense'
                    multiline
                />
            </Box>
        </Popup>
    )
}

UpdateTeamPopup.propTypes = {
    id: PropTypes.number.isRequired
}

export default UpdateTeamPopup
