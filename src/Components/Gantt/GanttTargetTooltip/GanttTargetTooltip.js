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

export default function GanttTargetTooltip({ target }) {
    const { title, description, startDate, dueDate } = target

    return (
        <Stack>
            <Typography variant = 'h6'>{title}</Typography>
            <Typography color = 'text.secondary' variant = 'subtitle2'>{description}</Typography>
            <Typography>Start Date:</Typography>
            <StyledTypography>
                {parseStringToDate(startDate).toDateString()}
            </StyledTypography>
            <Typography>Due Date:</Typography>
            <StyledTypography>
                {parseStringToDate(dueDate).toDateString()}
            </StyledTypography>
        </Stack>
    )
}

GanttTargetTooltip.propTypes = {
    target: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        dueDate: PropTypes.string,
        startDate: PropTypes.string,
    }).isRequired
}
