import { Grid } from '@material-ui/core'
import { ProductRoadmap } from 'Components/ProductOnePager/ProductRoadmap'
import { ProductUserPersonas } from 'Components/ProductOnePager/ProductUserPersonas'
import PropTypes from 'prop-types'
import React from 'react'

function ProductPageOverview({ id, hasEdit }) {
    return (
        <Grid container direction = 'row'>
            <Grid item xl = {9} lg = {9} md = {9}>
                <ProductRoadmap productId = {id} hasEditAccess = {hasEdit} />
            </Grid>
            <Grid container item direction = 'column' xl = {3} lg = {3} md = {3}>
                <Grid item>
                    <ProductUserPersonas productId = {id} hasEditAccess = {hasEdit} />
                </Grid>
            </Grid>
        </Grid>
    )
}

ProductPageOverview.propTypes = {
    id: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool
}

ProductPageOverview.defaultProps = {
    hasEdit: false
}

export default ProductPageOverview