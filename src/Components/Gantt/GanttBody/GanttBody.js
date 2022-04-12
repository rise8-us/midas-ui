import { useTheme } from '@mui/material'
import { PropTypes } from 'prop-types'
import { calculateSinglePosition, getIsDateInRange } from 'Utilities/dateHelpers'
import { GanttEntry } from '../GanttEntry'

export default function GanttBody({ entries, dateRange, renderComponent }) {
    const theme = useTheme()

    const baseHeight = 56
    const numEntries = entries.length

    const MIN_HEIGHT = baseHeight * numEntries
    const [shouldRenderDivider, dividerPosition] = calculateSinglePosition(dateRange)

    const sxDivider = {
        top: '0px',
        position: 'inherit',
        left: `calc(${dividerPosition}% + 3px)`,
        height: '100%',
        width: '3px',
        background: theme.palette.primary.main,
        zIndex: 4
    }

    const sxGridContainer = {
        display: 'flex',
        backgroundColor: theme.palette.background.paper,
        minHeight: (MIN_HEIGHT + 2 + 16) + 'px',
    }

    const dateRangeFilter = (entry) => {
        const isoDateRange = [dateRange[0].toISOString(), dateRange[1].toISOString()]
        const dueDateInRange = getIsDateInRange(entry.dueDate, isoDateRange)
        const startDateInRange = getIsDateInRange(entry.startDate, isoDateRange)

        return entry.startDate !== null ? (startDateInRange || dueDateInRange) : dueDateInRange
    }

    return (
        <>
            <div style = {sxGridContainer}>
                {Array(12).fill().map((_, index) => (
                    <div style = {{ flexGrow: 1, borderLeft: '1px solid black' }} key = {index} />
                ))}
            </div>
            {shouldRenderDivider && <div style = {sxDivider} />}
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
        </>
    )
}

GanttBody.propTypes = {
    entries: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        startDate: PropTypes.string,
        dueDate: PropTypes.string.isRequired,
    })
    ),
    renderComponent: PropTypes.func.isRequired,
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired
}

GanttBody.defaultProps = {
    entries: [{
        title: null,
        dueDate: null,
        startDate: null,
    }]
}