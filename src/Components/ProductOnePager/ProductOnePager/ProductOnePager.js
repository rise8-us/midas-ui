import { Grid } from '@material-ui/core'
import { ProductDetails } from 'Components/ProductOnePager/ProductDetails'
import { ProductHeader } from 'Components/ProductOnePager/ProductHeader'
import { ProductRoadmap } from 'Components/ProductOnePager/ProductRoadmap'
import { ProductUserPersonas } from 'Components/ProductOnePager/ProductUserPersonas'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { requestFetchPersonasByProductId } from 'Redux/Personas/actions'
import { requestFetchRoadmapsByProductId } from 'Redux/Roadmaps/actions'

function ProductOnePager({ id }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestFetchPersonasByProductId(id))
        dispatch(requestFetchRoadmapsByProductId(id))
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
                    <ProductDetails hasEdit = {false} productId = {id}/>
                </Grid>
            </Grid>
            <Grid container item direction = 'column' lg md>
                <Grid item>
                    <ProductRoadmap productId = {id} hasEditAccess = {false}/>
                </Grid>
            </Grid>
            <Grid container item direction = 'column' lg = {3} md = {3}>
                <Grid item style = {{ display: 'none' }}>
                    <div>Deliverables</div>
                </Grid>
                <Grid item>
                    <ProductUserPersonas productId = {id} hasEditAccess = {false} />
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