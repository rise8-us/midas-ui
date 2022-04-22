import { PropTypes } from 'prop-types'
import { calculatePosition, parseStringToDate } from 'Utilities/dateHelpers'

export default function GanttEntry({
    children,
    dateRange,
    defaultRowHeight,
    defaultRowSpacing,
    dueDate,
    enableFullHeight,
    index,
    startDate,
}) {

    const start = parseStringToDate(startDate)
    const due = parseStringToDate(dueDate)
    const [startLeft, duration] = calculatePosition([start, due], dateRange)

    const entryTopPosition = index * (defaultRowHeight + defaultRowSpacing)

    const defaultStyle = {
        position: 'absolute',
        left: `${startLeft}%`,
        width: `${duration}%`,
        top: `${entryTopPosition + defaultRowSpacing}px`,
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
    children: PropTypes.node,
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
    defaultRowHeight: PropTypes.number.isRequired,
    defaultRowSpacing: PropTypes.number.isRequired,
    dueDate: PropTypes.string.isRequired,
    enableFullHeight: PropTypes.bool,
    index: PropTypes.number.isRequired,
    startDate: PropTypes.string,
}
GanttEntry.defaultProps = {
    children: undefined,
    enableFullHeight: false,
    startDate: undefined,
}
