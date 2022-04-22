import { Stack, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useSelector } from 'react-redux'
import { selectUsersByIds } from 'Redux/Users/selectors'
import { styled } from 'Styles/materialThemes'
import { parseStringToDate } from 'Utilities/dateHelpers'

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
    fontSize: '14px',
    paddingLeft: theme.spacing(1)
}))

export default function GanttEventTooltip({ event }) {
    const { title, description, startDate, dueDate, location, organizerIds } = event

    const organizers = useSelector(state => selectUsersByIds(state, organizerIds))

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
            <Typography>Location:</Typography>
            <StyledTypography>
                {location }
            </StyledTypography>
            <Typography>Organizers:</Typography>
            {organizers.map((organizer, index) => (
                <StyledTypography key = {index}>
                    {organizer.displayName}
                </StyledTypography>
            ))
            }
        </Stack>
    )
}

GanttEventTooltip.propTypes = {
    event: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        dueDate: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        location: PropTypes.string,
        organizerIds: PropTypes.arrayOf(PropTypes.number)
    })
}

GanttEventTooltip.defaultProps = {
    event: PropTypes.shape({
        description: '',
        location: '',
        organizerIds: []
    })
}
