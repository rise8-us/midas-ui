import { Add, Archive, Edit, Unarchive } from '@mui/icons-material'
import { Box, Button, Chip, IconButton } from '@mui/material'
import { Table } from 'Components/Table'
import { Tag } from 'Components/Tag'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from 'Redux/Popups/actions'
import { requestArchiveProduct } from 'Redux/Products/actions'
import ProductConstants from 'Redux/Products/constants'
import { selectProducts } from 'Redux/Products/selectors'

function ProductsTab() {
    const dispatch = useDispatch()
    const allProducts = useSelector(selectProducts)

    const createProduct = () => dispatch(
        openPopup(ProductConstants.CREATE_PRODUCT, 'ProductPopup'))
    const updateProduct = (id) => dispatch(
        openPopup(ProductConstants.UPDATE_PRODUCT, 'ProductPopup', { id }))
    const archiveProduct = (id, isArchived) => dispatch(requestArchiveProduct({ id, isArchived: !isArchived }))

    const buildRows = () => {
        return allProducts.map(product => ({
            data: [
                product.name,
                buildProjects(product.projects),
                buildTag(product.tags),
                buildActions(product.id, product.isArchived)
            ],
            properties: { strikeThrough: product.isArchived }
        }))
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

    const buildProjects = (projects) => {
        return (
            <Box display = 'flex'>
                {projects.map((project, index) => (
                    <Chip variant = 'outlined' size = 'small' key = {index} label = {project.name} />
                ))}
            </Box>
        )
    }

    const buildActions = (id, isArchived) => {
        return <>
            <IconButton
                title = {isArchived ? 'unarchive' : 'archive' }
                color = 'secondary'
                onClick = {() => archiveProduct(id, isArchived)}
                size = 'large'
            >
                {isArchived ? <Unarchive /> : <Archive />}
            </IconButton>
            {!isArchived &&
                <IconButton
                    title = 'edit'
                    color = 'secondary'
                    onClick = {() => updateProduct(id)}
                    size = 'large'
                >
                    <Edit />
                </IconButton>
            }
        </>
    }

    return (
        <div style = {{ padding: '24px' }}>
            <Box display = 'block' width = '75vw' margin = 'auto' textAlign = 'right' padding = '24px 0'>
                <Button
                    variant = 'text'
                    startIcon = {<Add/>}
                    onClick = {createProduct}
                >
                    Add New Product
                </Button>
            </Box>
            <Table
                rows = {buildRows()}
                columns = {['Name', 'Project(s)', 'Tag(s)', '']}
            />
        </div>
    )
}

export default ProductsTab
