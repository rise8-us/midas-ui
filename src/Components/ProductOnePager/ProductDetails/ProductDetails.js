import { Grid } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from 'Redux/Errors/selectors'
import { requestUpdateProduct } from 'Redux/Products/actions'
import ProductConstants from 'Redux/Products/constants'
import { selectProductById } from 'Redux/Products/selectors'
import { styled } from 'Styles/materialThemes'

const AutoSaveTextFieldStyled = styled(AutoSaveTextField)(({ theme }) => ({
    color: theme.palette.text.secondary
}))

const defaultValue = (value) => {
    return value ? value : tooltips.PRODUCT_DETAILS_EMPTY
}

function ProductDetails({ productId, hasEdit }) {
    const dispatch = useDispatch()

    const product = useSelector(state => selectProductById(state, productId))
    const errors = useSelector((state) => selectRequestErrors(state, ProductConstants.UPDATE_PRODUCT))

    const dispatchUpdateProduct = (field, value) => {
        dispatch(requestUpdateProduct({
            ...product,
            childIds: [],
            [field]: value
        }))
    }

    return (
        <Grid container direction = 'column' spacing = {2}>
            <Grid item marginTop = {1}>
                <AutoSaveTextFieldStyled
                    label = 'CORE DOMAIN'
                    dataTestId = 'ProductDetails-core-domain'
                    initialValue = {defaultValue(product.coreDomain)}
                    canEdit = {hasEdit}
                    onSave = {(e) => dispatchUpdateProduct('coreDomain', e)}
                    placeholder = 'Type of data the app is the system of record for.'
                    tooltip = {tooltips.PRODUCT_CORE_DOMAIN}
                    enableSpellCheck
                    fullWidth
                    multiline
                    errors = {errors}
                    InputLabelProps = {{
                        shrink: true
                    }}
                />
            </Grid>
            <Grid item>
                <AutoSaveTextFieldStyled
                    label = 'OUR VISION'
                    data-testid = 'ProductDetails__vision-statement'
                    initialValue = {defaultValue(product.vision)}
                    canEdit = {hasEdit}
                    onSave = {(e) => dispatchUpdateProduct('vision', e)}
                    placeholder = 'End goal for this product.'
                    tooltip = {tooltips.PRODUCT_VISION}
                    enableSpellCheck
                    fullWidth
                    multiline
                    InputLabelProps = {{
                        shrink: true
                    }}
                />
            </Grid>
            <Grid item>
                <AutoSaveTextFieldStyled
                    label = 'OUR MISSION'
                    data-testid = 'ProductDetails__mission-statement'
                    initialValue = {defaultValue(product.mission)}
                    canEdit = {hasEdit}
                    onSave = {(e) => dispatchUpdateProduct('mission', e)}
                    placeholder = 'Near term goal that supports the vision.'
                    tooltip = {tooltips.PRODUCT_MISSION}
                    enableSpellCheck
                    fullWidth
                    multiline
                    InputLabelProps = {{
                        shrink: true
                    }}
                />
            </Grid>
            <Grid item>
                <AutoSaveTextFieldStyled
                    label = 'PROBLEM STATEMENT'
                    data-testid = 'ProductDetails__problem-statement'
                    initialValue = {defaultValue(product.problemStatement)}
                    canEdit = {hasEdit}
                    onSave = {(e) => dispatchUpdateProduct('problemStatement', e)}
                    placeholder = 'What problem does this product aim to fix/improve upon.'
                    tooltip = {tooltips.PRODUCT_PROBLEM_STATEMENT}
                    enableSpellCheck
                    fullWidth
                    multiline
                    InputLabelProps = {{
                        shrink: true
                    }}
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