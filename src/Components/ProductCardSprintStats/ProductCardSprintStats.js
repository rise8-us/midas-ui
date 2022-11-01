import { Card, Grid, Stack, Typography } from '@mui/material'
import { ProductStoriesLineGraph } from 'Components/Charts/ProductStoriesLineGraph'
import { ProductDoraMetrics } from 'Components/ProductDoraMetrics'
import { ProjectCardSprintStats } from 'Components/ProjectCardSprintStats'
import { TextSkeleton } from 'Components/Skeletons'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { selectProductById } from 'Redux/Products/selectors'
import { fetchReleasesByProductId } from 'Redux/Releases/actions'

export default function ProductCardSprintStats(props) {
    const { productId, dateRange, loading, showReleasedAt, sprintMetrics, sprintDuration } = props
    const dispatch = useDispatch()

    const product = useSelector(state => selectProductById(state, productId))
    const pagePermissions = useSelector(state => selectPortfolioPagePermission(state, product.portfolioId))
    const latestSprintMetrics = sprintMetrics[0] ?? {}
    const latestReleasedAt = product.latestRelease?.releasedAt ? product.latestRelease.releasedAt + 'Z' : null
    const iteration = dateRange[1] < new Date() ? 0 : 1
    let total = 0

    for (let i = iteration; i < iteration + 3; i++) {
        total += sprintMetrics[i]?.deliveredPoints
    }

    useEffect(() => {
        dispatch(fetchReleasesByProductId(productId))
    }, [])

    return (
        <Card style = {{ padding: '0px 8px 8px' }}>
            <Stack paddingX = {1} spacing = {1}>
                <Grid container>
                    <Grid item xs = {12} md = {4} zIndex = {1}>
                        <Stack>
                            <Typography marginTop = {1} variant = 'h6'>
                                <TextSkeleton loading = {!product.name} text = {product.name} width = '160px'/>
                            </Typography>
                            <Typography
                                color = 'secondary'
                                variant = 'body2'
                                sx = {{
                                    fontStyle: 'italic',
                                    marginBottom: '8px'
                                }}
                            >
                                {product.coreDomain}
                            </Typography>
                            <ProductDoraMetrics
                                loading = {loading}
                                showReleasedAt = {showReleasedAt}
                                releasedAt = {latestReleasedAt}
                                sprintMetrics = {latestSprintMetrics}
                                deliveredPointsAverage = {total / 3}
                            />
                        </Stack>
                    </Grid>
                    <Grid item md = {8} xs = {12} paddingTop = {1.5}>
                        <div style = {{ maxWidth: '800px', minHeight: '200px', height: '100%', width: '100%' }}>
                            <ProductStoriesLineGraph rawData = {sprintMetrics} dateOffset = {sprintDuration}/>
                        </div>
                    </Grid>
                </Grid>
                {product.projectIds?.map((projectId, index) =>
                    <ProjectCardSprintStats
                        key = {index}
                        portfolioId = {product.portfolioId}
                        projectId = {projectId}
                        dateRange = {dateRange}
                        hasEdit = {Boolean(pagePermissions.edit)}
                        loading = {loading}
                    />
                )}
            </Stack>
        </Card>
    )
}

ProductCardSprintStats.propTypes = {
    dateRange: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number])).isRequired,
    productId: PropTypes.number.isRequired,
    loading: PropTypes.bool,
    showReleasedAt: PropTypes.bool,
    sprintDuration: PropTypes.number,
    sprintMetrics: PropTypes.arrayOf(PropTypes.shape({
        deliveredStories: PropTypes.number,
        deliveredPoints: PropTypes.number,
    })),
}

ProductCardSprintStats.defaultProps = {
    loading: false,
    showReleasedAt: true,
    sprintDuration: 0,
    sprintMetrics: [],
}
