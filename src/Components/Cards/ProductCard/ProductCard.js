import {
    Avatar, Box, Card, CardContent, CardHeader, Divider, IconButton, Typography, useTheme
} from '@material-ui/core'
import { ArrowForward, BusinessCenter, Edit, Flag, LocalShipping, Map } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { openPopup } from '../../../Redux/Popups/actions'
import ProductConstants from '../../../Redux/Products/constants'
import Tag from '../../Tag/Tag'

// TODO: Change businessCenter icon to Assets/pipeline.svg
// Wasn't rendering when tried to use <SvgIcon> needs investigating

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
        }, {
            label: 'CTF::Awaiting Pipelines',
            color: '#1933b3',
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
                subheader = {
                    <Box display = 'flex' flexWrap = 'wrap'>
                        {tags.map((tag, index) => (
                            <Tag { ...tag } key = {index}/>
                        ))}
                    </Box>
                }
                avatar = {
                    <Avatar style = {{ backgroundColor: theme.palette.appColor }}>
                        {product.name.slice(0, 2)}
                    </Avatar>
                }
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
            <Divider light />
            <CardContent>
                <Box style = {{ padding: '0px 55px' }}>
                    <Box
                        display = 'flex'
                        flexDirection = 'row'
                        justifyContent = 'space-between'
                    >
                        <Flag/>
                        <ArrowForward />
                        <BusinessCenter />
                        <ArrowForward />
                        <Map />
                        <ArrowForward />
                        <LocalShipping />
                    </Box>
                    {product.description.length > 0 &&
                    <div style = {{ padding: '15px 0px' }}>
                        <Divider light />
                        <Typography variant = 'body1' color = 'textSecondary'>{product.description}</Typography>
                    </div>
                    }
                </Box>
            </CardContent>
        </Card>
    )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.number)
    }).isRequired
}

export default ProductCard