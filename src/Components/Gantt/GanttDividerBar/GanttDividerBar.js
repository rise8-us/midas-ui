import { PropTypes } from 'prop-types'
import { calculatePosition } from 'Utilities/dateHelpers'

export default function GanttDividerBar({ dateRange, color }) {

    const [dividerPosition] = calculatePosition([new Date(), null], dateRange)

    const sxDivider = {
        top: '0px',
        position: 'absolute',
        left: `calc(${dividerPosition}% + 3px)`,
        height: '100%',
        width: '3px',
        background: color,
        zIndex: 1
    }

    return (<>{dividerPosition && <div style = {sxDivider} />}</>)
}

GanttDividerBar.propTypes = {
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
    color: PropTypes.string.isRequired,
}