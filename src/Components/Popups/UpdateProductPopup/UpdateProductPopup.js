import { Box, makeStyles, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestUpdateProduct } from '../../../Redux/Products/actions'
import ProductConstants from '../../../Redux/Products/constants'
import { getProductById } from '../../../Redux/Products/selectors'
import { selectAllTags } from '../../../Redux/Tags/selectors'
import { Popup } from '../../Popup'
import { Tag } from '../../Tag'

const useStyles = makeStyles(() => ({
    textField: {
        '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            display: 'none'
        }
    }
}))

function UpdateProductPopup({ id }) {
    const dispatch = useDispatch()
    const classes = useStyles()

    const product = useSelector(state => getProductById(state, id))
    const errors = useSelector(state => selectRequestErrors(state, ProductConstants.UPDATE_PRODUCT))

    const allTags = useSelector(selectAllTags)

    const [name, setName] = useState(product.name)
    const [gitlabProjectId, setGitlabProjectId] = useState(product.gitlabProjectId)
    const [description, setDescription] = useState(product.description)
    const [tags, setTags] = useState(product.tags)
    const [nameError, setNameError] = useState([])
    const [gitlabError, setGitlabError] = useState([])
    const [tagsError, setTagsError] = useState([])

    const onNameChange = (e) => setName(e.target.value)
    const onGitlabProjectIdChange = (e) => setGitlabProjectId(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)
    const onSelectTag = (_e, values) => {
        const selectedValue = String(values[values.length - 1].label).split('::')
        const existingTag = values.filter(tag =>
            selectedValue.length === 2 &&
            tag.label.includes(selectedValue[0], 0) &&
            !tag.label.includes(selectedValue[1])
        )

        if (existingTag.length === 0) setTags(values)
        else setTags(values.filter(tag => !tag.label.includes(existingTag[0].label)))
    }

    const onClose = () => dispatch(closePopup(ProductConstants.UPDATE_PRODUCT))

    const onSubmit = () =>
        dispatch(requestUpdateProduct({
            ...product,
            name,
            gitlabProjectId,
            description,
            tagIds: Object.values(tags.map(t => t.id))
        }))

    useEffect(() => {
        if (errors.length > 0) {
            setNameError(errors.filter(error => error.includes('name')))
            setGitlabError(errors.filter(error => error.includes('Gitlab')))
            setTagsError(errors.filter(error => error.includes('Tag')))
        }
    }, [errors])

    return (
        <Popup
            title = 'Update Product'
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' style = {{ flexDirection: 'column' }}>
                <TextField
                    label = 'Product Name'
                    data-testid = 'UpdateProductPopup__input-name'
                    value = {name}
                    onChange = {onNameChange}
                    error = { nameError.length > 0 }
                    helperText = { nameError[0] ?? '' }
                    margin = 'dense'
                    required
                />
                <TextField
                    className = {classes.textField}
                    label = 'Gitlab Project Id'
                    type = 'number'
                    data-testid = 'UpdateProductPopup__input-gitlabProjectId'
                    inputProps = {{ className: 'digitsOnly' }}
                    value = {gitlabProjectId}
                    onChange = {onGitlabProjectIdChange}
                    error = { gitlabError.length > 0 }
                    helperText = { gitlabError[0] ?? '' }
                    margin = 'dense'
                />
                <TextField
                    label = 'Description'
                    data-testid = 'UpdateProductPopup__input-description'
                    value = {description}
                    onChange = {onDescriptionChange}
                    margin = 'dense'
                    multiline
                />
                <Autocomplete
                    multiple
                    options = {allTags}
                    getOptionLabel = {(option) => option.label}
                    getOptionSelected = {(option, value) => option.id === value.id}
                    onChange = {onSelectTag}
                    value = {tags}
                    defaultValue = {tags}
                    renderTags = {(value) => value.map((tag, index) => <Tag key = {index} {...tag} />)}
                    renderInput = {(params) =>
                        <TextField
                            {...params}
                            label = 'Add Tag(s)'
                            margin = 'dense'
                            error = { tagsError.length > 0 }
                            helperText = { tagsError[0] ?? ''}
                        />
                    }
                />
            </Box>
        </Popup>
    )
}

UpdateProductPopup.propTypes = {
    id: PropTypes.number.isRequired
}

export default UpdateProductPopup