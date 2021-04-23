import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectProductById } from '../../../Redux/Products/selectors'
import { getUrlParam } from '../../../Utilities/queryParams'
import { Page } from '../../Page'

function Product() {

    const id = parseInt(getUrlParam('products'))

    const product = useSelector(state => selectProductById(state, id))

    return (
        <Page>
            <Box display = 'flex' flexDirection = 'column' padding = '36px'>
                <Typography variant = 'h5'>Hello {product.name}</Typography>
                <Typography>Vision: {product.visionStatement}</Typography>
                <Typography>Problem Statement: {product.problemStatement}</Typography>
            </Box>
        </Page>
    )
}

export default Product