import { Stack, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { styled } from 'Styles/materialThemes'
import { parseStringToDate } from 'Utilities/dateHelpers'

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
    fontSize: '14px',
    paddingLeft: theme.spacing(1)
}))
export default function GanttMilestoneTooltip({ milestone }) {
    const { title, description, dueDate } = milestone

    return (
        <Stack>
            <Typography variant = 'h6'>{title}</Typography>
            <Typography color = 'text.secondary' variant = 'subtitle2'>{description}</Typography>
            <Typography>Due Date:</Typography>
            <StyledTypography>
                {parseStringToDate(dueDate).toDateString()}
            </StyledTypography>
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
