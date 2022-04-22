import { PropTypes } from 'prop-types'
import { useMemo } from 'react'
import { dateRangeFilter } from 'Utilities/dateHelpers'
import { cellStyles, rowStyles } from 'Utilities/ganttHelpers'
import { GanttDividerBar } from '../GanttDividerBar'
import { GanttEntry } from '../GanttEntry'

const entryWrapperProps = {
    style: { position: 'absolute', top: '0px', width: '100%', height: '-webkit-fill-available' }
}

export default function GanttBody({
    borderColor,
    chartBackgroundColor,
    columns,
    dateRange,
    defaultRowHeight,
    defaultRowSpacing,
    entries,
    maxHeight,
    renderComponent,
    todayColor,
}) {

    let currentRow = -1

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

    const getMaxRowNumber = () => {
        const presetRowsMax = Math.max(...ignoredRows) + 1
        return Math.max(presetRowsMax, inRangeEntries.length)
    }

    const containerStyles = {
        ...rowStyles(chartBackgroundColor, borderColor),
        height: (getMaxRowNumber() * (defaultRowHeight + defaultRowSpacing) + defaultRowSpacing + 2) + 'px',
    }

    return (
        <div style = {{ position: 'relative', maxHeight }}>
            <div style = {containerStyles}>
                {columns.map((column, index) => (
                    <div style = {cellStyles(borderColor, column.flexGrow)} key = {index}/>
                ))}
            </div>
            <GanttDividerBar dateRange = {dateRange} color = {todayColor}/>
            <div {...entryWrapperProps}>
                {inRangeEntries.map((entry, index) => (
                    <GanttEntry
                        index = {determineIndex(entry.row)}
                        key = {index}
                        dateRange = {dateRange}
                        defaultRowHeight = {defaultRowHeight}
                        defaultRowSpacing = {defaultRowSpacing}
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
    defaultRowHeight: PropTypes.number,
    defaultRowSpacing: PropTypes.number,
    entries: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        startDate: PropTypes.string,
        dueDate: PropTypes.string.isRequired,
    })),
    maxHeight: PropTypes.string,
    renderComponent: PropTypes.func.isRequired,
    todayColor: PropTypes.string.isRequired
}

GanttBody.defaultProps = {
    borderColor: '#d8d8d8',
    chartBackgroundColor: '#fff',
    defaultRowHeight: 48,
    defaultRowSpacing: 8,
    entries: [{
        title: null,
        dueDate: null,
        startDate: null,
    }],
    maxHeight: '100%'
}