import { Chip, makeStyles } from '@material-ui/core'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from 'Redux/Errors/selectors'
import { requestUpdateProduct } from 'Redux/Products/actions'
import ProductConstants from 'Redux/Products/constants'
import { selectProductById } from 'Redux/Products/selectors'

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    h2: {
        ...theme.typography.h3,
        color: theme.palette.text.primary,
    },
    subtitle1: {
        ...theme.typography.subtitle1,
        color: theme.palette.text.secondary,
    },
    tags: {
        display: 'flex',
        '&:first-child': {
            marginLeft: 0
        }
    }
}))

function ProductHeader({ id, hasEdit }) {
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

    return (
        <>
            <div className = {classes.row}>
                <AutoSaveTextField
                    initialValue = {product.name}
                    onSave = {onNameSave}
                    className = {classes.h2}
                    errors = {nameErrors}
                    style = {{ height: '48px' }}
                    dataTestId = 'ProductHeader__input-name'
                    canEdit = {hasEdit}
                />
            </div>
            <div className = {classes.row}>
                <AutoSaveTextField
                    initialValue = {product.description}
                    onSave = {onDescriptionSave}
                    placeholder = 'Description not set...'
                    className = {classes.subtitle1}
                    errors = {[]}
                    multiline
                    fullWidth
                    enableSpellCheck
                    dataTestId = 'ProductHeader__input-description'
                    canEdit = {hasEdit}
                />
            </div>
            <div className = {classes.tags} >
                {product.tags.map((tag, index) =>
                    <Chip
                        key = {index}
                        label = {tag.label.replace('::', ' | ').toUpperCase()}
                        style = {{
                            borderColor: tag.color,
                            margin: '4px'
                        }}
                        size = 'small'
                        variant = 'outlined'
                    />
                )}
            </div>
        </>
    )
}

ProductHeader.propTypes = {
    id: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool
}

ProductHeader.defaultProps = {
    hasEdit: false
}

export default ProductHeader