import { Box, useTheme } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { generateChartFormat, setDateByViewBy } from 'Utilities/ganttHelpers'
import { GanttActionBar } from '../GanttActionBar'
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

export default function GanttChart({ actionBar, startDate, entries, maxHeight, renderComponent, viewBy, scope }) {
    const theme = useTheme()
    const backgroundColor = theme.palette.background.paper
    const borderColor = 'black'
    const chartStyle = {
        position: 'relative',
        maxHeight: maxHeight,
        overflowY: 'auto',
        overflowX: 'hidden',
        background: backgroundColor,
    }

    let endDate = new Date(startDate.getTime())
    setDateByViewBy[viewBy](endDate, scope)

    const [dateRange, setDateRange] = useState([startDate, endDate])

    const augmentedSetDateRange = (direction) => {
        let newDateStart = dateRange[0]
        let newDateEnd = dateRange[1]

        setDateByViewBy[viewBy](newDateStart, direction)
        setDateByViewBy[viewBy](newDateEnd, direction)
        setDateRange([newDateStart, newDateEnd])
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
                backgroundColor = {backgroundColor}
                additionalActions = {actionBar.additionalActions}
            />
            <div style = {chartStyle}>
                <GanttHeader
                    columns = {chartFormat}
                    chartBackgroundColor = {backgroundColor}
                    borderColor = {borderColor}
                    style = {{
                        color: theme.palette.grey[600],
                        ...theme.typography.subtitle2,
                        marginLeft: theme.spacing(1),
                        marginBlock: 'unset'
                    }}
                />
                {entries.length > 0 && <GanttBody
                    entries = {entries}
                    maxHeight = {maxHeight}
                    dateRange = {dateRange}
                    columns = {chartFormat}
                    chartBackgroundColor = {backgroundColor}
                    borderColor = {borderColor}
                    renderComponent = {renderComponent}
                />}
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
    actionBar: {},
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
