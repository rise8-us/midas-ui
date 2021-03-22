import { Box, makeStyles, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestUpdateProduct } from '../../../Redux/Products/actions'
import ProductConstants from '../../../Redux/Products/constants'
import { getProductById } from '../../../Redux/Products/selectors'
import Popup from '../../Popup/Popup'

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

    const updateProduct = useSelector(state => getProductById(state, id))
    const errors = useSelector(state => selectRequestErrors(state, ProductConstants.UPDATE_PRODUCT))

    const [name, setName] = useState('')
    const [gitlabProjectId, setGitlabProjectId] = useState('')
    const [description, setDescription] = useState('')
    const [nameError, setNameError] = useState([])
    const [gitlabError, setGitlabError] = useState([])

    const onNameChange = (e) => setName(e.target.value)
    const onGitlabProjectIdChange = (e) => setGitlabProjectId(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)

    const onClose = () => {
        dispatch(closePopup(ProductConstants.UPDATE_PRODUCT))
    }

    const onSubmit = () => {
        dispatch(requestUpdateProduct({
            ...updateProduct,
            name,
            gitlabProjectId,
            description
        }))
    }

    useEffect(() => {
        setName(updateProduct.name)
        setGitlabProjectId(updateProduct.gitlabProjectId)
        setDescription(updateProduct.description)
    }, [updateProduct])

    useEffect(() => {
        if (errors.length > 0) {
            setNameError(errors.filter(error => error.includes('name')))
            setGitlabError(errors.filter(error => error.includes('Gitlab')))
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
            </Box>
        </Popup>
    )
}

UpdateProductPopup.propTypes = {
    id: PropTypes.number.isRequired
}

export default UpdateProductPopup