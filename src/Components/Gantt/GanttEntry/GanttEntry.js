import { Box } from '@mui/material'
import { PropTypes } from 'prop-types'
import { calculatePosition, parseStringToDate } from 'Utilities/dateHelpers'

export default function GanttEntry({ startDate, dueDate, index, dateRange, children, enableFullHeight }) {

    const start = parseStringToDate(startDate)
    const due = parseStringToDate(dueDate)
    const [startLeft, duration] = calculatePosition([start, due], dateRange)

    const defaultStyle = {
        position: 'absolute',
        left: `${startLeft}%`,
        width: `${duration}%`,
        top: `${index * 56}px`,
        zIndex: 3
    }

    const fullHeightBox = {
        ...defaultStyle,
        height: '100%',
    }

    if (!startLeft) return null

    return (
        <Box data-testid = 'GanttEntry__wrap' sx = {enableFullHeight ? fullHeightBox : defaultStyle}>
            {children}
        </Box>
    )
}

GanttEntry.propTypes = {
    startDate: PropTypes.string,
    dueDate: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
    children: PropTypes.node,
    enableFullHeight: PropTypes.bool
}
GanttEntry.defaultProps = {
    startDate: undefined,
    children: undefined,
    enableFullHeight: false
}
