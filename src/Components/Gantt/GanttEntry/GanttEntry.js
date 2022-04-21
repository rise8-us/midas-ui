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
        position: 'absolute',
    }

    if (!startLeft) return null

    return (
        <div data-testid = 'GanttEntry__wrap' style = {enableFullHeight ? fullHeightBox : defaultStyle}>
            {children}
        </div>
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
