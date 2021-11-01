import { Add } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { ProductCard } from 'Components/Cards'
import { Page } from 'Components/Page'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppBarFilter } from 'Redux/Filters/selectors'
import { openPopup } from 'Redux/Popups/actions'
import ProductConstant from 'Redux/Products/constants'
import { selectUnarchivedProducts } from 'Redux/Products/selectors'
import { styled } from 'Styles/materialThemes'

const StyledButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main,
    },
    height: 40,
}))

function Home() {
    const dispatch = useDispatch()

    const allProduct = useSelector(selectUnarchivedProducts)
    const filterString = useSelector(selectAppBarFilter).toLowerCase()

    const filteredProducts = allProduct.filter((product) => {
        if (
            product.name.toLowerCase().includes(filterString) ||
            product.description.toLowerCase().includes(filterString)
        )
            return true
        else {
            const projects = product.projects.filter((project) =>
                project.name.toLowerCase().includes(filterString) ||
                project.description.toLowerCase().includes(filterString)
            )

            if (projects.length > 0) return true
            return false
        }
    })

    const createProduct = () =>
        dispatch(openPopup(ProductConstant.CREATE_PRODUCT, 'ProductPopup'))

    return (
        <Page>
            <Box display = 'flex' flexDirection = 'column'>
                <Box display = 'flex' alignItems = 'center'>
                    <Typography
                        variant = 'h6'
                        color = 'text.secondary'
                        style = {{ padding: '20px' }}
                    >
                        Measuring Inception to Production
                    </Typography>
                    <div style = {{ flexGrow: 1 }} />
                    <div style = {{ padding: '20px' }}>
                        <StyledButton
                            variant = 'text'
                            startIcon = {<Add />}
                            onClick = {createProduct}
                        >
                            Add New Product
                        </StyledButton>
                    </div>
                </Box>
                <Box
                    display = 'grid'
                    justifyContent = 'center'
                    gridTemplateColumns = 'repeat(auto-fit, 450px)'
                    gridAutoRows = '2px'
                    gap = '0 10px'
                    gridAutoFlow = 'row'
                    style = {{ marginBottom: '40px', padding: '0 30px' }}
                >
                    {filteredProducts.map((product) => (
                        <ProductCard key = {product.id} id = {product.id} />
                    ))}
                </Box>
            </Box>
        </Page>
    )
}

export default Home