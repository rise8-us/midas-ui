import { Box, Card, CardContent, CardHeader, Divider, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { Tag } from 'Components/Tag'
import PropTypes from 'prop-types'
import React, { useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { hasProductAccess } from 'Redux/Auth/selectors'
import { openPopup } from 'Redux/Popups/actions'
import PortfolioConstants from 'Redux/Portfolios/constants'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'

const useStyles = makeStyles(theme => ({
    card: {
        width: '450px',
        height: 'fit-content',
        backgroundColor: theme.palette.grey[1100]
    },
    link: {
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: 'pointer'
        },
    }
}))

function PortfolioCard({ id }) {
    const dispatch = useDispatch()
    const classes = useStyles()
    const ref = useRef()
    const history = useHistory()

    const portfolio = useSelector(state => selectPortfolioById(state, id))
    const hasPortfolioAccess = useSelector(state => hasProductAccess(state, id))

    const updatePortfolioPopup = () => {
        dispatch(openPopup(PortfolioConstants.UPDATE_PORTFOLIO, 'PortfolioPopup', { id }))
    }

    useLayoutEffect(() => {
        const spans = Math.ceil(ref.current.clientHeight / 2) + 5
        ref.current.style.gridRowEnd = `span ${spans}`
    })

    return (
        <Card ref = {ref} className = {classes.card}>
            <CardHeader
                title = {portfolio.name}
                subheader = {portfolio.description}
                titleTypographyProps = {{
                    variant: 'h5',
                    color: 'textPrimary',
                    'data-testid': 'PortfolioCard__header-title'
                }}
                action = {
                    hasPortfolioAccess &&
                        <IconButton
                            onClick = {updatePortfolioPopup}
                            color = 'secondary'
                            data-testid = 'PortfolioCard__button-edit'
                        >
                            <Edit />
                        </IconButton>
                }
            />
            <CardContent>
                {portfolio.products.length > 0 ?
                    <>
                        <Box display = 'flex' justifyContent = 'space-between'>
                            <Typography color = 'textSecondary'>Product Name</Typography>
                            <Typography color = 'textSecondary'>Projects with CTF</Typography>
                        </Box>
                        <Divider />
                    </>
                    :
                    <Typography color = 'textSecondary'>
                        No products are currently assigned to this portfolio.
                    </Typography>
                }
                {portfolio.products.map((product, index) => {
                    const ctfProjects = product.projects.filter(p => p.projectJourneyMap === 7).length
                    return (
                        <Box
                            key = {index}
                            display = 'flex'
                            justifyContent = 'space-between'
                        >
                            <Typography
                                className = {classes.link}
                                onClick = {() => history.push(`/products/${product.id}/overview`)}
                                data-testid = 'PortfolioCard__text-productName'
                            >
                                {product.name}
                            </Typography>
                            <Typography>
                                {ctfProjects} / {product.projects.length}
                            </Typography>
                        </Box>
                    )
                })}
            </CardContent>
            <CardContent>
                {portfolio.tags?.length > 0 &&
                    <Box display = 'flex' flexWrap = 'wrap' marginTop = {1}>
                        {portfolio.tags.map((tag, index) => (
                            <Tag { ...tag } key = {index}/>
                        ))}
                    </Box>
                }
            </CardContent>
        </Card>
    )
}

PortfolioCard.propTypes = {
    id: PropTypes.number.isRequired
}

export default PortfolioCard