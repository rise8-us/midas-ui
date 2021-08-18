import { Box, makeStyles, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFormReducer from '../../../Hooks/useFormReducer'
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

function TeamPopup({ id }) {
    const dispatch = useDispatch()
    const classes = useStyles()

    const team = useSelector(state => selectTeamById(state, id))
    const context = initDetails(team.id === undefined)

    const errors = useSelector(state => selectRequestErrors(state, context.constant))
    const nameErrors = useMemo(() => errors.filter(error => error.includes('name')), [errors])

    const [formValues, formDispatch] = React.useReducer(useFormReducer, {
        name: team.name,
        description: team.description,
        gitlabGroupId: team.gitlabGroupId,
        userIds: team.userIds
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
            ...team,
            name: formValues.name,
            gitlabGroupId: formValues.gitlabGroupId,
            description: formValues.description,
            userIds: formValues.userIds
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
                    label = 'Team Name'
                    inputProps = {{
                        'data-testid': 'TeamPopup__input-name'
                    }}
                    value = {formValues.name}
                    onChange = {(e) => handleChange('name', e.target.value)}
                    error = {nameErrors.length > 0}
                    helperText = {<FormatErrors errors = {nameErrors}/>}
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Gitlab Group Id'
                    type = 'number'
                    inputProps = {{
                        'data-testid': 'TeamPopup__input-gitlabGroupId'
                    }}
                    className = {classes.numberField}
                    value = {formValues.gitlabGroupId}
                    onChange = {(e) => handleChange('gitlabGroupId', e.target.value)}
                    margin = 'dense'
                />
                <TextField
                    label = 'Description'
                    inputProps = {{
                        'data-testid': 'TeamPopup__input-description'
                    }}
                    value = {formValues.description}
                    onChange = {(e) => handleChange('description', e.target.value)}
                    margin = 'dense'
                    multiline
                />
                <TeamUsers
                    userIds = {formValues.userIds}
                    setUserIds = {(values) => handleChange('userIds', values)}
                />
            </Box>
        </Popup>
    )
}

TeamPopup.propTypes = {
    id: PropTypes.number
}

TeamPopup.defaultProps = {
    id: null
}

export default TeamPopup
