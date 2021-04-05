import { Box, Card, CardContent, CardHeader, IconButton, Tooltip, useTheme } from '@material-ui/core'
import { ChevronLeft, ChevronRight, Edit } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { React } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../../../Redux/Popups/actions'
import { requestUpdateJourneyMapById } from '../../../Redux/Products/actions'
import ProductConstants from '../../../Redux/Products/constants'
import { getProductById } from '../../../Redux/Products/selectors'
import { PathToProdStepper } from '../../PathToProdStepper'
import Tag from '../../Tag/Tag'

function ProductCard({ id }) {
    const dispatch = useDispatch()
    const theme = useTheme()

    const product = useSelector(state => getProductById(state, id))

    const calcStep = () => Math.log2(product.productJourneyMap + 1)

    const handleProgress = (increment) => {
        const step = calcStep() + increment
        const journey = Math.pow(2, step) - 1

        dispatch(requestUpdateJourneyMapById({
            id: product.id,
            productJourneyMap: journey
        }))
    }

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
            <Box display = 'flex'>
                <Tooltip title = 'Roll back status'>
                    <IconButton
                        onClick = {() => handleProgress(-1)}
                        color = 'secondary'
                        data-testid = 'ProductCard__button-back'
                        disabled = {product.productJourneyMap === 0}
                        style = {{ height: '48px', margin: 'auto' }}
                        disableRipple
                    >
                        <ChevronLeft />
                    </IconButton>
                </Tooltip>
                <PathToProdStepper step = {calcStep()} />
                <Tooltip title = 'Complete current step'>
                    <IconButton
                        onClick = {() => handleProgress(1)}
                        color = 'secondary'
                        data-testid = 'ProductCard__button-forward'
                        disabled = {product.productJourneyMap === 15}
                        style = {{ height: '48px', margin: 'auto' }}
                        disableRipple
                    >
                        <ChevronRight />
                    </IconButton>
                </Tooltip>
            </Box>
            <CardContent>
                <Box display = 'flex' flexWrap = 'wrap'>
                    {product.tags.map((tag, index) => (
                        <Tag { ...tag } key = {index}/>
                    ))}
                </Box>
            </CardContent>
        </Card>
    )
}

ProductCard.propTypes = {
    id: PropTypes.number.isRequired
}

export default ProductCard