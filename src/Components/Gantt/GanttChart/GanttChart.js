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

export default function GanttChart({ entries, maxHeight, renderComponent, viewBy, scope }) {
    const theme = useTheme()

    let dateStart = new Date()
    let dateEnd = new Date()
    dateStart.setMonth(dateStart.getMonth() - 3)
    dateEnd.setMonth(dateEnd.getMonth() + 9)
    dateStart.setDate(1)
    dateStart.setHours(0, 0, 0)
    dateEnd.setHours(0, 0, 0)
    dateEnd.setDate(1)

    const [dateRange, setDateRange] = useState([dateStart, dateEnd])

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
    viewBy: PropTypes.oneOf(['year', 'month', 'week']),
    scope: PropTypes.number
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
