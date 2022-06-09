import { Card, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectProductById } from 'Redux/Products/selectors'

export default function ProductCardSprintStats({ productId }) {

    const product = useSelector(state => selectProductById(state, productId))

    return (
        <Card style = {{ padding: '8px' }}>
            <Stack>
                <Typography variant = 'h6'>
                    {product.name}
                </Typography>
            </Stack>
        </Card>
    )
}

ProductCardSprintStats.propTypes = {
    productId: PropTypes.number.isRequired,
}
