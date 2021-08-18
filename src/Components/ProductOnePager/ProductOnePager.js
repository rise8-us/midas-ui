import { Grid } from '@material-ui/core'
import { ProductDetails } from 'Components/ProductDetails'
import { ProductHeader } from 'Components/ProductHeader'
import { ProductUserPersonas } from 'Components/ProductUserPersonas'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hasProductOrTeamAccess } from 'Redux/Auth/selectors'
import { requestUpdateProduct } from 'Redux/Products/actions'
import { selectProductById } from 'Redux/Products/selectors'

function ProductOnePager({ id, readOnly, excludeHeader }) {
    const dispatch = useDispatch()

    const product = useSelector(state => selectProductById(state, id))
    const hasEditAccess = useSelector(state => hasProductOrTeamAccess(state, product.id)) && !readOnly

    const dispatchUpdateProduct = (field, value) => {
        dispatch(requestUpdateProduct({
            ...product,
            childIds: [],
            [field]: value
        }))
    }

    return (
        <Grid container direction = 'row' wrap = 'wrap' >
            <Grid container item direction = 'column' lg md>
                {!excludeHeader &&
                    <Grid
                        container
                        item
                        direction = 'column'
                        style = {{  marginBottom: '16px' }}
                    >
                        <ProductHeader id = {id} readOnly />
                    </Grid>
                }
                <Grid item style = {{ display: 'none' }}>
                    <div>Team Info (User&aposs name & role)</div>
                </Grid>
                <Grid item>
                    <ProductDetails
                        hasEditAccess = {hasEditAccess}
                        missionStatement = {product.mission}
                        problemStatement = {product.problemStatement}
                        visionStatement = {product.vision}
                        onFieldUpdated = {dispatchUpdateProduct}
                    />
                </Grid>
            </Grid>
            <Grid container item direction = 'column' lg md>
                <Grid item style = {{ display: 'none' }}>
                    <div>Roadmap</div>
                </Grid>
            </Grid>
            <Grid container item direction = 'column' lg md>
                <Grid item style = {{ display: 'none' }}>
                    <div>Deliverables</div>
                </Grid>
                <Grid item>
                    <ProductUserPersonas productId = {id} hasEditAccess = {hasEditAccess} />
                </Grid>
                <Grid item style = {{ display: 'none' }}>
                    <div>Development</div>
                </Grid>
            </Grid>
        </Grid>
    )
}

ProductOnePager.propTypes = {
    id: PropTypes.number.isRequired,
    readOnly: PropTypes.bool,
    excludeHeader: PropTypes.bool
}

ProductOnePager.defaultProps = {
    readOnly: false,
    excludeHeader: false
}

export default ProductOnePager