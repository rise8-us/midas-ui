import { Box, makeStyles, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestCreateProduct } from '../../../Redux/Products/actions'
import ProductConstants from '../../../Redux/Products/constants'
import Popup from '../../Popup/Popup'

const useStyles = makeStyles(() => ({
    textField: {
        '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            display: 'none'
        }
    }
}))

function CreateProductPopup() {
    const dispatch = useDispatch()
    const classes = useStyles()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [gitlabProjectId, setGitlabProjectId] = useState('')

    const onNameChange = (e) => setName(e.target.value)
    const onGitlabProjectIdChange = (e) => setGitlabProjectId(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)

    const onClose = () => {
        dispatch(closePopup(ProductConstants.CREATE_PRODUCT))
    }

    const onSubmit = () => {
        dispatch(requestCreateProduct({
            name,
            gitlabProjectId,
            description
        }))
    }

    return (
        <Popup
            title = 'Create New Product'
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' style = {{ flexDirection: 'column' }}>
                <TextField
                    label = 'Product Name'
                    data-testid = 'CreateProductPopup__input-name'
                    value = {name}
                    onChange = {onNameChange}
                    margin = 'dense'
                    required
                />
                <TextField
                    className = {classes.textField}
                    label = 'Gitlab Project Id'
                    type = 'number'
                    data-testid = 'CreateProductPopup__input-gitlabProjectId'
                    inputProps = {{ className: 'digitsOnly' }}
                    value = {gitlabProjectId}
                    onChange = {onGitlabProjectIdChange}
                    margin = 'dense'
                />
                <TextField
                    label = 'Description'
                    data-testid = 'CreateProductPopup__input-description'
                    value = {description}
                    onChange = {onDescriptionChange}
                    margin = 'dense'
                    multiline
                />
            </Box>
        </Popup>
    )
}

export default CreateProductPopup