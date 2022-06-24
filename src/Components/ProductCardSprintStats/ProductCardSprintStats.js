import { Card, Grid, Stack, Typography } from '@mui/material'
import { ProductStoriesLineGraph } from 'Components/Charts/ProductStoriesLineGraph'
import { ProductDoraMetrics } from 'Components/ProductDoraMetrics'
import { ProjectCardSprintStats } from 'Components/ProjectCardSprintStats'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { selectProductById } from 'Redux/Products/selectors'
import { fetchReleasesByProductId } from 'Redux/Releases/actions'

export default function ProductCardSprintStats({ productId, dateRange, sprintMetrics, sprintDuration }) {
    const dispatch = useDispatch()

    const product = useSelector(state => selectProductById(state, productId))
    const pagePermissions = useSelector(state => selectPortfolioPagePermission(state, product.portfolioId))

    const latestSprintMetrics = sprintMetrics[0] ?? {}
    const latestReleasedAt = product.latestRelease?.releasedAt ? product.latestRelease.releasedAt + 'Z' : null

    useEffect(() => {
        dispatch(fetchReleasesByProductId(productId))
    }, [])

    return (
        <Card style = {{ padding: '0px 8px 8px' }}>
            <Stack paddingX = {1} spacing = {1}>
                <Grid container>
                    <Grid item xs = {12} md = {3}>
                        <Stack>
                            <Typography marginY = {1} variant = 'h6'>{product.name}</Typography>
                            <ProductDoraMetrics
                                releasedAt = {latestReleasedAt}
                                sprintMetrics = {latestSprintMetrics}
                            />
                        </Stack>
                    </Grid>
                    <Grid item md = {9} xs = {12} paddingTop = {1.5}>
                        <div style = {{ maxWidth: '800px', minHeight: '200px', height: '100%', width: '100%' }}>
                            <ProductStoriesLineGraph rawData = {sprintMetrics} dateOffset = {sprintDuration}/>
                        </div>
                    </Grid>
                </Grid>
                {product.projectIds?.map((projectId, index) =>
                    <ProjectCardSprintStats
                        key = {index}
                        projectId = {projectId}
                        dateRange = {dateRange}
                        hasEdit = {Boolean(pagePermissions.edit)}
                    />
                )}
            </Stack>
        </Card>
    )
}

ProductCardSprintStats.propTypes = {
    dateRange: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number])).isRequired,
    productId: PropTypes.number.isRequired,
    sprintDuration: PropTypes.number,
    sprintMetrics: PropTypes.arrayOf(PropTypes.shape({
        deliveredStories: PropTypes.number,
        deliveredPoints: PropTypes.number,
    })),
}

ProductCardSprintStats.defaultProps = {
    sprintDuration: 0,
    sprintMetrics: [],
}
