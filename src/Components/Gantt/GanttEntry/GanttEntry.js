import { Box } from '@mui/material'
import { PropTypes } from 'prop-types'
import { calculatePosition, parseStringToDate } from 'Utilities/dateHelpers'

export default function GanttEntry(props) {
    const { startDate, dueDate, index, dateRange, children, disableDefaultCSS } = props

    const start = parseStringToDate(startDate)
    const due = parseStringToDate(dueDate)
    const [startLeft, duration] = calculatePosition([start, due], dateRange)

    const defaultStyle = {
        position: 'absolute',
        left: `${startLeft}%`,
        width: `${duration}%`,
        zIndex: 3
    }

    const contentsBox = () => {
        return {
            ...defaultStyle,
            top: `${index * 56}px`,
        }
    }

    const contentsBox2 = () => {
        return {
            ...defaultStyle,
            top: '0px',
            height: '100%',
            width: 'auto',
        }
    }

    if (!startLeft) return null

    return (
        <Box data-testid = 'GanttEntry__wrap' sx = {disableDefaultCSS ? contentsBox2 : contentsBox}>
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
    disableDefaultCSS: PropTypes.bool
}
GanttEntry.defaultProps = {
    startDate: undefined,
    children: undefined,
    disableDefaultCSS: false
}

//TODO: If entry is not visible, it should not extend max height.