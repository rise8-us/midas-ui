import { Box, Stack, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'

const calculatePosition = (dateRangeEntry, totalDateRange) => {

    const range = totalDateRange[1] - totalDateRange[0]
    const start = (dateRangeEntry[0] - totalDateRange[0]) / range
    const end = (dateRangeEntry[1] - totalDateRange[0]) / range
    return [start * 100, Math.abs(end - start) * 100]
}
function GanttEntry({ entry, index, dateRange }) {
    const [startPos, duration] = calculatePosition([entry.startDate, entry.endDate], dateRange)

    const contentsBox = (theme) => {
        return {
            display: 'block',
            position: 'absolute',
            borderRadius: '4px',
            top: `${16 + index * 56}px`,
            left: `${startPos}%`,
            width: `${duration}%`,
            zIndex: 3,
            background: theme.palette.grey[800],
            boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%)',
            textAlign: 'left'
        }
    }

    return (
        <Box data-testid = 'GanttEntry__entry-button' sx = {contentsBox}>
            { duration > 0 && <Stack padding = {1}>
                <Typography>
                    {entry.title}
                </Typography>
            </Stack>}
        </Box>
    )
}

GanttEntry.propTypes = {
    entry: PropTypes.shape({
        title: PropTypes.string,
        startDate: PropTypes.instanceOf(Date),
        endDate: PropTypes.instanceOf(Date),
        details: PropTypes.string,
        completion: PropTypes.number
    }).isRequired,
    index: PropTypes.number.isRequired,
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired
}

export default GanttEntry

//TODO: If entry is not visible, it should not extend max height.
