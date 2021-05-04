import {
    Box, Card, CardActions, CardContent, CardHeader, Divider, IconButton, makeStyles, Typography
} from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { openPopup } from '../../../Redux/Popups/actions'
import ProductConstants from '../../../Redux/Products/constants'
import { selectProductById } from '../../../Redux/Products/selectors'
import { PathToProdStepper } from '../../PathToProdStepper'
import { Tag } from '../../Tag'

const useStyles = makeStyles(theme => ({
    link: {
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: 'pointer'
        },
        height: 40
    }
}))

function ProductCard({ id }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const ref = useRef()
    const history = useHistory()

    const product = useSelector(state => selectProductById(state, id))

    const hasProjects = product.projects.length > 0
    const hasTags = product.tags.length > 0

    const calcStep = (project) => Math.log2(project.projectJourneyMap + 1)

    const updateProductPopup = () =>
        dispatch(openPopup(ProductConstants.UPDATE_PRODUCT, 'CreateOrUpdateProductPopup', { id }))

    const goToProductsPage = () => history.push(`/products/${product.id}`)

    useLayoutEffect(() => {
        const spans = Math.ceil(ref.current.clientHeight / 2) + 5
        ref.current.style.gridRowEnd = `span ${spans}`
    })

    return (
        <Card style = {{ width: '450px', height: 'fit-content' }} ref = {ref}>
            <CardHeader
                title = {product.name}
                titleTypographyProps = {{
                    variant: 'h5',
                    color: 'textPrimary',
                    onClick: goToProductsPage,
                    className: classes.link,
                }}
                style = {{ backgroundColor: '#FF00FF05' }}
                action = {
                    <IconButton
                        onClick = {updateProductPopup}
                        color = 'secondary'
                        data-testid = 'ProductCard__button-edit'
                    >
                        <Edit />
                    </IconButton>
                }
            />
            { hasProjects &&
                <>
                    <Divider variant = 'fullWidth' />
                    <CardContent>
                        {product.projects.map((project, index) => (
                            <Box key = {index} style = {{ paddingBottom: '30px' }}>
                                <Typography variant = 'h6' color = 'textSecondary' style = {{ marginLeft: '10px' }}>
                                    {project.name}
                                </Typography>
                                <PathToProdStepper step = {calcStep(project)} padding = '5px 20px 5px 20px'/>
                            </Box>
                        ))}
                    </CardContent>
                </>
            }
            { hasTags &&
                <>
                    <Divider variant = 'fullWidth' />
                    <CardActions
                        style = {{
                            backgroundColor: hasProjects ? '#FF00FF05' : 'inherit',
                            padding: '5px 16px'
                        }}
                    >
                        <Box display = 'flex' flexWrap = 'wrap' >
                            {product.tags.map((tag, index) => (
                                <Tag { ...tag } key = {index}/>
                            ))}
                        </Box>
                    </CardActions>
                </>
            }
        </Card>

    )
}

ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
}

export default ProductCard
