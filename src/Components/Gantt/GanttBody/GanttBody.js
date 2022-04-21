import { useTheme } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useMemo } from 'react'
import { dateRangeFilter } from 'Utilities/dateHelpers'
import { cellStyles, rowStyles } from 'Utilities/ganttHelpers'
import { GanttDividerBar } from '../GanttDividerBar'
import { GanttEntry } from '../GanttEntry'

const entryWrapperProps = {
    style: { position: 'absolute', top: '0px', width: '100%', height: '-webkit-fill-available' }
}

export default function GanttBody({ borderColor, columns, chartBackgroundColor, dateRange, entries, renderComponent }) {
    const theme = useTheme()

    const baseHeight = 56
    const numEntries = entries.length
    let currentRow = -1

    const MIN_HEIGHT = baseHeight * numEntries

    const containerStyles = {
        ...rowStyles(chartBackgroundColor, borderColor),
        minHeight: (MIN_HEIGHT + 2 + 16) + 'px',
    }

    const inRangeEntries = entries?.filter(entry => dateRangeFilter(entry, dateRange))
    const skipIgnoredRowsLoop = () => {
        do {
            currentRow++
        } while (ignoredRows.has(currentRow))
        return currentRow
    }

    const determineIndex = (row) => {
        return row >= 0 ? row : skipIgnoredRowsLoop()
    }

    const ignoredRows = useMemo(() => {
        const presetRows = new Set()

        inRangeEntries.forEach(entry => {
            entry.row > -1 && presetRows.add(entry.row)
        })
        return presetRows
    }, [inRangeEntries])

    return (
        <div style = {{ position: 'relative' }}>
            <div style = {containerStyles}>
                {columns.map((column, index) => (
                    <div style = {cellStyles(borderColor, column.flexGrow)} key = {index} />
                ))}
            </div>
            <GanttDividerBar dateRange = {dateRange} color = {theme.palette.primary.main} />
            <div {...entryWrapperProps}>
                {inRangeEntries.map((entry, index) => (
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