import { Typography } from '@mui/material'
import PropTypes from 'prop-types'

export default function GanttEntryHeader({ title, dateRange }) {
    return (
        <>
            <Typography whiteSpace = 'nowrap' textOverflow = 'ellipsis' overflow = 'hidden'>
                {title}
            </Typography>
            <Typography whiteSpace = 'nowrap' textOverflow = 'ellipsis' overflow = 'hidden'>
                {dateRange}
            </Typography>
        </>
    )
}

GanttEntryHeader.propTypes = {
    title: PropTypes.string.isRequired,
    dateRange: PropTypes.node,
}

GanttEntryHeader.defaultProps = {
    dateRange: ''
}