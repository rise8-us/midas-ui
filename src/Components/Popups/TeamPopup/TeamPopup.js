import { Box, TextField } from '@material-ui/core'
import { unwrapResult } from '@reduxjs/toolkit'
import { Popup } from 'Components/Popup'
import { SearchUsers } from 'Components/Search'
import { TeamUsers } from 'Components/TeamUsers'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from 'Redux/Errors/selectors'
import { closePopup } from 'Redux/Popups/actions'
import { requestCreateTeam, requestUpdateTeam } from 'Redux/Teams/actions'
import TeamsConstants from 'Redux/Teams/constants'
import { selectTeamById } from 'Redux/Teams/selectors'
import { requestFindUserBy } from 'Redux/Users/actions'
import FormatErrors from 'Utilities/FormatErrors'

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Team' : 'Update Team',
        constant: create ? TeamsConstants.CREATE_TEAM : TeamsConstants.UPDATE_TEAM,
        request: (data) => create ? requestCreateTeam(data) : requestUpdateTeam(data)
    }
}

const setNumberOrNull = (item) => item ?? null

function TeamPopup({ id, productIds }) {
    const dispatch = useDispatch()

    const team = useSelector(state => selectTeamById(state, id))
    const context = initDetails(team.id === undefined)

    const errors = useSelector(state => selectRequestErrors(state, context.constant))
    const nameErrors = useMemo(() => errors.filter(error => error.includes('name')), [errors])

    const [formValues, formDispatch] = React.useReducer(useFormReducer, {
        name: team.name,
        description: team.description,
        productManager: undefined,
        designer: undefined,
        techLead: undefined,
        userIds: team.userIds,
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
        const productManagerId = setNumberOrNull(formValues.productManager?.id)
        const designerId = setNumberOrNull(formValues.designer?.id)
        const techLeadId = setNumberOrNull(formValues.techLead?.id)

        const userIds = new Set(formValues.userIds)
        userIds.add(productManagerId)
        userIds.add(designerId)
        userIds.add(techLeadId)
        userIds.delete(null)

        dispatch(context.request({
            ...team,
            productIds,
            name: formValues.name,
            description: formValues.description,
            productManagerId: productManagerId,
            designerId: designerId,
            techLeadId: techLeadId,
            userIds: Array.from(userIds),
        }))
    }

    const requestUserData = (userId, field) => {
        dispatch(requestFindUserBy(`id:${userId}`))
            .then(unwrapResult)
            .then(data => {
                handleChange(field, data[0])
            })
    }

    useEffect(() => {
        team.productManagerId && requestUserData(team.productManagerId, 'productManager')
        team.designerId && requestUserData(team.designerId, 'designer')
        team.techLeadId && requestUserData(team.techLeadId, 'techLead')
    }, [team])

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
                <SearchUsers
                    title = 'Product Manager'
                    growFrom = '100%'
                    value = {formValues.productManager}
                    onChange = {(_e, values) => handleChange('productManager', values)}
                    freeSolo = {true}
                    dynamicUpdate
                />
                <SearchUsers
                    title = 'Designer (UI/UX)'
                    growFrom = '100%'
                    value = {formValues.designer}
                    onChange = {(_e, values) => handleChange('designer', values)}
                    freeSolo = {true}
                    dynamicUpdate
                />
                <SearchUsers
                    title = 'Tech Lead'
                    growFrom = '100%'
                    value = {formValues.techLead}
                    onChange = {(_e, values) => handleChange('techLead', values)}
                    freeSolo = {true}
                    dynamicUpdate
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
    id: PropTypes.number,
    productIds: PropTypes.arrayOf(PropTypes.number)
}

TeamPopup.defaultProps = {
    id: null,
    productIds: [],
}

export default TeamPopup
