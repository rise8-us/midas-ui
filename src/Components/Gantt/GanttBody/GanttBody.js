import { useTheme } from '@mui/material'
import { PropTypes } from 'prop-types'
import { getIsDateInRange } from 'Utilities/dateHelpers'
import { cellStyles, rowStyles } from 'Utilities/ganttHelpers'
import { GanttDividerBar } from '../GanttDividerBar'
import { GanttEntry } from '../GanttEntry'

export default function GanttBody({ borderColor, columns, chartBackgroundColor, dateRange, entries, renderComponent }) {
    const theme = useTheme()

    const baseHeight = 56
    const numEntries = entries.length
    let currentRow = 0

    const MIN_HEIGHT = baseHeight * numEntries

    const containerStyles = {
        ...rowStyles(chartBackgroundColor, borderColor),
        minHeight: (MIN_HEIGHT + 2 + 16) + 'px',
    }

    const dateRangeFilter = (entry) => {
        const isoDateRange = [dateRange[0].toISOString(), dateRange[1].toISOString()]
        const dueDateInRange = getIsDateInRange(entry.dueDate, isoDateRange)
        const startDateInRange = getIsDateInRange(entry.startDate, isoDateRange)

        return startDateInRange || dueDateInRange
    }

    const determineIndex = (row) => {
        return row >= 0 && row !== currentRow ? row : currentRow++
    }

    return (
        <div style = {{ position: 'relative' }}>
            <div style = {containerStyles}>
                {columns.map((column, index) => (
                    <div style = {cellStyles(borderColor, column.flexGrow)} key = {index} />
                ))}
            </div>
            <GanttDividerBar dateRange = {dateRange} color = {theme.palette.primary.main} />
            {entries?.filter(entry => dateRangeFilter(entry))
                .map((entry, index) => (
                    <GanttEntry
                        index = {determineIndex(entry.row)}
                        key = {index}
                        dateRange = {dateRange}
                        {...entry}
                    >
                        {renderComponent(entry, dateRange, index)}
                    </GanttEntry>
                ))}
        </div>
    )
}

GanttBody.propTypes = {
    borderColor: PropTypes.string,
    chartBackgroundColor: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        flexGrow: PropTypes.number
    })).isRequired,
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
    entries: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        startDate: PropTypes.string,
        dueDate: PropTypes.string.isRequired,
    })),
    renderComponent: PropTypes.func.isRequired,
}

GanttBody.defaultProps = {
    borderColor: '#d8d8d8',
    chartBackgroundColor: '#fff',
    entries: [{
        title: null,
        dueDate: null,
        startDate: null,
    }]
}