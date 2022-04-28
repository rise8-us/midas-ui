import PropTypes from 'prop-types'
import { calculatePosition, parseStringToDate } from 'Utilities/dateHelpers'
import './GanttEntry.css'

export default function GanttEntry({
    children,
    dateRange,
    dueDate,
    enableFullHeight,
    startDate,
    style
}) {

    const start = parseStringToDate(startDate)
    const due = parseStringToDate(dueDate)
    const [startLeft, duration] = calculatePosition([start, due], dateRange)

    const defaultStyle = {
        position: 'relative',
        left: `${startLeft}%`,
        width: `${duration}%`,
    }

    const fullHeightBox = {
        ...defaultStyle,
        height: '100%',
        position: 'absolute',
    }

    const finalStyle = enableFullHeight ? fullHeightBox : defaultStyle

    return (
        <div
            className = 'ganttEntry'
            data-testid = 'GanttEntry__wrap'
            style = {{
                ...finalStyle,
                ...style
            }}
        >
            {children}
        </div>
    )
}

GanttEntry.propTypes = {
    children: PropTypes.node,
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
    dueDate: PropTypes.string.isRequired,
    enableFullHeight: PropTypes.bool,
    startDate: PropTypes.string,
    style: PropTypes.shape({})
}
GanttEntry.defaultProps = {
    children: undefined,
    enableFullHeight: false,
    startDate: undefined,
    style: {}
}
