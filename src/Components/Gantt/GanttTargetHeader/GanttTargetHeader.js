import { Typography } from '@mui/material'
import PropTypes from 'prop-types'

export default function GanttTargetHeader({ title, dateRange }) {
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

GanttTargetHeader.propTypes = {
    title: PropTypes.string.isRequired,
    dateRange: PropTypes.node,
}

GanttTargetHeader.defaultProps = {
    dateRange: ''
}