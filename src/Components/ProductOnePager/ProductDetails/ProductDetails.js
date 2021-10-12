import { Grid, makeStyles } from '@material-ui/core'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestUpdateProduct } from 'Redux/Products/actions'
import { selectProductById } from 'Redux/Products/selectors'

const defaultValue = (field) => {
    return `Oh no! It looks like this product does not have a ${field}. Someone should fix that.`
}

const useStyles = makeStyles((theme) => ({
    inputLabel: {
        color: theme.palette.text.primary,
        ...theme.typography.h6
    },
    input: {
        color: theme.palette.text.secondary,
        paddingTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    }
}))

function ProductDetails({ productId, hasEdit }) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const product = useSelector(state => selectProductById(state, productId))

    const dispatchUpdateProduct = (field, value) => {
        dispatch(requestUpdateProduct({
            ...product,
            childIds: [],
            [field]: value
        }))
    }

    return (
        <Grid container direction = 'column'>
            <Grid item>
                <AutoSaveTextField
                    label = 'OUR VISION'
                    initialValue = {product.vision ?? defaultValue('Vision Statement')}
                    canEdit = {hasEdit}
                    onSave = {(e) => dispatchUpdateProduct('vision', e)}
                    InputLabelProps = {{
                        className: classes.inputLabel
                    }}
                    className = {classes.input}
                    tooltip = {Tooltips.PRODUCT_VISION}
                    enableSpellCheck
                    fullWidth
                    multiline
                />
            </Grid>
            <Grid item>
                <AutoSaveTextField
                    label = 'OUR MISSION'
                    initialValue = {product.mission ?? defaultValue('Mission Statement')}
                    canEdit = {hasEdit}
                    onSave = {(e) => dispatchUpdateProduct('mission', e)}
                    InputLabelProps = {{
                        className: classes.inputLabel
                    }}
                    className = {classes.input}
                    tooltip = {Tooltips.PRODUCT_MISSION}
                    enableSpellCheck
                    fullWidth
                    multiline
                />
            </Grid>
            <Grid item>
                <AutoSaveTextField
                    label = 'PROBLEM STATEMENT'
                    initialValue = {product.problemStatement ?? defaultValue('Problem Statement')}
                    canEdit = {hasEdit}
                    onSave = {(e) => dispatchUpdateProduct('problemStatement', e)}
                    InputLabelProps = {{
                        className: classes.inputLabel
                    }}
                    className = {classes.input}
                    tooltip = {Tooltips.PRODUCT_PROBLEM_STATEMENT}
                    enableSpellCheck
                    fullWidth
                    multiline
                />
            </Grid>
        </Grid>
    )
}

ProductDetails.propTypes = {
    productId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool,
}

ProductDetails.defaultProps = {
    hasEdit: false
}

export default ProductDetails