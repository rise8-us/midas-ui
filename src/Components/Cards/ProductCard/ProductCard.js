import { Edit } from '@mui/icons-material'
import { Box, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import { PathToProdStepper } from 'Components/PathToProdStepper'
import { Tag } from 'Components/Tag'
import useHistory from 'Hooks/useHistory'
import PropTypes from 'prop-types'
import { useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hasProductAccess } from 'Redux/Auth/selectors'
import { openPopup } from 'Redux/Popups/actions'
import ProductConstants from 'Redux/Products/constants'
import { selectProductById } from 'Redux/Products/selectors'
import { styled } from 'Styles/materialThemes'

const StyledCard = styled(Card)(({ theme }) => ({
    width: '450px',
    height: 'fit-content',
    backgroundColor: theme.palette.grey[1100],
}))

function ProductCard({ id }) {
    const dispatch = useDispatch()
    const ref = useRef()
    const history = useHistory()

    const product = useSelector((state) => selectProductById(state, id))
    const hasAccess = useSelector((state) => hasProductAccess(state, id))

    const hasProjects = product.projects.length > 0
    const hasTags = product.tags.length > 0

    const calcStep = (project) => Math.log2(project.projectJourneyMap + 1)

    const updateProductPopup = () =>
        dispatch(
            openPopup(ProductConstants.UPDATE_PRODUCT, 'ProductPopup', { id })
        )

    const goToProductsPage = () =>
        history.push(`/products/${product.id}/overview`)

    useLayoutEffect(() => {
        const spans = Math.ceil(ref.current.clientHeight / 2) + 5
        ref.current.style.gridRowEnd = `span ${spans}`
    })

    return (
        <StyledCard ref = {ref}>
            <CardHeader
                title = {product.name}
                titleTypographyProps = {{
                    variant: 'h5',
                    color: 'text.primary',
                    onClick: goToProductsPage,
                    'data-testid': 'ProductCard__header-title',
                    sx: {
                        '&:hover': {
                            color: 'primary.main',
                            cursor: 'pointer'
                        },
                        height: 40,
                        width: 'fit-content'
                    }
                }}
                subheader = {product.description}
                action = {
                    hasAccess && (
                        <IconButton
                            onClick = {updateProductPopup}
                            color = 'secondary'
                            data-testid = 'ProductCard__button-edit'
                            size = 'large'
                        >
                            <Edit />
                        </IconButton>
                    )
                }
            />
            {hasProjects && (
                <>
                    <CardContent>
                        {product.projects.filter(p => !p.isArchived).map((project, index) => (
                            <Box key = {index} style = {{ paddingBottom: '30px' }}>
                                <Typography
                                    variant = 'h6'
                                    color = 'text.primary'
                                    style = {{ marginLeft: '10px' }}
                                >
                                    {project.name}
                                </Typography>
                                <PathToProdStepper
                                    step = {calcStep(project)}
                                    padding = '5px 20px 5px 20px'
                                />
                            </Box>
                        ))}
                    </CardContent>
                </>
            )}
            {hasTags && (
                <>
                    <CardActions style = {{ padding: '5px 16px' }}>
                        <Box display = 'flex' flexWrap = 'wrap'>
                            {product.tags.map((tag, index) => (
                                <Tag {...tag} key = {index} />
                            ))}
                        </Box>
                    </CardActions>
                </>
            )}
        </StyledCard>
    )
}

ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
}

export default ProductCard
