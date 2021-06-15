import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../../../Redux/Popups/actions'
import ProductConstant from '../../../Redux/Products/constants'
import { selectUnarchivedProducts } from '../../../Redux/Products/selectors'
import TagConstants from '../../../Redux/Tags/constants'
import { ProductCard } from '../../Cards'
import { Page } from '../../Page'
import { SearchProducts } from '../../Search'

const useStyles = makeStyles(theme => ({
    button: {
        '&:hover': {
            color: theme.palette.primary.main
        },
        height: 40
    }
}))

function Home() {
    const dispatch = useDispatch()
    const classes = useStyles()

    const allProduct = useSelector(selectUnarchivedProducts)
    const filterString = useSelector(state => state.filters.homePage.filterString).toLowerCase()

    const filteredProducts = allProduct.filter(product => {
        if (product.name.toLowerCase().includes(filterString) ||
            product.description.toLowerCase().includes(filterString)) return true
        else {
            const projects = product.projects.filter(project =>
                project.name.toLowerCase().includes(filterString) ||
                project.description.toLowerCase().includes(filterString)
            )

            if (projects.length > 0) return true
            return false
        }
    })

    const createProduct = () => dispatch(openPopup(ProductConstant.CREATE_PRODUCT, 'CreateOrUpdateProductPopup'))
    const createTag = () => dispatch(openPopup(TagConstants.CREATE_TAG, 'CreateOrUpdateTagPopup', { type: 'PRODUCT' }))

    return (
        <Page>
            <Box display = 'flex' flexDirection = 'column'>
                <Box display = 'flex' alignItems = 'center'>
                    <Typography variant = 'h6' color = 'textSecondary' style = {{ padding: '20px' }}>
                        Measuring Inception to Production
                    </Typography>
                    <div style = {{ flexGrow: 1 }} />
                    <div style = {{ padding: '20px' }}>
                        <Button
                            variant = 'text'
                            startIcon = {<Add/>}
                            className = {classes.button}
                            onClick = {createProduct}
                        >
                            Add New Product
                        </Button>
                        <Button
                            variant = 'text'
                            startIcon = {<Add/>}
                            className = {classes.button}
                            onClick = {createTag}
                        >
                            Add New Tag
                        </Button>
                    </div>
                </Box>
                <Box
                    display = 'flex'
                    alignItems = 'center'
                    flexGrow = {1}
                    style = {{ padding: '0 20px 20px' }}
                >
                    <SearchProducts growFrom = '100%'/>
                </Box>
                <Box
                    display = 'grid'
                    justifyContent = 'center'
                    gridTemplateColumns = 'repeat(auto-fit, 450px)'
                    gridAutoRows = '2px'
                    gridGap = '0 10px'
                    gridAutoFlow = 'row'
                    style = {{ marginBottom: '40px', padding: '0 30px' }}
                >
                    {filteredProducts.map((product) => (
                        <ProductCard key = {product.id} id = {product.id}/>
                    ))}
                </Box>
            </Box>
        </Page>
    )
}

export default Home