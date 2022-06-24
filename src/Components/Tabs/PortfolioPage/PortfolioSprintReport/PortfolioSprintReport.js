import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { ProductCardSprintStats } from 'Components/ProductCardSprintStats'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestfetchPortfolioMetrics } from 'Redux/Portfolios/actions'
import { getDateInDatabaseOrder } from 'Utilities/dateHelpers'

const calculateDate = (initialDate, duration, multipler) => {
    let newDate = new Date(initialDate.getTime())
    return newDate.setDate(newDate.getDate() + (duration * multipler))
}

export default function PortfolioSprintReport({ portfolioId, productIds, sprintStart, sprintDuration }) {
    const dispatch = useDispatch()

    let sprintEnd = new Date(sprintStart.getTime())
    sprintEnd.setDate(sprintEnd.getDate() + (Math.abs(sprintDuration) - 1))

    const [navigationMultiplier, setNavigationMultiplier] = useState(0)
    const [dateRange, setDateRange] = useState([sprintStart, sprintEnd])
    const [portfolioMetrics, setPortfolioMetrics] = useState({})

    const updateRange = (newModifier) => {
        const newNav = navigationMultiplier + newModifier
        const newStartDate = calculateDate(sprintStart, sprintDuration, newNav)
        const newEndDate = calculateDate(sprintEnd, sprintDuration, newNav)

        setNavigationMultiplier(newNav)
        setDateRange([newStartDate, newEndDate])
    }

    useEffect(() => {
        dispatch(requestfetchPortfolioMetrics({
            id: portfolioId,
            sprintCycles: 10,
            startDate: getDateInDatabaseOrder(new Date(dateRange[0]).toISOString()),
            sprintDuration,
        })).then(unwrapResult).then(setPortfolioMetrics)
    }, [JSON.stringify(dateRange)])

    return (
        <Stack spacing = {1} data-testid = 'PortfolioSprintReport__container-stack'>
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
            {productIds.map((productId, index) =>
                <ProductCardSprintStats
                    key = {index}
                    productId = {productId}
                    dateRange = {dateRange}
                    sprintMetrics = {portfolioMetrics[productId]}
                    sprintDuration = {sprintDuration}
                />
            )}
        </Stack>
    )
}

PortfolioSprintReport.propTypes = {
    productIds: PropTypes.arrayOf(PropTypes.number),
    portfolioId: PropTypes.number.isRequired,
    sprintStart: PropTypes.instanceOf(Date).isRequired,
    sprintDuration: PropTypes.number.isRequired
}

PortfolioSprintReport.defaultProps = {
    productIds: [],
}