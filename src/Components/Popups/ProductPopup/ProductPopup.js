import { Box, TextField } from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFormReducer from '../../../Hooks/useFormReducer'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestCreateProduct, requestUpdateProduct } from '../../../Redux/Products/actions'
import ProductConstants from '../../../Redux/Products/constants'
import { selectProductById } from '../../../Redux/Products/selectors'
import { requestCreateProject } from '../../../Redux/Projects/actions'
import { selectProjectsWithNoProductId } from '../../../Redux/Projects/selectors'
import { requestFindTeamBy } from '../../../Redux/Teams/actions'
import { requestFindUserBy } from '../../../Redux/Users/actions'
import FormatErrors from '../../../Utilities/FormatErrors'
import { Popup } from '../../Popup'
import { SearchTeams } from '../../Search/SearchTeams'
import { SearchUsers } from '../../Search/SearchUsers'
import { TagDropdown } from '../../TagDropdown'

const filter = createFilterOptions()

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Product' : 'Update Product',
        constant: create ? ProductConstants.CREATE_PRODUCT : ProductConstants.UPDATE_PRODUCT,
        request: (data) => create ? requestCreateProduct(data) : requestUpdateProduct(data)
    }
}

const searchErrors = (errors, searchString) => errors.filter(error => error.includes(searchString))

const generateTeamsQuery = (teamIds) => {
    return teamIds.map(id => `id:${id}`).join(' OR ')
}

function ProductPopup({ id }) {
    const dispatch = useDispatch()

    const product = useSelector(state => selectProductById(state, id))
    const context = initDetails(product.id === undefined)

    const errors = useSelector(state => selectRequestErrors(state, context.constant))
    const nameError = useMemo(() => errors.filter(error => error.includes('name')), [errors])

    const projectsWithNoProductId = useSelector(selectProjectsWithNoProductId)
    const [availableProjects, setAvailableProjects] = useState(product.projects.concat(projectsWithNoProductId))

    const [productManager, setProductManager] = useState()
    const [teams, setTeams] = useState([])

    const [formValues, formDispatch] = React.useReducer(useFormReducer, {
        description: product.description,
        mission: product.mission,
        name: product.name,
        problemStatement: product.problemStatement,
        projects: product.projects,
        tags: product.tags,
        vision: product.vision,
    })

    const handleChange = (name, value) => {
        formDispatch({
            type: 'onChange',
            payload: { name, value }
        })
    }

    const onSelectProjects = (_e, values) => {
        const newProject = values.filter(o => o.id === -1)

        if (newProject.length > 0) {
            const newName = newProject[0].name.split('"')[1]
            const currentValues = values.filter(o => o.id !== -1)

            dispatch(requestCreateProject({
                name: newName,
                productId: product.id,
                tagIds: []
            })).then(unwrapResult)
                .then(results => {
                    currentValues.push(results)
                    setAvailableProjects([...availableProjects, results])
                    handleChange('projects', currentValues)
                })
        } else {
            handleChange('projects', values)
        }
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
            tagIds: Object.values(formValues.tags.map(tag => tag.id)),
            projectIds: Object.values(formValues.projects.map(project => project.id)),
            productManagerId: productManager?.id ?? null,
            teamIds: teams.map(team => team.id),
            childIds: [],
            type: 'PRODUCT',
        }))
    }

    // TODO: Can the useEffect be removed and productManagerId & teams be moved to formValues?
    useEffect(() => {
        product.productManagerId && dispatch(requestFindUserBy(`id:${product.productManagerId}`))
            .then(unwrapResult)
            .then(data => {
                setProductManager(data[0])
            })
        product.teamIds?.length > 0 && dispatch(requestFindTeamBy(generateTeamsQuery(product.teamIds)))
            .then(unwrapResult)
            .then(data => {
                setTeams(data)
            })
    }, [])

    return (
        <Popup
            title = {context.title}
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Product Name'
                    inputProps = {{
                        'data-testid': 'ProductPopup__input-name'
                    }}
                    value = {formValues.name}
                    onChange = {(e) => handleChange('name', e.target.value)}
                    error = {nameError.length > 0}
                    helperText = {<FormatErrors errors = {nameError}/>}
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Description'
                    inputProps = {{
                        'data-testid': 'ProductPopup__input-description'
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
                        'data-testid': 'ProductPopup__input-mission'
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
                        'data-testid': 'ProductPopup__input-vision'
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
                        'data-testid': 'ProductPopup__input-problem'
                    }}
                    value = {formValues.problemStatement}
                    onChange = {(e) => handleChange('problemStatement', e.target.value)}
                    margin = 'dense'
                    multiline
                />
                <SearchUsers
                    onChange = {(_e, values) => setProductManager(values)}
                    title = 'Product Manager'
                    growFrom = '100%'
                    value = {productManager}
                />
                <SearchTeams
                    onChange = {(_e, values) => setTeams(values)}
                    title = 'Team'
                    value = {teams}
                    multiple
                />
                <TagDropdown
                    defaultTags = {formValues.tags}
                    error = {searchErrors(errors, 'Tag')}
                    deletable
                    onChange = {(values) => handleChange('tags', values)}
                    label = 'Tag(s)'
                    type = {['ALL', 'PRODUCT']}
                    creatable
                    creatableType = 'PRODUCT'
                    forcePopupIcon
                />
                <Autocomplete
                    multiple
                    autoSelect
                    options = {availableProjects}
                    getOptionLabel = {(option) => option.name}
                    getOptionSelected = {(option, value) => option.id === value.id}
                    onChange = {onSelectProjects}
                    value = {formValues.projects}
                    ChipProps = {{ variant: 'outlined' }}
                    renderInput = {(params) =>
                        <TextField
                            {...params}
                            label = 'Gitlab Project(s)'
                            margin = 'dense'
                            error = {searchErrors(errors, 'Project with').length > 0}
                            placeholder = {'Project(s) that have CTF pipeline'}
                            helperText = {
                                searchErrors(errors, 'Project with').length > 0 ?
                                    <FormatErrors errors = {searchErrors(errors, 'Project with')}/>
                                    :
                                    'Don\'t see what you\'re looking for? Add it by typing it.'
                            }
                            data-testid = 'ProductPopup__input-projects'
                        />
                    }
                    filterOptions = {(options, params) => {
                        const filtered = filter(options, params)

                        params.inputValue !== '' && filtered.length === 0 && filtered.push({
                            id: -1,
                            name: `Add "${params.inputValue}"`
                        })

                        return filtered
                    }}
                />
            </Box>
        </Popup>
    )
}

ProductPopup.propTypes = {
    id: PropTypes.number
}

ProductPopup.defaultProps = {
    id: 1
}

export default ProductPopup
