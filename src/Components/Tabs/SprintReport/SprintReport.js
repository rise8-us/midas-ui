import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { PortfolioCardSprintStats } from 'Components/PortfolioCardSprintStats'
import { ProductCardSprintStats } from 'Components/ProductCardSprintStats'
import { format } from 'date-fns'
import useDebounce from 'Hooks/useDebounce'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestfetchPortfolioMetrics, requestfetchPortfolioMetricsSummary } from 'Redux/Portfolios/actions'
import { getDateInDatabaseOrder } from 'Utilities/dateHelpers'

const calculateDate = (initialDate, duration, multipler) => {
    let newDate = new Date(initialDate.getTime())
    return newDate.setDate(newDate.getDate() + (duration * multipler))
}

export default function SprintReport({ portfolioId, productIds, sprintStart, sprintDuration, type }) {
    const dispatch = useDispatch()

    let sprintEnd = new Date(sprintStart.getTime())
    sprintEnd.setDate(sprintEnd.getDate() + (Math.abs(sprintDuration) - 1))

    const [navigationMultiplier, setNavigationMultiplier] = useState(0)
    const [dateRange, setDateRange] = useState([sprintStart, sprintEnd])
    const [portfolioMetrics, setPortfolioMetrics] = useState({})
    const [portfolioMetricsSummary, setPortfolioMetricsSummary] = useState({})
    const [loading, setLoading] = useState(true)

    const debouncedDateRange = useDebounce(dateRange, 200)

    const updateRange = (newModifier) => {
        const newNav = navigationMultiplier + newModifier
        const newStartDate = calculateDate(sprintStart, sprintDuration, newNav)
        const newEndDate = calculateDate(sprintEnd, sprintDuration, newNav)

        setNavigationMultiplier(newNav)
        setDateRange([newStartDate, newEndDate])
        setLoading(true)
    }

    useEffect(() => {
        const updateMetrics = async() => {
            const requests = []
            requests.push(dispatch(requestfetchPortfolioMetrics({
                id: portfolioId,
                sprintCycles: 10,
                startDate: getDateInDatabaseOrder(new Date(dateRange[0]).toISOString()),
                sprintDuration,
            })).then(unwrapResult).then(setPortfolioMetrics))

            type === 'portfolio' && requests.push(dispatch(requestfetchPortfolioMetricsSummary({
                id: portfolioId,
                startDate: getDateInDatabaseOrder(new Date(dateRange[0]).toISOString()),
                sprintDuration,
            })).then(unwrapResult).then(setPortfolioMetricsSummary))

            Promise.allSettled(requests).then(() => setLoading(false))
        }

        updateMetrics()
    }, [JSON.stringify(debouncedDateRange)])

    return (
        <Stack spacing = {1} data-testid = 'SprintReport__container-stack'>
            <Stack direction = 'row' spacing = {1} alignItems = 'center'>
                <IconButton onClick = {() => updateRange(-1)}>
                    <ArrowBack fontSize = 'small' />
                </IconButton>
                <Typography width = '80px'>{format(dateRange[0], 'dd MMM yy')}</Typography>
                <Typography color = 'secondary'>-</Typography>
                <Typography width = '80px'>{format(dateRange[1], 'dd MMM yy')}</Typography>
                <IconButton onClick = {() => updateRange(1)} disabled = {navigationMultiplier === 0}>
                    <ArrowForward fontSize = 'small' />
                </IconButton>
            </Stack>
            {type === 'portfolio' &&
                <PortfolioCardSprintStats
                    portfolioId = {portfolioId}
                    dateRange = {debouncedDateRange}
                    prodDeployments = {portfolioMetricsSummary.totalReleases}
                    prodIssues = {portfolioMetricsSummary.totalIssuesDelivered}
                    stagingIssues = {portfolioMetricsSummary.totalIssuesClosed}
                    loading = {loading}
                />
            }
            {productIds.map((productId, index) =>
                <ProductCardSprintStats
                    key = {index}
                    productId = {productId}
                    dateRange = {debouncedDateRange}
                    showReleasedAt = {navigationMultiplier === 0}
                    sprintMetrics = {portfolioMetrics[productId]}
                    sprintDuration = {sprintDuration}
                    loading = {loading}
                />
            )}
        </Stack>
    )
}

SprintReport.propTypes = {
    productIds: PropTypes.arrayOf(PropTypes.number),
    portfolioId: PropTypes.number.isRequired,
    sprintStart: PropTypes.instanceOf(Date).isRequired,
    sprintDuration: PropTypes.number.isRequired,
    type: PropTypes.string,
}

SprintReport.defaultProps = {
    productIds: [],
    type: 'portfolio',
}
