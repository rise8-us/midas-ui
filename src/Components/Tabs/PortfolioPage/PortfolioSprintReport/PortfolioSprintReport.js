import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { useState } from 'react'

const calculateDate = (initialDate, duration, multipler) => {
    let newDate = new Date(initialDate.getTime())
    return newDate.setDate(newDate.getDate() + (duration * multipler))
}

export default function PortfolioSprintReport({ productIds, sprintStart, sprintDuration }) {

    let sprintEnd = new Date(sprintStart.getTime())
    sprintEnd.setDate(sprintEnd.getDate() + (Math.abs(sprintDuration) - 1))

    const [navigationMultiplier, setNavigationMultiplier] = useState(0)

    return (
        <Stack spacing = {1}>
            <Stack direction = 'row' spacing = {1} alignItems = 'center'>
                <IconButton onClick = {() => setNavigationMultiplier(prev => prev - 1)}>
                    <ArrowBack fontSize = 'small' />
                </IconButton>
                <Typography width = '80px'>
                    {format(calculateDate(sprintStart, sprintDuration, navigationMultiplier), 'dd MMM yy')}
                </Typography>
                <Typography color = 'secondary'>-</Typography>
                <Typography width = '80px'>
                    {format(calculateDate(sprintEnd, sprintDuration, navigationMultiplier), 'dd MMM yy')}
                </Typography>
                <IconButton
                    onClick = {() => setNavigationMultiplier(prev => prev + 1)}
                    disabled = {navigationMultiplier === 0}
                >
                    <ArrowForward fontSize = 'small' />
                </IconButton>
            </Stack>
            {productIds.map((productId, index) =>
                <Typography key = {index}>{productId}</Typography>
            )}
        </Stack>
    )
}

PortfolioSprintReport.propTypes = {
    productIds: PropTypes.arrayOf(PropTypes.number),
    sprintStart: PropTypes.instanceOf(Date).isRequired,
    sprintDuration: PropTypes.number.isRequired
}

PortfolioSprintReport.defaultProps = {
    productIds: [],
}