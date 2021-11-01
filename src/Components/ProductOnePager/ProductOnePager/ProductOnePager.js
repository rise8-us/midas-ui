import { Grid } from '@mui/material'
import { ProductDetails, ProductEpicsRoadmap, ProductHeader, ProductUserPersonas } from 'Components/ProductOnePager'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { requestFetchEpicsByProductId } from 'Redux/Epics/actions'
import { requestFetchPersonasByProductId } from 'Redux/Personas/actions'
import { requestFetchRoadmapsByProductId } from 'Redux/Roadmaps/actions'

function ProductOnePager({ id }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestFetchPersonasByProductId(id))
        dispatch(requestFetchRoadmapsByProductId(id))
        dispatch(requestFetchEpicsByProductId(id))
    }, [])

    return (
        <Grid container wrap = 'wrap' spacing = {6} style = {{ overflowX: 'hidden' }}>
            <Grid container item direction = 'column' lg = {3} md = {3}>
                <Grid
                    container
                    item
                    direction = 'column'
                    style = {{  marginBottom: '16px' }}
                >
                    <ProductHeader id = {id} readOnly />
                </Grid>
                <Grid item style = {{ display: 'none' }}>
                    <div>Team Info (User&aposs name & role)</div>
                </Grid>
                <Grid item>
                    <ProductDetails productId = {id} hasEdit = {false}/>
                </Grid>
            </Grid>
            <Grid container item direction = 'column' lg md>
                <Grid item>
                    <ProductEpicsRoadmap productId = {id} hasEdit = {false}/>
                </Grid>
            </Grid>
            <Grid container item direction = 'column' lg = {3} md = {3}>
                <Grid item style = {{ display: 'none' }}>
                    <div>Deliverables</div>
                </Grid>
                <Grid item>
                    <ProductUserPersonas productId = {id} hasEdit = {false}/>
                </Grid>
                <Grid item style = {{ display: 'none' }}>
                    <div>Development</div>
                </Grid>
            </Grid>
        </Grid>
    )
}

ProductOnePager.propTypes = {
    id: PropTypes.number.isRequired
}

export default ProductOnePager