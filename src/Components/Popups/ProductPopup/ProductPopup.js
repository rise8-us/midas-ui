import { Stack, TextField } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { Popup } from 'Components/Popup'
import { ProductConfigurationFields } from 'Components/ProductConfigurationFields/index'
import { SearchUsers } from 'Components/Search'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from 'Redux/Errors/selectors'
import { closePopup } from 'Redux/Popups/actions'
import { requestCreateProduct, requestUpdateProduct } from 'Redux/Products/actions'
import ProductConstants from 'Redux/Products/constants'
import { selectProductById } from 'Redux/Products/selectors'
import { requestSearchUsers } from 'Redux/Users/actions'
import FormatErrors from 'Utilities/FormatErrors'

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Product' : 'Update Product',
        constant: create ? ProductConstants.CREATE_PRODUCT : ProductConstants.UPDATE_PRODUCT,
        request: (data) => create ? requestCreateProduct(data) : requestUpdateProduct(data)
    }
}

function ProductPopup({ id }) {
    const dispatch = useDispatch()

    const product = useSelector((state) => selectProductById(state, id))
    const context = initDetails(product.id === undefined)

    const errors = useSelector((state) => selectRequestErrors(state, context.constant))
    const nameError = useMemo(() => errors.filter((error) => error.includes('name')), [errors])

    const [teams, setTeams] = useState([])
    const [tags, setTags] = useState([])
    const [projects, setProjects] = useState([])
    const [gitlabGroupId, setGitlabGroupId] = useState(null)
    const [sourceControl, setSourceControl] = useState({})
    const [fetched, setFetched] = useState(false)
    const [roadmapType, setRoadmapType] = useState(null)

    const [formValues, formDispatch] = React.useReducer(useFormReducer, {
        description: product.description,
        mission: product.mission,
        name: product.name,
        problemStatement: product.problemStatement,
        vision: product.vision
    })

    const handleChange = (name, value) => {
        formDispatch({
            type: 'onChange',
            payload: { name, value },
        })
    }

    const onClose = () => dispatch(closePopup(context.constant))

    const onSubmit = () => {
        dispatch(context.request({
            ...product,
            name: formValues.name,
            description: formValues.description,
            mission: formValues.mission,
            vision: formValues.vision,
            problemStatement: formValues.problemStatement,
            gitlabGroupId: gitlabGroupId,
            sourceControlId: sourceControl?.id ?? null,
            tagIds: Object.values(tags.map((tag) => tag.id)),
            personnel: {
                ...product.personnel,
                ownerId: formValues.owner?.id ?? null,
                teamIds: Object.values(teams.map((team) => team.id)),
                adminIds: []
            },
            projectIds: Object.values(projects.map((project) => project.id)),
            roadmapType: roadmapType?.name ?? 'MANUAL',
        }))
    }

    useEffect(() => {
        if (!fetched && product?.personnel?.ownerId > 0) {
            setFetched(true)
            dispatch(requestSearchUsers(`id:${product.personnel.ownerId}`))
                .then(unwrapResult)
                .then((data) => {
                    handleChange('owner', data[0])
                })
        }
    }, [product])

    return (
        <Popup title = {context.title} onClose = {onClose} onSubmit = {onSubmit}>
            <Stack>
                <TextField
                    label = 'Product Name'
                    inputProps = {{
                        'data-testid': 'ProductPopup__input-name',
                    }}
                    value = {formValues.name}
                    onChange = {(e) => handleChange('name', e.target.value)}
                    error = {nameError.length > 0}
                    helperText = {<FormatErrors errors = {nameError} />}
                    margin = 'dense'
                    required
                />
                <SearchUsers
                    title = 'Product Owner'
                    value = {formValues.owner}
                    onChange = {(_e, values) => handleChange('owner', values)}
                />
                <TextField
                    label = 'Description'
                    inputProps = {{
                        'data-testid': 'ProductPopup__input-description',
                    }}
                    value = {formValues.description}
                    onChange = {(e) => handleChange('description', e.target.value)}
                    margin = 'dense'
                    multiline
                />
                <TextField
                    label = 'Mission'
                    placeholder = 'mission'
                    inputProps = {{
                        'data-testid': 'ProductPopup__input-mission',
                    }}
                    value = {formValues.mission}
                    onChange = {(e) => handleChange('mission', e.target.value)}
                    margin = 'dense'
                    multiline
                />
                <TextField
                    label = 'Vision'
                    placeholder = 'vision'
                    inputProps = {{
                        'data-testid': 'ProductPopup__input-vision',
                    }}
                    value = {formValues.vision}
                    onChange = {(e) => handleChange('vision', e.target.value)}
                    margin = 'dense'
                    multiline
                />
                <TextField
                    label = 'Problem Statement'
                    placeholder = 'Problem'
                    inputProps = {{
                        'data-testid': 'ProductPopup__input-problem',
                    }}
                    value = {formValues.problemStatement}
                    onChange = {(e) => handleChange('problemStatement', e.target.value)}
                    margin = 'dense'
                    multiline
                />
                <ProductConfigurationFields
                    errors = {errors}
                    onRoadmapTypeChange = {setRoadmapType}
                    onGroupIdChange = {setGitlabGroupId}
                    onProjectsChange = {setProjects}
                    onSourceControlChange = {setSourceControl}
                    onTagsChange = {setTags}
                    onTeamsChange = {setTeams}
                    product = {product}
                />
            </Stack>
        </Popup>
    )
}

ProductPopup.propTypes = {
    id: PropTypes.number
}

ProductPopup.defaultProps = {
    id: null
}

export default ProductPopup
