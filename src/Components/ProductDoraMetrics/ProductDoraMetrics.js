import { Stack, Tooltip, Typography } from '@mui/material'
import { format, formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default function ProductDoraMetrics({ releasedAt, showReleasedAt, sprintMetrics }) {

    return (
        <Stack spacing = {0.5} marginBottom = {2}>
            <Stack direction = 'row' alignItems = 'baseline' spacing = {0.5}>
                <Typography variant = 'body2'>Closed Issues:</Typography>
                <Typography fontWeight = 'bold'>{sprintMetrics.deliveredStories}</Typography>
            </Stack>
            <Stack direction = 'row' alignItems = 'baseline' spacing = {0.5}>
                <Typography variant = 'body2'>Points Delivered:</Typography>
                <Typography fontWeight = 'bold'>{sprintMetrics.deliveredPoints}</Typography>
            </Stack>
            {showReleasedAt &&
                <Tooltip
                    title = {format(new Date(releasedAt), 'PPpp')}
                    disableHoverListener = {!releasedAt}
                    placement = 'bottom-start'
                >
                    <Stack direction = 'row' alignItems = 'baseline' spacing = {0.5}>
                        <Typography variant = 'body2'>Latest Release:</Typography>
                        {releasedAt ?
                            <Typography fontWeight = 'bold' data-testid = 'ProductDoraMetrics__last-release'>
                                {formatDistanceToNow(
                                    new Date(releasedAt),
                                    { includeSeconds: true, addSuffix: true }
                                )}
                            </Typography>
                            :
                            <Typography color = 'secondary'><i>N/A</i></Typography>
                        }
                    </Stack>
                </Tooltip>
            }
        </Stack>
    )
}

ProductDoraMetrics.propTypes = {
    releasedAt: PropTypes.string,
    showReleasedAt: PropTypes.bool,
    sprintMetrics: PropTypes.shape({
        deliveredStories: PropTypes.number,
        deliveredPoints: PropTypes.number,
    }),
}

ProductDoraMetrics.defaultProps = {
    releasedAt: null,
    showReleasedAt: true,
    sprintMetrics: {},
}
