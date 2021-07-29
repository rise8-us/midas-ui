import { IconButton, makeStyles } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TagDropdown } from '../../Components/TagDropdown'
import { selectRequestErrors } from '../../Redux/Errors/selectors'
import { openPopup } from '../../Redux/Popups/actions'
import { requestUpdateProduct } from '../../Redux/Products/actions'
import ProductConstants from '../../Redux/Products/constants'
import { selectProductById } from '../../Redux/Products/selectors'
import { AutoSaveTextField } from '../AutoSaveTextField'

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    h4: {
        ...theme.typography.h4,
        color: theme.palette.text.secondary,
    },
    h6: {
        ...theme.typography.h6,
        color: theme.palette.text.secondary,
    },
    icon: {
        height: 42
    }
}))

function ProductHeader({ id }) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const product = useSelector(state => selectProductById(state, id))

    const errors = useSelector(state => selectRequestErrors(state, ProductConstants.UPDATE_PRODUCT))
    const nameErrors = useMemo(() => errors.filter(error => error.includes('Name')), [errors])

    const submitUpdate = (updatedProduct) => {
        dispatch(requestUpdateProduct({
            ...updatedProduct,
            childIds: [],
            tagIds: Object.values(product.tags.map(t => t.id))
        }))
    }

    const onDescriptionSave = (newValue) => {
        submitUpdate({
            ...product,
            description: newValue
        })
    }

    const onNameSave = (newValue) => {
        submitUpdate({
            ...product,
            name: newValue
        })
    }

    const openUpdateProductPopup = () =>
        dispatch(openPopup(ProductConstants.UPDATE_PRODUCT, 'CreateOrUpdateProductPopup', { id }))

    return (
        <>
            <div className = {classes.row}>
                <AutoSaveTextField
                    initialValue = {product.name}
                    onSave = {onNameSave}
                    className = {classes.h4}
                    errors = {nameErrors}
                    dataTestId = 'ProductHeader__input-name'
                />
                <IconButton
                    className = {classes.icon}
                    data-testid = 'ProductHeader__icon-action'
                    onClick = {openUpdateProductPopup}
                    color = 'secondary'
                >
                    <Edit />
                </IconButton>
            </div>
            <div className = {classes.row}>
                <AutoSaveTextField
                    initialValue = {product.description}
                    onSave = {onDescriptionSave}
                    placeholder = 'Description not set...'
                    className = {classes.h6}
                    errors = {[]}
                    multiline
                    fullWidth
                    enableSpellCheck
                    dataTestId = 'ProductHeader__input-description'
                />
            </div>
            <div className = {classes.row} >
                <TagDropdown
                    defaultTags = {product.tags}
                    error = {[]}
                    disabled = {true}
                    disableClearable = {true}
                    disableUnderline = {true}
                    type = {['ALL', 'PRODUCT']}
                    creatable
                    creatableType = 'PRODUCT'
                />
            </div>
        </>
    )
}

ProductHeader.propTypes = {
    id: PropTypes.number.isRequired
}

export default ProductHeader