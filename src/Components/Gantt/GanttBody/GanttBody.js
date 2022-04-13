import { useTheme } from '@mui/material'
import { PropTypes } from 'prop-types'
import { calculatePosition, getIsDateInRange } from 'Utilities/dateHelpers'
import { cellStyles, rowStyles } from 'Utilities/ganttHelpers'
import { GanttEntry } from '../GanttEntry'

export default function GanttBody({ borderColor, columns, chartBackgroundColor, dateRange, entries, renderComponent }) {
    const theme = useTheme()

    const baseHeight = 56
    const numEntries = entries.length

    const MIN_HEIGHT = baseHeight * numEntries
    const [dividerPosition] = calculatePosition([new Date(), null], dateRange)

    const sxDivider = {
        top: '0px',
        position: 'absolute',
        left: `calc(${dividerPosition}% + 3px)`,
        height: '100%',
        width: '3px',
        background: theme.palette.primary.main,
        zIndex: 4
    }

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

    return (
        <div style = {{ position: 'relative' }}>
            <div style = {containerStyles}>
                {columns.map((column, index) => (
                    <div style = {cellStyles(borderColor, column.flexGrow)} key = {index} />
                ))}
            </div>
            {dividerPosition && <div style = {sxDivider} />}
            {entries?.filter(entry => dateRangeFilter(entry))
                .map((entry, index) => (
                    <GanttEntry
                        index = {index}
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