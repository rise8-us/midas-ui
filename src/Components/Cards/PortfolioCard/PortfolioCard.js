import { Edit } from '@mui/icons-material'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, Typography } from '@mui/material'
import { Tag } from 'Components/Tag'
import useHistory from 'Hooks/useHistory'
import PropTypes from 'prop-types'
import { useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hasProductAccess } from 'Redux/Auth/selectors'
import { openPopup } from 'Redux/Popups/actions'
import PortfolioConstants from 'Redux/Portfolios/constants'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'
import { styled } from 'Styles/materialThemes'

const StyledCard = styled(Card)(({ theme }) => ({
    width: '450px',
    height: 'fit-content',
    backgroundColor: theme.palette.grey[1100],
    '&:hover': {
        boxShadow: '7px 7px 8px black',
    },
}))

const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.main,
    height: '20px',
    '&:hover': {
        color: theme.palette.primary.main,
    },
}))

const TypographyLink = styled(Typography)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main,
        cursor: 'pointer',
    },
}))

function PortfolioCard({ id }) {
    const dispatch = useDispatch()
    const ref = useRef()
    const history = useHistory()

    const portfolio = useSelector((state) => selectPortfolioById(state, id))
    const hasPortfolioAccess = useSelector((state) =>
        hasProductAccess(state, id)
    )

    const updatePortfolioPopup = () => {
        dispatch(
            openPopup(PortfolioConstants.UPDATE_PORTFOLIO, 'PortfolioPopup', { id })
        )
    }

    useLayoutEffect(() => {
        const spans = Math.ceil(ref.current.clientHeight / 2) + 5
        ref.current.style.gridRowEnd = `span ${spans}`
    })

    const goToPortfolioPage = () =>
        history.push(`/portfolios/${portfolio.id}`)

    return (
        <StyledCard ref = {ref}>
            <CardHeader
                title = {portfolio.name}
                subheader = {portfolio.description}
                titleTypographyProps = {{
                    variant: 'h5',
                    color: 'text.primary',
                    onClick: goToPortfolioPage,
                    'data-testid': 'PortfolioCard__header-title-' + portfolio.name,
                    sx: {
                        width: 'fit-content',
                        '&:hover': {
                            color: 'primary.main',
                            cursor: 'pointer',
                        }
                    }
                }}
                action = {
                    hasPortfolioAccess && (
                        <IconButton
                            onClick = {updatePortfolioPopup}
                            color = 'secondary'
                            data-testid = 'PortfolioCard__button-edit'
                            size = 'large'
                        >
                            <Edit />
                        </IconButton>
                    )
                }
            />
            <CardContent style = {{ paddingTop: 0 }}>
                <Box display = 'flex' justifyContent = 'space-between'>
                    <Typography>Quick Links</Typography>
                </Box>
                <Divider />
                <Grid container marginY = {1} rowSpacing = {1} columnSpacing = {1}>
                    {['roadmap', 'sprint-report', 'requirements', 'metrics'].map((page, index) =>
                        <Grid item key = {index}>
                            <StyledButton
                                onClick = {() => history.push(`/portfolios/${portfolio.id}/${page}`)}
                                variant = 'outlined'
                            >
                                {page.replace('-', ' ')}
                            </StyledButton>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
            <CardContent style = {{ paddingTop: 0 }}>
                {portfolio.products?.length > 0 ? (
                    <>
                        <Box display = 'flex' justifyContent = 'space-between'>
                            <Typography>Product Name</Typography>
                            <Typography>Projects with CTF</Typography>
                        </Box>
                        <Divider style = {{ marginBottom: '10px' }} />
                    </>
                ) : (
                    <Typography color = 'text.secondary'>
                        No products are currently assigned to this portfolio.
                    </Typography>
                )}
                {portfolio.products?.map((product, index) => {
                    const ctfProjects = product.projects.filter(
                        (p) => p.projectJourneyMap === 7
                    ).length
                    return (
                        <Box key = {index} display = 'flex' justifyContent = 'space-between'>
                            <TypographyLink
                                onClick = {() => history.push(`/products/${product.id}/overview`)}
                                data-testid = {'PortfolioCard__text-productName-' + product.name}
                            >
                                {product.name}
                            </TypographyLink>
                            <Typography>
                                {ctfProjects} / {product.projects.length}
                            </Typography>
                        </Box>
                    )
                })}
            </CardContent>
            {portfolio.tags?.length > 0 &&
                <CardContent>
                    <Box display = 'flex' flexWrap = 'wrap' marginTop = {1}>
                        {portfolio.tags.map((tag, index) => (
                            <Tag {...tag} key = {index} />
                        ))}
                    </Box>
                </CardContent>
            }
        </StyledCard>
    )
}

PortfolioCard.propTypes = {
    id: PropTypes.number.isRequired
}

export default PortfolioCard
