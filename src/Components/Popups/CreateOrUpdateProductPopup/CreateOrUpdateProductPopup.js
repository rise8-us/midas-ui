import { Box, TextField } from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestCreateProduct, requestUpdateProduct } from '../../../Redux/Products/actions'
import ProductConstants from '../../../Redux/Products/constants'
import { selectProductById } from '../../../Redux/Products/selectors'
import { requestCreateProject } from '../../../Redux/Projects/actions'
import { selectNoAppIdProjects } from '../../../Redux/Projects/selectors'
import { Popup } from '../../Popup'
import { TagDropdown } from '../../TagDropdown'

const filter = createFilterOptions()

function CreateOrUpdateProductPopup({ id }) {
    const dispatch = useDispatch()

    const availableProjects = useSelector(selectNoAppIdProjects)
    const product = useSelector(state => selectProductById(state, id))

    const isCreate = product.id === undefined
    const popupTitle = isCreate ? 'Create Product' : 'Update Product'
    const productConstant = isCreate ? ProductConstants.CREATE_PRODUCT : ProductConstants.UPDATE_PRODUCT
    const productRequest = (data) => isCreate ? requestCreateProduct(data) : requestUpdateProduct(data)

    const errors = useSelector(state => selectRequestErrors(state, productConstant))

    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [tags, setTags] = useState(product.tags)
    const [projects, setProjects] = useState(product.projects)

    const [nameError, setNameError] = useState([])
    const [tagsError, setTagsError] = useState([])
    const [projectsError, setProjectsError] = useState([])

    const onNameChange = (e) => setName(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)
    const onTagsChange = (value) => setTags(value)

    const onSelectProjects = (_e, values) => {
        const newProject = values.filter(o => o.id === -1)

        if (newProject.length > 0) {
            const newName = newProject[0].name.split('"')[1]
            let newValues = values.filter(o => o.id !== -1)

            dispatch(requestCreateProject({
                name: newName,
                productId: product.id,
                tagIds: []
            })).then(unwrapResult)
                .then(results => {
                    newValues.push(results)
                    setProjects(newValues)
                })
                .catch(rejectedValueOrSerializedError => setProjectsError([rejectedValueOrSerializedError]))
        } else {
            setProjects(values)
        }
    }

    const onClose = () => dispatch(closePopup(productConstant))

    const onSubmit = () => {
        dispatch(productRequest({
            ...product,
            name,
            description,
            tagIds: Object.values(tags.map(t => t.id)),
            projectIds: Object.values(projects.map(p => p.id)),
        }))
    }

    useEffect(() => {
        if (errors.length > 0) {
            setNameError(errors.filter(error => error.includes('name')))
            setTagsError(errors.filter(error => error.includes('Tag')))
        }
    }, [errors])

    return (
        <Popup
            title = {popupTitle}
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Product Name'
                    data-testid = 'CreateOrUpdateProductPopup__input-name'
                    value = {name}
                    onChange = {onNameChange}
                    error = { nameError.length > 0 }
                    helperText = { nameError[0] ?? '' }
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Description'
                    data-testid = 'CreateOrUpdateProductPopup__input-description'
                    value = {description}
                    onChange = {onDescriptionChange}
                    margin = 'dense'
                    multiline
                />
                <TagDropdown
                    defaultTags = {tags}
                    error = {tagsError}
                    onChange = {onTagsChange}
                />
                <Autocomplete
                    multiple
                    autoSelect
                    options = {availableProjects}
                    getOptionLabel = {(option) => option.name}
                    getOptionSelected = {(option, value) => option.id === value.id}
                    onChange = {onSelectProjects}
                    value = {projects}
                    ChipProps = {{ variant: 'outlined' }}
                    renderInput = {(params) =>
                        <TextField
                            {...params}
                            label = 'Add Project(s)'
                            margin = 'dense'
                            error = {projectsError.length > 0}
                            helperText = {projectsError[0] ?? ''}
                            data-testid = 'CreateOrUpdateProductPopup__input-projects'
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

CreateOrUpdateProductPopup.propTypes = {
    id: PropTypes.number
}

CreateOrUpdateProductPopup.defaultProps = {
    id: 1
}

export default CreateOrUpdateProductPopup