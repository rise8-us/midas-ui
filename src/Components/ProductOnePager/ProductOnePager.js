import { Grid } from '@material-ui/core'
import { ProductDetails } from 'Components/ProductDetails'
import { ProductHeader } from 'Components/ProductHeader'
import { ProductRoadmap } from 'Components/ProductRoadmap'
import { ProductUserPersonas } from 'Components/ProductUserPersonas'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hasProductOrTeamAccess } from 'Redux/Auth/selectors'
import { requestFetchPersonasByProductId } from 'Redux/Personas/actions'
import { requestUpdateProduct } from 'Redux/Products/actions'
import { selectProductById } from 'Redux/Products/selectors'
import { requestFetchRoadmapsByProductId } from 'Redux/Roadmaps/actions'

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

    useEffect(() => {
        dispatch(requestFetchPersonasByProductId(id))
        dispatch(requestFetchRoadmapsByProductId(id))
    }, [])

    return (
        <Grid container wrap = 'wrap' spacing = {6} style = {{ overflowX: 'hidden' }}>
            <Grid container item direction = 'column' lg = {3} md = {3}>
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
                <Grid item>
                    <ProductRoadmap productId = {id} hasEditAccess = {hasEditAccess}/>
                </Grid>
            </Grid>
            <Grid container item direction = 'column' lg = {3} md = {3}>
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