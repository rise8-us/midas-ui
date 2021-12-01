import { Chip, Grid } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from 'Redux/Errors/selectors'
import { requestUpdateProduct } from 'Redux/Products/actions'
import ProductConstants from 'Redux/Products/constants'
import { selectProductById } from 'Redux/Products/selectors'
import { styled } from 'Styles/materialThemes'

const StyledHeader = styled(AutoSaveTextField)(({ theme }) => ({
    ...theme.typography.h3
}))

const StyledSubheader = styled(AutoSaveTextField)(({ theme }) => ({
    ...theme.typography.subtitle1,
    color: theme.palette.text.secondary
}))

function ProductHeader({ id, hasEdit }) {
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
        <Grid container direction = 'column'>
            <Grid item>
                <StyledHeader
                    initialValue = {product.name}
                    onSave = {onNameSave}
                    errors = {nameErrors}
                    fullWidth
                    style = {{ height: '56px', marginBottom: '16px' }}
                    dataTestId = 'ProductHeader__input-name'
                    canEdit = {hasEdit}
                    inputProps = {{
                        style: {
                            textOverflow: 'ellipsis'
                        }
                    }}
                />
            </Grid>
            <Grid>
                <StyledSubheader
                    initialValue = {product.description}
                    onSave = {onDescriptionSave}
                    placeholder = {hasEdit ? 'App name an acronym? Spell it out here.' : ''}
                    errors = {[]}
                    multiline
                    fullWidth
                    enableSpellCheck
                    dataTestId = 'ProductHeader__input-description'
                    canEdit = {hasEdit}
                />
            </Grid>
            <Grid style = {{ display: 'flex', flexWrap: 'wrap' }}>
                {product.tags.map((tag, index) =>
                    <Chip
                        key = {index}
                        label = {tag.label.replace('::', ' | ').toUpperCase()}
                        style = {{
                            borderColor: tag.color,
                            margin: '3px 6px 3px 0px'
                        }}
                        size = 'small'
                        variant = 'outlined'
                    />
                )}
            </Grid>
        </Grid>
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