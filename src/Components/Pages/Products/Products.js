import { Box } from '@mui/material'
import { ProductCard } from 'Components/Cards'
import { FloatingActionButton } from 'Components/FloatingActionButton'
import { Page } from 'Components/Page'
import { useDispatch, useSelector } from 'react-redux'
import { isProductCreator } from 'Redux/Auth/selectors'
import { selectAppBarFilter } from 'Redux/Filters/selectors'
import { openPopup } from 'Redux/Popups/actions'
import ProductConstant from 'Redux/Products/constants'
import { selectUnarchivedProducts } from 'Redux/Products/selectors'
import { sortArrayAlphabetically } from 'Utilities/sorting'

function Products() {
    const dispatch = useDispatch()

    const allProduct = useSelector(selectUnarchivedProducts)
    const filterString = useSelector(selectAppBarFilter).toLowerCase()
    const hasCreate = useSelector(isProductCreator)

    const filteredProducts = allProduct.filter(product => {
        if (product.name.toLowerCase().includes(filterString) ||
            product.description.toLowerCase().includes(filterString)) return true
    })

    const sortedProducts = sortArrayAlphabetically(filteredProducts, 'name')

    const create = () => dispatch(openPopup(ProductConstant.CREATE_PRODUCT, 'ProductPopup'))

    return (
        <Page>
            <>
                <Box style = {{ padding: '20px 40px' }}>
                    <Box
                        display = 'grid'
                        justifyContent = 'center'
                        gridTemplateColumns = 'repeat(auto-fit, 450px)'
                        gridAutoRows = '2px'
                        gap = '0 10px'
                        gridAutoFlow = 'row'
                        style = {{ marginBottom: '40px', padding: '0 30px' }}
                    >
                        {sortedProducts.map((product) => (
                            <ProductCard key = {product.id} id = {product.id}/>
                        ))}
                    </Box>
                </Box>
                {hasCreate && <FloatingActionButton onClick = {create} />}
            </>
        </Page>
    )
}

export default Products