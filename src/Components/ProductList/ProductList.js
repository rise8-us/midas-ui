import { alpha, Grid, useTheme } from '@mui/material'
import { ProductBox } from 'Components/ProductBox'
import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router'
import { sortArrayAlphabetically } from 'Utilities/sorting'

function ProductList({ products, tagScope }) {
    const history = useHistory()
    const theme = useTheme()

    const goToProductPage = (id) => {
        history.push(`/products/${id}/overview`)
    }

    const sortedProducts = sortArrayAlphabetically(products, 'name')

    return (
        <>
            <Grid container spacing = {2} wrap = 'wrap'>
                {sortedProducts.map((product, index) => {
                    const ownership = product.tags
                        .find(tag => tag.label.includes(tagScope))

                    const color = ownership?.color ?? alpha(theme.palette.text.secondary, .4)

                    return (
                        <Grid item key = {index}>
                            <ProductBox
                                name = {product.name}
                                color = {color}
                                onClick = {() => goToProductPage(product.id)}
                                projects = {product.projects}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired
        })),
        projects: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            projectJourneyMap: PropTypes.number.isRequired
        }))
    })),
    tagScope: PropTypes.string.isRequired
}

ProductList.defaultProps = {
    products: []
}

export default ProductList