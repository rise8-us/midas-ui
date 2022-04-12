import { Box } from '@mui/material'
import { PropTypes } from 'prop-types'
import { calculatePositionRange, calculateSinglePosition, parseStringToDate } from 'Utilities/dateHelpers'

export default function GanttEntry(props) {
    const { startDate, dueDate, index, dateRange, children, disableDefaultCSS } = props

    const start = parseStringToDate(startDate)
    const due = parseStringToDate(dueDate)
    const [startPos, duration] = start ?
        calculatePositionRange([start, due], dateRange) :
        calculateSinglePosition(dateRange, due)

    const defaultStyle = {
        display: 'inline',
        position: 'absolute',
        left: `${startPos}%`,
        width: `${duration}%`,
        zIndex: 3
    }

    const contentsBox = () => {
        return {
            ...defaultStyle,
            top: `${index * 56 + 32}px`,
        }
    }

    const contentsBox2 = () => {
        return {
            ...defaultStyle,
            top: '32px',
            height: '100%',
            width: '100%'
        }
    }

    return (
        <Box data-testid = 'GanttEntry__wrap' sx = {disableDefaultCSS ? contentsBox2 : contentsBox}>
            {duration > 0 && <>{children}</>}
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