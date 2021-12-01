import { Grid, Typography } from '@mui/material'
import {
    ProductDevelopment, ProductEpicsRoadmap, ProductRoadmap, ProductUserPersonas
} from 'Components/ProductOnePager'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectProductById } from 'Redux/Products/selectors'

const RoadmapType = ({ type, ...componentProps }) => ({
    MANUAL: <ProductRoadmap {...componentProps}/>,
    GITLAB: <ProductEpicsRoadmap {...componentProps}/>,
}[type])

RoadmapType.propTypes = { type: PropTypes.oneOf(['MANUAL', 'GITLAB']).isRequired }

export default function ProductPageOverview({ id, hasEdit }) {

    const product = useSelector(state => selectProductById(state, id))

    if (product.roadmapType === undefined) return null

    return (
        <Grid container direction = 'row'>
            <Grid item xl = {8} lg = {8} md = {8}>
                <RoadmapType type = {product.roadmapType} productId = {id} hasEdit = {hasEdit} />
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