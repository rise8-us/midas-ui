import { Box, Button, useTheme } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useState } from 'react'
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

function GanttChart({ entries, maxHeight, renderComponent }) {
    const theme = useTheme()

    let dateStart = new Date()
    let dateEnd = new Date()
    dateStart.setMonth(dateStart.getMonth() - 3)
    dateEnd.setMonth(dateEnd.getMonth() + 9)

    dateStart.setDate(1)
    dateEnd.setDate(1)

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
                <GanttBody
                    entries = {entries}
                    maxHeight = {maxHeight}
                    dateRange = {dateRange}
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
    renderComponent: PropTypes.func
}

GanttChart.defaultProps = {
    renderComponent: (entry) => (
        <Box data-testid = 'GanttEntry__defaultEntryWrapper' sx = {defaultGanttEntryStyling}>
            <p style = {{ marginBlock: 0, padding: '8px' }}>
                {entry.title}
            </p>
        </Box>
    ),
}

export default GanttChart
