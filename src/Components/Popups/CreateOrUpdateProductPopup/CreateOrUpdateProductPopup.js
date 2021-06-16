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

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Product' : 'Update Product',
        constant: create ? ProductConstants.CREATE_PRODUCT : ProductConstants.UPDATE_PRODUCT,
        request: (data) => create ? requestCreateProduct(data) : requestUpdateProduct(data)
    }
}

const searchErrors = (errors, searchString) => errors.filter(error => error.includes(searchString))

function CreateOrUpdateProductPopup({ id }) {
    const dispatch = useDispatch()

    const noAppIdProjects = useSelector(selectNoAppIdProjects)
    const product = useSelector(state => selectProductById(state, id))

    const context = initDetails(product.id === undefined)

    const errors = useSelector(state => selectRequestErrors(state, context.constant))

    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [tags, setTags] = useState(product.tags)
    const [projects, setProjects] = useState(product.projects)
    const [productManager, setProductManager] = useState()
    const [availableProjects, setAvailableProjects] = useState(noAppIdProjects)

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
                    setAvailableProjects([...availableProjects, results])
                    setProjects(newValues)
                })
        } else {
            setProjects(values)
        }
    }

    const onClose = () => dispatch(closePopup(context.constant))

    const onSubmit = () => {
        const productManagerId = productManager?.id ?? null

        dispatch(context.request({
            ...product,
            name,
            description,
            productManagerId,
            tagIds: Object.values(tags.map(t => t.id)),
            projectIds: Object.values(projects.map(p => p.id)),
        }))
    }

    useEffect(() => {
        product.projects.forEach(project => {
            let totalProjects = [...noAppIdProjects]
            totalProjects.push(project)
            setAvailableProjects(totalProjects)
        })
    }, [])

    useEffect(() => {
        dispatch(requestFindUserBy(`id:${product?.productManagerId}`))
            .then(unwrapResult)
            .then(data => {
                setProductManager(data[0])
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
                        'data-testid': 'CreateOrUpdateProductPopup__input-name'
                    }}
                    value = {name}
                    onChange = {onNameChange}
                    error = {searchErrors(errors, 'name').length > 0}
                    helperText = {<FormatErrors errors = {searchErrors(errors, 'name')}/>}
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Description'
                    placeholder = {`What's the purpose of ${name ?? 'this product'}?`}
                    inputProps = {{
                        'data-testid': 'CreateOrUpdateProductPopup__input-description'
                    }}
                    value = {description}
                    onChange = {onDescriptionChange}
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
                    error = {searchErrors(errors, 'Tag')}
                    deletable
                    onChange = {onTagsChange}
                    label = 'Tag(s)'
                    type = {['ALL', 'PROJECT']}
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
