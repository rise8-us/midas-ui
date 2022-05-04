import PropTypes from 'prop-types'
import { useState } from 'react'
import { generateChartFormat, setDateByViewBy } from 'Utilities/ganttHelpers'
import { GanttActionBar } from '../GanttActionBar'
import { GanttBody } from '../GanttBody'
import { GanttHeader } from '../GanttHeader'

export default function GanttChart({
    actionBar,
    borderColor,
    chartBackgroundColor,
    defaultRowHeight,
    defaultRowSpacing,
    entries,
    headerStyles,
    leadingColumns,
    maxHeight,
    renderComponent,
    scope,
    startDate,
    todayColor,
    viewBy,
}) {
    const chartStyle = {
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: maxHeight,
        background: chartBackgroundColor,
    }

    let rangeStart = new Date(startDate.getTime())
    setDateByViewBy[viewBy](rangeStart, -leadingColumns)
    let rangeEnd = new Date(rangeStart.getTime())
    setDateByViewBy[viewBy](rangeEnd, scope)

    const [dateRange, setDateRange] = useState([rangeStart, rangeEnd])

    const augmentedSetDateRange = (direction) => {
        let newRangeStart = dateRange[0]
        let newRangeEnd = dateRange[1]

        setDateByViewBy[viewBy](newRangeStart, direction)
        setDateByViewBy[viewBy](newRangeEnd, direction)
        setDateRange([newRangeStart, newRangeEnd])
    }

    const chartFormat = generateChartFormat(dateRange[0], viewBy, scope)

    return (
        <div style = {{ width: '100%' }}>
            <GanttActionBar
                navLeftIcon = {actionBar.navLeftIcon}
                navRightIcon = {actionBar.navRightIcon}
                buttonComponent = {actionBar.buttonComponent}
                buttonProps = {actionBar.buttonProps}
                setDateRange = {augmentedSetDateRange}
                borderColor = {borderColor}
                backgroundColor = {chartBackgroundColor}
                additionalActions = {actionBar.additionalActions}
            />
            <div style = {chartStyle}>
                <GanttHeader
                    columns = {chartFormat}
                    chartBackgroundColor = {chartBackgroundColor}
                    borderColor = {borderColor}
                    style = {headerStyles}
                />
                {entries.length > 0 &&
                    <GanttBody
                        entries = {entries}
                        maxHeight = {maxHeight}
                        dateRange = {dateRange}
                        columns = {chartFormat}
                        chartBackgroundColor = {chartBackgroundColor}
                        borderColor = {borderColor}
                        renderComponent = {renderComponent}
                        todayColor = {todayColor}
                        defaultRowHeight =  {defaultRowHeight}
                        defaultRowSpacing = {defaultRowSpacing}
                    />
                }
            </div>
        </div>
    )
}

GanttChart.propTypes = {
    actionBar: PropTypes.shape({
        additionalActions: PropTypes.node,
        buttonComponent: PropTypes.elementType,
        buttonProps: PropTypes.shape(),
        navLeftIcon: PropTypes.node,
        navRightIcon: PropTypes.node,
    }),
    borderColor: PropTypes.string,
    chartBackgroundColor: PropTypes.string,
    defaultRowHeight: PropTypes.number,
    defaultRowSpacing: PropTypes.number,
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            startDate: PropTypes.string,
            dueDate: PropTypes.string
        })
    ).isRequired,
    headerStyles: PropTypes.shape({}),
    leadingColumns: PropTypes.number,
    maxHeight: PropTypes.string.isRequired,
    renderComponent: PropTypes.func,
    scope: PropTypes.number,
    startDate: PropTypes.instanceOf(Date).isRequired,
    todayColor: PropTypes.string,
    viewBy: PropTypes.oneOf(['year', 'quarter', 'month', 'week', 'day']),
}

GanttChart.defaultProps = {
    actionBar: {},
    borderColor: '#000',
    chartBackgroundColor: '#bdbdbd',
    defaultRowHeight: undefined,
    defaultRowSpacing: undefined,
    headerStyles: {},
    leadingColumns: 0,
    renderComponent: (entry) => (
        <div
            data-testid = 'GanttEntry__defaultEntryWrapper'
            style = {{
                borderRadius: '4px',
                background: '#CDD2D7',
                boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%)',
                textAlign: 'left'
            }}
        >
            <p style = {{ marginBlock: 0, padding: '8px' }}>
                {entry.title}
            </p>
        </div>
    ),
    scope: 12,
    todayColor: '#c3c3c3',
    viewBy: 'month',
}
