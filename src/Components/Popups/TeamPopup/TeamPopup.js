import { Box, TextField } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { Popup } from 'Components/Popup'
import { SearchUsers } from 'Components/Search'
import { UsersCollection } from 'Components/UsersCollection'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from 'Redux/Errors/selectors'
import { closePopup } from 'Redux/Popups/actions'
import { requestUpdateProduct } from 'Redux/Products/actions'
import { selectProductById } from 'Redux/Products/selectors'
import { requestCreateTeam, requestUpdateTeam } from 'Redux/Teams/actions'
import TeamsConstants from 'Redux/Teams/constants'
import { selectTeamById } from 'Redux/Teams/selectors'
import { requestSearchUsers } from 'Redux/Users/actions'
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

export const excludeUserIds = (userIds, excludeIds) => {
    return userIds.filter(id => !excludeIds.includes(id))
}

function TeamPopup({ id, productIds }) {
    const dispatch = useDispatch()

    const team = useSelector(state => selectTeamById(state, id))
    const context = initDetails(team.id === undefined)

    const errors = useSelector(state => selectRequestErrors(state, context.constant))
    const nameErrors = useMemo(() => errors.filter(error => error.includes('name')), [errors])

    const [userIds, setUserIds] = useState(excludeUserIds(
        team.userIds, [team.productManagerId, team.techLeadId, team.designerId]))
    const product = useSelector(state => selectProductById(state, productIds[0]))

    const [formValues, formDispatch] = React.useReducer(useFormReducer, {
        name: team.name,
        description: team.description,
        productIds: team.productIds ?? productIds,
        productOwner: undefined,
        productManager: undefined,
        designer: undefined,
        techLead: undefined
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
        const productOwnerId = setNumberOrNull(formValues.productOwner?.id)
        const productManagerId = setNumberOrNull(formValues.productManager?.id)
        const designerId = setNumberOrNull(formValues.designer?.id)
        const techLeadId = setNumberOrNull(formValues.techLead?.id)

        const userIdsFinal = new Set(userIds)
        userIdsFinal.add(productManagerId)
        userIdsFinal.add(designerId)
        userIdsFinal.add(techLeadId)
        userIdsFinal.delete(null)

        dispatch(context.request({
            ...team,
            name: formValues.name,
            description: formValues.description,
            productIds: formValues.productIds,
            productManagerId: productManagerId,
            designerId: designerId,
            techLeadId: techLeadId,
            userIds: Array.from(userIdsFinal),
        }))

        if (productIds.length) {
            dispatch(requestUpdateProduct({
                ...product,
                personnel: {
                    ...product.personnel,
                    ownerId: productOwnerId
                },
                childIds: []
            }))
        }

    }

    const requestUserData = (userId, field) => {
        dispatch(requestSearchUsers(`id:${userId}`))
            .then(unwrapResult)
            .then(data => {
                handleChange(field, data[0])
            })
    }

    const displayProductOwner = () => {
        return productIds.length ?
            <SearchUsers
                title = 'Product Owner'
                value = {formValues.productOwner}
                onChange = {(_e, values) => handleChange('productOwner', values)}
            /> :
            null
    }

    useEffect(() => {
        product?.personnel?.ownerId && requestUserData(product?.personnel?.ownerId, 'productOwner')
        team.productManagerId && requestUserData(team.productManagerId, 'productManager')
        team.designerId && requestUserData(team.designerId, 'designer')
        team.techLeadId && requestUserData(team.techLeadId, 'techLead')
    }, [])

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
                {displayProductOwner()}
                <SearchUsers
                    title = 'Product Manager'
                    value = {formValues.productManager}
                    onChange = {(_e, values) => handleChange('productManager', values)}
                />
                <SearchUsers
                    title = 'Designer (UI/UX)'
                    value = {formValues.designer}
                    onChange = {(_e, values) => handleChange('designer', values)}
                />
                <SearchUsers
                    title = 'Tech Lead'
                    value = {formValues.techLead}
                    onChange = {(_e, values) => handleChange('techLead', values)}
                />
                <UsersCollection
                    userIds = {userIds}
                    setUserIds = {setUserIds}
                    placeholderValue = 'Add another team member...'
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
