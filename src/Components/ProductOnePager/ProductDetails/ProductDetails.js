import { Grid, makeStyles } from '@material-ui/core'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestUpdateProduct } from 'Redux/Products/actions'
import { selectProductById } from 'Redux/Products/selectors'

const defaultValue = (value) => {
    return value ? value : tooltips.PRODUCT_DETAILS_EMPTY
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
                    initialValue = {defaultValue(product.vision)}
                    canEdit = {hasEdit}
                    onSave = {(e) => dispatchUpdateProduct('vision', e)}
                    InputLabelProps = {{
                        className: classes.inputLabel
                    }}
                    className = {classes.input}
                    tooltip = {tooltips.PRODUCT_VISION}
                    enableSpellCheck
                    fullWidth
                    multiline
                />
            </Grid>
            <Grid item>
                <AutoSaveTextField
                    label = 'OUR MISSION'
                    initialValue = {defaultValue(product.mission)}
                    canEdit = {hasEdit}
                    onSave = {(e) => dispatchUpdateProduct('mission', e)}
                    InputLabelProps = {{
                        className: classes.inputLabel
                    }}
                    className = {classes.input}
                    tooltip = {tooltips.PRODUCT_MISSION}
                    enableSpellCheck
                    fullWidth
                    multiline
                />
            </Grid>
            <Grid item>
                <AutoSaveTextField
                    label = 'PROBLEM STATEMENT'
                    initialValue = {defaultValue(product.problemStatement)}
                    canEdit = {hasEdit}
                    onSave = {(e) => dispatchUpdateProduct('problemStatement', e)}
                    InputLabelProps = {{
                        className: classes.inputLabel
                    }}
                    className = {classes.input}
                    tooltip = {tooltips.PRODUCT_PROBLEM_STATEMENT}
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