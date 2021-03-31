import { Box, Card, CardContent, CardHeader, IconButton, useTheme } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { openPopup } from '../../../Redux/Popups/actions'
import ProductConstants from '../../../Redux/Products/constants'
import { PathToProdStepper } from '../../PathToProdStepper'
import Tag from '../../Tag/Tag'

function ProductCard({ product }) {

    const dispatch = useDispatch()
    const theme = useTheme()

    //test data to be removed after tags integrated.
    const tags = [
        {
            label: 'Category::Targeting',
            color: '#e67a3c',
            description: 'This is a description'
        }, {
            label: 'Horizon::1',
            color: '#347807',
            description: 'To be prioritized within 1 to 3 months'
        }, {
            label: 'Feature',
            color: '#cad442',
            description: ''
        }
    ]

    const editProductPopup = () => {
        dispatch(openPopup(ProductConstants.UPDATE_PRODUCT, 'UpdateProductPopup', { id: product.id }))
    }

    return (
        <Card style = {{ width: '450px', margin: theme.spacing(1) }}>
            <CardHeader
                title = {product.name}
                titleTypographyProps = {{ variant: 'h5', style: { padding: '5px' } }}
                action = {
                    <IconButton
                        onClick = {editProductPopup}
                        color = 'secondary'
                        data-testid = 'ProductCard__button-edit'
                    >
                        <Edit />
                    </IconButton>
                }
            />
            <PathToProdStepper />
            <CardContent>
                <Box display = 'flex' flexWrap = 'wrap'>
                    {tags.map((tag, index) => (
                        <Tag { ...tag } key = {index}/>
                    ))}
                </Box>
            </CardContent>
        </Card>
    )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.number)
    }).isRequired
}

export default ProductCard