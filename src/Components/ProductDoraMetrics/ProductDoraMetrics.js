import { Stack, Tooltip, Typography } from '@mui/material'
import { TextSkeleton } from 'Components/Skeletons'
import tooltips from 'Constants/Tooltips'
import { format, formatDistanceToNow, formatDuration } from 'date-fns'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

function getFormatDuration(value, hours) {
    return {
        days: hours === 24 ? Math.floor(value) + 1 : Math.floor(value),
        hours: hours === 24 ? 0 : hours,
    };
}

export default function ProductDoraMetrics({ loading, releasedAt, showReleasedAt, sprintMetrics }) {
    const {
        deliveredStories,
        deliveredPoints,
        releaseFrequencyThreeSprints,
        leadTimeForChangeInMinutes
    } = sprintMetrics

    const releaseFrequencyString = useMemo(() => {
        if (releaseFrequencyThreeSprints) {
            const freq =  1 / releaseFrequencyThreeSprints
            const hours = Math.round((freq % 1) * 24)
            return formatDuration(getFormatDuration(freq, hours))
        }
        return 'No Releases'
    }, [releaseFrequencyThreeSprints])

    const leadTimeForChangeString = useMemo(() => {
        if (leadTimeForChangeInMinutes > 0) {
            const days = leadTimeForChangeInMinutes / 60 / 24
            const hours = Math.round((days % 1) * 24)
            return formatDuration(getFormatDuration(days, hours))
        }
        return 'No Releases'
    }, [leadTimeForChangeInMinutes])

    const metrics = [
        { title: 'Closed Issues:', value: deliveredStories },
        { title: 'Points Delivered:', value: deliveredPoints },
        { title: 'Lead Time for Change:', value: leadTimeForChangeString, tooltip: tooltips.DORA_LEAD_TIME_FOR_CHANGE },
        {
            title: 'Release Frequency (Last 3 Sprints):',
            value: releaseFrequencyString,
            tooltip: tooltips.DORA_RELEASE_FREQUENCY
        },
    ]

    return (
        <Stack spacing = {0.5} marginBottom = {2}>
            {metrics.map((metric, index) =>
                <Tooltip key = {index} title = {metric.tooltip ?? ''}>
                    <Stack direction = 'row' alignItems = 'baseline' spacing = {0.5}>
                        <Typography variant = 'body2'>{metric.title}</Typography>
                        <Typography fontWeight = 'bold'>
                            <TextSkeleton loading = {loading} text = {metric.value} width = {24}/>
                        </Typography>
                    </Stack>
                </Tooltip>
            )}
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
                                <TextSkeleton
                                    loading = {loading}
                                    text = {formatDistanceToNow(
                                        new Date(releasedAt),
                                        { includeSeconds: true, addSuffix: true }
                                    )}
                                    width = {24}
                                />
                                {}
                            </Typography>
                            :
                            <Typography color = 'secondary' fontStyle = 'italic'>
                                <TextSkeleton loading = {loading} text = 'N/A' width = {24}/>
                            </Typography>
                        }
                    </Stack>
                </Tooltip>
            }
        </Stack>
    )
}

ProductDoraMetrics.propTypes = {
    loading: PropTypes.bool,
    releasedAt: PropTypes.string,
    showReleasedAt: PropTypes.bool,
    sprintMetrics: PropTypes.shape({
        deliveredStories: PropTypes.number,
        deliveredPoints: PropTypes.number,
        releaseFrequencyThreeSprints: PropTypes.number,
        leadTimeForChangeInMinutes: PropTypes.number,
    }),
}

ProductDoraMetrics.defaultProps = {
    loading: false,
    releasedAt: null,
    showReleasedAt: true,
    sprintMetrics: {},
}
