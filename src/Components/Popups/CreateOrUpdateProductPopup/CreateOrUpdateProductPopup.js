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
import { requestFindUserBy } from '../../../Redux/Users/actions'
import FormatErrors from '../../../Utilities/FormatErrors'
import { Popup } from '../../Popup'
import { SearchUsers } from '../../Search/SearchUsers'
import { TagDropdown } from '../../TagDropdown'

const filter = createFilterOptions()

function CreateOrUpdateProductPopup({ id }) {
    const dispatch = useDispatch()

    const noAppIdProjects = useSelector(selectNoAppIdProjects)
    const product = useSelector(state => selectProductById(state, id))

    const isCreate = product.id === undefined
    const popupTitle = isCreate ? 'Create Product' : 'Update Product'
    const productConstant = isCreate ? ProductConstants.CREATE_PRODUCT : ProductConstants.UPDATE_PRODUCT
    const productRequest = (data) => isCreate ? requestCreateProduct(data) : requestUpdateProduct(data)

    const errors = useSelector(state => selectRequestErrors(state, productConstant))

    const [name, setName] = useState(product.name)
    const [visionStatement, setVisionStatement] = useState(product.visionStatement)
    const [tags, setTags] = useState(product.tags)
    const [projects, setProjects] = useState(product.projects)
    const [productManager, setProductManager] = useState()
    const [availableProjects, setAvailableProjects] = useState(noAppIdProjects)

    const [nameError, setNameError] = useState([])
    const [tagsError, setTagsError] = useState([])
    const [projectsError, setProjectsError] = useState([])

    const onNameChange = (e) => setName(e.target.value)
    const onVisionChange = (e) => setVisionStatement(e.target.value)
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
                    setAvailableProjects([...availableProjects, results])
                    setProjects(newValues)
                })
                .catch(rejectedValueOrSerializedError => {
                    setProjectsError([rejectedValueOrSerializedError])
                })
        } else {
            setProjects(values)
        }
    }

    const onClose = () => dispatch(closePopup(productConstant))

    const onSubmit = () => {
        const productManagerId = productManager === undefined ? null : productManager.id

        dispatch(productRequest({
            ...product,
            name,
            visionStatement,
            productManagerId,
            tagIds: Object.values(tags.map(t => t.id)),
            projectIds: Object.values(projects.map(p => p.id)),
        }))
    }

    useEffect(() => {
        if (product.projects.length > 0) {
            let totalProjects = [...noAppIdProjects]
            product.projects.map(project => totalProjects.push(project))
            setAvailableProjects(totalProjects)
        }
    }, [])

    useEffect(() => {
        if (errors.length > 0) {
            setNameError(errors.filter(error => error.includes('name')))
            setTagsError(errors.filter(error => error.includes('Tag')))
            setProjectsError(errors.filter(error => error.includes('Project with')))
        }
    }, [errors])

    useEffect(() => {
        product.productManagerId && dispatch(requestFindUserBy(`id:${product.productManagerId}`))
            .then(unwrapResult)
            .then(data => {
                setProductManager(data[0])
            })
    }, [])

    return (
        <Popup
            title = {popupTitle}
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Product Name'
                    inputProps = {{
                        'data-testid': 'CreateOrUpdateProductPopup__input-name'
                    }}
                    value = {name}
                    onChange = {onNameChange}
                    error = { nameError.length > 0 }
                    helperText = {<FormatErrors errors = {nameError}/>}
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Vision'
                    inputProps = {{
                        'data-testid': 'CreateOrUpdateProductPopup__input-vision'
                    }}
                    value = {visionStatement}
                    onChange = {onVisionChange}
                    margin = 'dense'
                    multiline
                />
                <SearchUsers
                    onChange = {(_e, values) => setProductManager(values)}
                    title = 'Product Manager'
                    growFrom = '100%'
                    value = {productManager}
                    freeSolo = {true}
                />
                <TagDropdown
                    defaultTags = {tags}
                    error = {tagsError}
                    onChange = {onTagsChange}
                    label = 'Tag(s)'
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
                            label = 'Project(s)'
                            margin = 'dense'
                            error = {projectsError.length > 0}
                            helperText = {<FormatErrors errors = {projectsError}/>}
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
