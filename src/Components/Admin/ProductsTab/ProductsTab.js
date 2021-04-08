import { Box, Button, IconButton, makeStyles } from '@material-ui/core'
import { Add, Archive, Edit, Unarchive } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../../../Redux/Popups/actions'
import { requestArchiveProduct } from '../../../Redux/Products/actions'
import ProductConstants from '../../../Redux/Products/constants'
import { getProducts } from '../../../Redux/Products/selectors'
import { Table } from '../../Table'
import { Tag } from '../../Tag'

const useStyles = makeStyles(theme => ({
    button: {
        '&:hover': {
            color: theme.palette.primary.main
        },
        height: 40
    }
}))

function ProductsTab() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const allProducts = useSelector(getProducts)

    const createProduct = () => dispatch(openPopup(ProductConstants.CREATE_PRODUCT, 'CreateProductPopup'))
    const updateProduct = (id) => dispatch(openPopup(ProductConstants.UPDATE_PRODUCT, 'UpdateProductPopup', { id }))
    const archiveProduct = (id, isArchived) => dispatch(requestArchiveProduct({ id, isArchived: !isArchived }))

    const buildRows = () => {
        return allProducts.map(product =>
            [product.name,
                product.description,
                product.gitlabProjectId,
                buildTag(product.tags),
                buildActions(product.id, product.isArchived)
            ])
    }

    const buildTag = (tags) => {
        return (
            <Box display = 'flex' flexWrap = 'wrap'>
                {tags.map((tag, index) => (
                    <Tag key = {index} {...tag}/>
                ))}
            </Box>
        )
    }

    const buildActions = (id, isArchived) => {
        return (
            <>
                {!isArchived &&
                    <IconButton
                        title = 'edit'
                        color = 'secondary'
                        onClick = {() => updateProduct(id)}
                    >
                        <Edit />
                    </IconButton>
                }
                <IconButton
                    title = {isArchived ? 'unarchive' : 'archive' }
                    color = 'secondary'
                    onClick = {() => archiveProduct(id, isArchived)}
                >
                    {isArchived ? <Unarchive /> : <Archive />}
                </IconButton>
            </>
        )
    }

    return (
        <div style = {{ padding: '24px' }}>
            <Box display = 'block' width = '75vw' margin = 'auto' textAlign = 'right' padding = '24px 0'>
                <Button
                    variant = 'text'
                    startIcon = {<Add/>}
                    className = {classes.button}
                    onClick = {createProduct}
                >
                            Add New Product
                </Button>
            </Box>
            <Table
                rows = {buildRows()}
                columns = {['Name', 'Description', 'GitLab Project Id', 'Tags', '']}
            />
        </div>
    )
}

export default ProductsTab
