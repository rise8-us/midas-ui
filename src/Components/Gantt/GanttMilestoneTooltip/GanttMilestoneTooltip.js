import { Stack, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { parseStringToDate } from 'Utilities/dateHelpers'

export default function GanttMilestoneTooltip({ milestone }) {
    const { title, description, dueDate } = milestone

    return (
        <Stack>
            <Typography variant = 'h6'>{title}</Typography>
            <Typography color = 'text.secondary' variant = 'subtitle1'>{description}</Typography>
            <Typography fontStyle = 'italic'>{parseStringToDate(dueDate).toDateString()}</Typography>
        </Stack>
    )
}

GanttMilestoneTooltip.propTypes = {
    milestone: PropTypes.shape({
        title: PropTypes.string,
        dueDate: PropTypes.string,
        description: PropTypes.string,
    }).isRequired
}
