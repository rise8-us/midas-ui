import { Grid } from '@material-ui/core'
import { OnePagerPopup } from 'Components/Popups/OnePagerPopup'
import { ProductBox } from 'Components/ProductBox'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

function ProductList({ products, tagScope }) {

    const [selectedId, setSelectedId] = useState(null)
    const [open, setOpen] = useState(false)

    const onClose = () => {
        setOpen(false)
        setSelectedId(null)
    }

    const onClick = (id) => {
        setOpen(true)
        setSelectedId(id)
    }

    return (
        <>
            <Grid container spacing = {2} wrap = 'wrap'>
                {products.map((product, index) => {
                    const ownership = product.tags
                        .find(tag => tag.label.includes(tagScope))

                    // set to red to quickly identify which products
                    // do not have an ownership tag
                    const color = ownership?.color ?? '#FF0000'

                    return (
                        <Grid item key = {index}>
                            <ProductBox
                                name = {product.name}
                                color = {color}
                                onClick = {() => onClick(product.id)}
                                projects = {product.projects}
                            />
                        </Grid>
                    )
                })}
            </Grid>
            {selectedId &&
                <OnePagerPopup productId = {selectedId} open = {open} onClose = {onClose} />
            }
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