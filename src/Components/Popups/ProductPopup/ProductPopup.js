import { Box, TextField } from '@mui/material'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { unwrapResult } from '@reduxjs/toolkit'
import { Popup } from 'Components/Popup'
import { SearchUsers } from 'Components/Search'
import { SearchTeams } from 'Components/Search/SearchTeams'
import { TagDropdown } from 'Components/TagDropdown'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from 'Redux/Errors/selectors'
import { closePopup } from 'Redux/Popups/actions'
import { requestCreateProduct, requestUpdateProduct } from 'Redux/Products/actions'
import ProductConstants from 'Redux/Products/constants'
import { selectProductById } from 'Redux/Products/selectors'
import { requestCreateProject } from 'Redux/Projects/actions'
import { selectProjectsWithNoProductId } from 'Redux/Projects/selectors'
import { selectSourceControlById, selectSourceControls } from 'Redux/SourceControls/selectors'
import { requestFindTeamBy } from 'Redux/Teams/actions'
import { requestFindUserBy } from 'Redux/Users/actions'
import { styled } from 'Styles/materialThemes'
import FormatErrors from 'Utilities/FormatErrors'

const TextFieldStyled = styled(TextField)(() => ({
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
      {
          display: 'none',
      },
}))

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

    const product = useSelector((state) => selectProductById(state, id))
    const context = initDetails(product.id === undefined)

    const allSourceControls = useSelector(selectSourceControls)
    const orginalSourceControl = useSelector((state) =>
        selectSourceControlById(state, product.sourceControlId)
    )

    const projectsWithNoProductId = useSelector(selectProjectsWithNoProductId)
    const [availableProjects, setAvailableProjects] = useState(
        product.projects.concat(projectsWithNoProductId)
    )

    const errors = useSelector((state) =>
        selectRequestErrors(state, context.constant)
    )
    const nameError = useMemo(
        () => errors.filter((error) => error.includes('name')),
        [errors]
    )
    const gitlabError = useMemo(
        () => errors.filter((error) => error.includes('Gitlab')),
        [errors]
    )

    const [teams, setTeams] = useState([])
    const [fetched, setFetched] = useState(false)

    const [formValues, formDispatch] = React.useReducer(useFormReducer, {
        description: product.description,
        mission: product.mission,
        name: product.name,
        problemStatement: product.problemStatement,
        gitlabGroupId: product.gitlabGroupId,
        projects: product.projects,
        tags: product.tags,
        vision: product.vision,
        sourceControl:
        orginalSourceControl.id !== undefined ? orginalSourceControl : null,
        owner: undefined,
    })

    const handleChange = (name, value) => {
        formDispatch({
            type: 'onChange',
            payload: { name, value },
        })
    }

    const onSelectProjects = (_e, values) => {
        const newProject = values.filter((o) => o.id === -1)

        if (newProject.length > 0) {
            const newName = newProject[0].name.split('"')[1]
            const currentValues = values.filter((o) => o.id !== -1)

            dispatch(
                requestCreateProject({
                    name: newName,
                    productId: product.id,
                    tagIds: [],
                })
            )
                .then(unwrapResult)
                .then((results) => {
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
        dispatch(
            context.request({
                ...product,
                name: formValues.name,
                description: formValues.description,
                mission: formValues.mission,
                vision: formValues.vision,
                problemStatement: formValues.problemStatement,
                gitlabGroupId: formValues.gitlabGroupId,
                sourceControlId: formValues.sourceControl?.id ?? null,
                tagIds: Object.values(formValues.tags.map((tag) => tag.id)),
                projectIds: Object.values(
                    formValues.projects.map((project) => project.id)
                ),
                teamIds: teams.map((team) => team.id),
                childIds: [],
                type: 'PRODUCT',
                ownerId: formValues.owner?.id ?? null,
            })
        )
    }

    // TODO: Can the useEffect be removed and teams be moved to formValues?
    useEffect(() => {
        product.teamIds?.length > 0 &&
        dispatch(requestFindTeamBy(generateTeamsQuery(product.teamIds)))
            .then(unwrapResult)
            .then((data) => {
                setTeams(data)
            })
    }, [])

    useEffect(() => {
        if (!fetched && product.ownerId > 0) {
            setFetched(true)
            dispatch(requestFindUserBy(`id:${product.ownerId}`))
                .then(unwrapResult)
                .then((data) => {
                    handleChange('owner', data[0])
                })
        }
    }, [product])

    return (
        <Popup title = {context.title} onClose = {onClose} onSubmit = {onSubmit}>
            <Box display = 'flex' flexDirection = 'column'>
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
                    value = {formValues.sourceControl}
                    onChange = {(_e, values) => handleChange('sourceControl', values)}
                    options = {allSourceControls}
                    getOptionLabel = {(option) => option.name}
                    renderInput = {(params) => (
                        <TextField
                            {...params}
                            label = 'Gitlab server'
                            InputProps = {{
                                ...params.InputProps,
                                readOnly: true,
                            }}
                            margin = 'dense'
                        />
                    )}
                />
                <TextFieldStyled
                    label = 'Gitlab Group Id'
                    type = 'number'
                    inputProps = {{
                        'data-testid': 'ProductPopup__input-gitlabGroupId',
                    }}
                    value = {formValues.gitlabGroupId}
                    onChange = {(e) => handleChange('gitlabGroupId', e.target.value)}
                    error = {gitlabError.length > 0}
                    helperText = {<FormatErrors errors = {gitlabError} />}
                    margin = 'dense'
                />
                <Autocomplete
                    multiple
                    autoSelect
                    options = {availableProjects}
                    getOptionLabel = {(option) => option.name}
                    isOptionEqualToValue = {(option, value) => option.id === value.id}
                    onChange = {onSelectProjects}
                    value = {formValues.projects}
                    ChipProps = {{ variant: 'outlined' }}
                    renderInput = {(params) => (
                        <TextField
                            {...params}
                            label = 'Gitlab Project(s)'
                            margin = 'dense'
                            error = {searchErrors(errors, 'Project with').length > 0}
                            placeholder = {'Project(s) that have CTF pipeline'}
                            helperText = {
                                searchErrors(errors, 'Project with').length > 0 ? (
                                    <FormatErrors errors = {searchErrors(errors, 'Project with')} />
                                ) : (
                                    'Don\'t see what you\'re looking for? Add it by typing it.'
                                )
                            }
                            data-testid = 'ProductPopup__input-projects'
                        />
                    )}
                    filterOptions = {(options, params) => {
                        const filtered = filter(options, params)

                        params.inputValue !== '' &&
                filtered.length === 0 &&
                filtered.push({
                    id: -1,
                    name: `Add "${params.inputValue}"`,
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
    id: null
}

export default ProductPopup
