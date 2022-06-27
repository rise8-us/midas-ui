import { Stack, Tooltip, Typography } from '@mui/material'
import tooltips from 'Constants/Tooltips'
import { format, formatDistanceToNow, formatDuration } from 'date-fns'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

export default function ProductDoraMetrics({ releasedAt, showReleasedAt, sprintMetrics }) {
    const { deliveredStories, deliveredPoints, releaseFrequency } = sprintMetrics

    const durationString = useMemo(() => {
        if (releaseFrequency) {
            const freq =  1 / releaseFrequency
            const days = Math.floor(freq)
            const hours = (freq % 1) * 24
            return formatDuration({
                days: days,
                hours: Math.floor(hours),
            })
        }
        return 'No Releases'
    }, [releaseFrequency])

    return (
        <Stack spacing = {0.5} marginBottom = {2}>
            <Stack direction = 'row' alignItems = 'baseline' spacing = {0.5}>
                <Typography variant = 'body2'>Closed Issues:</Typography>
                <Typography fontWeight = 'bold'>{deliveredStories}</Typography>
            </Stack>
            <Stack direction = 'row' alignItems = 'baseline' spacing = {0.5}>
                <Typography variant = 'body2'>Points Delivered:</Typography>
                <Typography fontWeight = 'bold'>{deliveredPoints}</Typography>
            </Stack>
            <Tooltip title = {tooltips.DORA_RELEASE_FREQUENCY}>
                <Stack direction = 'row' alignItems = 'baseline' spacing = {0.5}>
                    <Typography variant = 'body2'>Release Frequency:</Typography>
                    <Typography fontWeight = 'bold'>{durationString}</Typography>
                </Stack>
            </Tooltip>
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
        releaseFrequency: PropTypes.number,
    }),
}

ProductDoraMetrics.defaultProps = {
    releasedAt: null,
    showReleasedAt: true,
    sprintMetrics: {},
}
