import { Grid, Typography } from '@material-ui/core'
import { ProductDevelopment, ProductEpicsRoadmap, ProductUserPersonas } from 'Components/ProductOnePager'
import PropTypes from 'prop-types'
import React from 'react'

function ProductPageOverview({ id, hasEdit }) {
    return (
        <Grid container direction = 'row'>
            <Grid item xl = {8} lg = {8} md = {8}>
                <ProductEpicsRoadmap productId = {id} hasEdit = {hasEdit}/>
            </Grid>
            <Grid container item direction = 'column' xl = {4} lg = {4} md = {4} spacing = {2}>
                <Grid item>
                    <ProductUserPersonas productId = {id} hasEdit = {hasEdit}/>
                </Grid>
                <Grid container item direction = 'column' spacing = {1}>
                    <Grid item>
                        <Typography variant = 'h6'>DEVELOPMENT</Typography>
                    </Grid>
                    <Grid item>
                        <ProductDevelopment id = {id}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

ProductPageOverview.propTypes = {
    id: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired,
}

export default ProductPageOverview