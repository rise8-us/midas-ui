import { Button, useTheme } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useState } from 'react'
import { GanttBody } from '../GanttBody'
import { GanttHeader } from '../GanttHeader'

function GanttChart({ entries, maxHeight }) {
    const theme = useTheme()

    let dateStart = new Date()
    let dateEnd = new Date()
    dateStart.setMonth(dateStart.getMonth() - 3)
    dateEnd.setMonth(dateStart.getMonth() + 12)

    const defaultDateRange = [dateStart, dateEnd]

    const [dateRange, setDateRange] = useState(defaultDateRange)

    const handleRangeChange = (direction) => {
        let newDateStart = dateRange[0]
        let newDateEnd = dateRange[1]

        newDateStart.setMonth(newDateStart.getMonth() + direction)
        newDateEnd.setMonth(newDateEnd.getMonth() + direction)
        setDateRange([newDateStart, newDateEnd])
    }

    const sxGanttChartContainer = {
        position: 'absolute',
        height: '100%',
        width: 'calc(100% - 48px)',
        maxHeight: maxHeight,
        overflowY: 'scroll',
        overflowX: 'hidden',
        background: theme.palette.background.paper,
    }

    return (
        <div>
            <Button onClick = {() => handleRangeChange(-1)} >Left</Button>
            <Button onClick = {() => handleRangeChange(1)} >Right</Button>
            <div style = {sxGanttChartContainer} >
                <GanttHeader dateRange = {dateRange}/>
                <GanttBody entries = {entries} maxHeight = {maxHeight} dateRange = {dateRange}/>
            </div>
        </div>
    )
}

GanttChart.propTypes = {
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            startDate: PropTypes.instanceOf(Date),
            endDate: PropTypes.instanceOf(Date),
            details: PropTypes.string,
            completion: PropTypes.number
        })
    ).isRequired,
    maxHeight: PropTypes.string.isRequired
}

export default GanttChart
