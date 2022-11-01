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
import { LabelTooltip } from '../../LabelTooltip'

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

    const items = [
        {
            label: 'CORE DOMAIN',
            tooltip: tooltips.PRODUCT_CORE_DOMAIN,
            initial: defaultValue(product.coreDomain),
            dispatchId: 'coreDomain',
            placeholder: 'Type of data the app is the system of record for.'
        },
        {
            label: 'OUR VISION',
            tooltip: tooltips.PRODUCT_VISION,
            initial: defaultValue(product.vision),
            dispatchId: 'vision',
            placeholder: 'End goal for this product.'
        },
        {
            label: 'OUR MISSION',
            tooltip: tooltips.PRODUCT_MISSION,
            initial: defaultValue(product.mission),
            dispatchId: 'mission',
            placeholder: 'Near term goal that supports the vision.'
        },
        {
            label: 'PROBLEM STATEMENT',
            tooltip: tooltips.PRODUCT_PROBLEM_STATEMENT,
            initial: defaultValue(product.problemStatement),
            dispatchId: 'problemStatement',
            placeholder: 'What problem does this product aim to fix/improve upon.'
        }
    ]

    return (
        <Grid container direction = 'column' spacing = {2}>
            {items.map((item, index) =>
                <Grid item marginTop = {index === 0 ? 1 : 0} key = {index}>
                    <LabelTooltip
                        text = {item.label}
                        typographyProps = {{
                            variant: 'body2',
                            color: 'text.primary',
                            fontWeight: 'bold'
                        }}
                        tooltipProps = {{
                            title: item.tooltip,
                            placement: 'bottom-start',
                            arrow: true
                        }}
                        iconFontSize = 'small'
                    />
                    <AutoSaveTextFieldStyled
                        dataTestId = {`ProductDetails__${ item.label.toLowerCase().replaceAll(' ', '-') }`}
                        initialValue = {item.initial}
                        canEdit = {hasEdit}
                        onSave = {(e) => dispatchUpdateProduct(item.dispatchId, e)}
                        placeholder = {item.placeholder}
                        enableSpellCheck
                        fullWidth
                        multiline
                        errors = {errors}
                        InputLabelProps = {{
                            shrink: true
                        }}
                    />
                </Grid>
            )}
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
