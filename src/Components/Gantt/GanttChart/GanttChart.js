import { Box, Button, useTheme } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useState } from 'react'
import { generateChartFormat } from 'Utilities/ganttHelpers'
import { GanttBody } from '../GanttBody'
import { GanttHeader } from '../GanttHeader'

const defaultGanttEntryStyling = (theme) => {
    return {
        borderRadius: '4px',
        background: theme.palette.grey[800],
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%)',
        textAlign: 'left'
    }
}

const setEndDateByViewBy = {
    year: (date, scope) => date.setYear(date.getFullYear() + scope),
    quarter: (date, scope) => date.setMonth(date.getMonth() + (scope * 3)),
    month: (date, scope) => date.setMonth(date.getMonth() + scope),
    week: (date, scope) => date.setDay(date.getDate() + (scope * 7)),
    day: (date, scope) => date.setDay(date.getDate() + scope),
}

export default function GanttChart({ startDate, entries, maxHeight, renderComponent, viewBy, scope }) {
    const theme = useTheme()

    let endDate = new Date(startDate.getTime())
    setEndDateByViewBy[viewBy](endDate, scope)

    const [dateRange, setDateRange] = useState([startDate, endDate])

    const chartFormat = generateChartFormat(dateRange[0], viewBy, scope)

    const handleRangeChange = (direction) => {
        let newDateStart = dateRange[0]
        let newDateEnd = dateRange[1]

        newDateStart.setMonth(newDateStart.getMonth() + direction)
        newDateEnd.setMonth(newDateEnd.getMonth() + direction)
        setDateRange([newDateStart, newDateEnd])
    }

    const sxGanttChartContainer = {
        position: 'relative',
        maxHeight: maxHeight,
        overflowY: 'auto',
        overflowX: 'hidden',
        background: theme.palette.background.paper,
    }

    return (
        <div style = {{ width: '100%' }}>
            <Button onClick = {() => handleRangeChange(-1)} >Left</Button>
            <Button onClick = {() => handleRangeChange(1)} >Right</Button>
            <div style = {sxGanttChartContainer} >
                <GanttHeader
                    columns = {chartFormat}
                    chartBackgroundColor = {theme.palette.background.paper}
                    borderColor = 'black'
                    style = {{
                        color: theme.palette.grey[600],
                        ...theme.typography.subtitle2,
                        marginLeft: theme.spacing(1),
                        marginBlock: 'unset'
                    }}
                />
                <GanttBody
                    entries = {entries}
                    maxHeight = {maxHeight}
                    dateRange = {dateRange}
                    columns = {chartFormat}
                    chartBackgroundColor = {theme.palette.background.paper}
                    borderColor = 'black'
                    renderComponent = {renderComponent}
                />
            </div>
        </div>
    )
}

GanttChart.propTypes = {
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            startDate: PropTypes.string,
            dueDate: PropTypes.string
        })
    ).isRequired,
    maxHeight: PropTypes.string.isRequired,
    renderComponent: PropTypes.func,
    viewBy: PropTypes.oneOf(['year', 'quarter', 'month', 'week', 'day']),
    scope: PropTypes.number,
    startDate: PropTypes.instanceOf(Date).isRequired
}

GanttChart.defaultProps = {
    renderComponent: (entry) => (
        <Box data-testid = 'GanttEntry__defaultEntryWrapper' sx = {defaultGanttEntryStyling}>
            <p style = {{ marginBlock: 0, padding: '8px' }}>
                {entry.title}
            </p>
        </Box>
    ),
    viewBy: 'month',
    scope: 12
}
