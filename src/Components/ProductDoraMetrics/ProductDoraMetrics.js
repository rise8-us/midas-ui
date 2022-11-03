import { Stack, Typography } from '@mui/material'
import { TextSkeleton } from 'Components/Skeletons'
import tooltips from 'Constants/Tooltips'
import { format, formatDistanceToNow, formatDuration } from 'date-fns'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { LabelTooltip } from '../LabelTooltip'

function getFormatDuration(value, hours) {
    return {
        days: hours === 24 ? Math.floor(value) + 1 : Math.floor(value),
        hours: hours === 24 ? 0 : hours,
    }
}

export default function ProductDoraMetrics({
    deliveredPointsAverage,
    loading,
    releasedAt,
    showReleasedAt,
    sprintMetrics
}) {
    const {
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

    const formatReleasedAt = (date) => {
        const newDate = new Date(date)
        const releasedAtDate = formatDistanceToNow(newDate, { includeSeconds: true, addSuffix: true })

        return releasedAtDate.charAt(0).toUpperCase() + releasedAtDate.slice(1)
        + ' - ' +
        format(newDate, 'PPpp')
    }

    const metrics = [
        {
            title: 'Average Velocity:',
            value: Math.floor(deliveredPointsAverage),
            tooltip: tooltips.VELOCITY_DURATION
        },
        {
            title: 'Lead Time for Change:',
            value: leadTimeForChangeString,
            tooltip: tooltips.DORA_LEAD_TIME_FOR_CHANGE
        },
        {
            title: 'Release Frequency:',
            value: releaseFrequencyString,
            tooltip: tooltips.DORA_RELEASE_FREQUENCY
        },
    ]

    return (
        <Stack spacing = {0.5} marginBottom = {2}>
            {metrics.map((metric, index) =>
                <Stack key = {index} direction = 'row' alignItems = 'baseline' spacing = {0.5}>
                    <Typography variant = 'body2' width = '50%' minWidth = '155px'>{metric.title}</Typography>
                    <LabelTooltip
                        text = {<TextSkeleton loading = {loading} text = {metric.value} width = {24}/>}
                        iconFontSize = 'small'
                        typographyProps = {{
                            variant: 'body2',
                            color: 'text.primary',
                            fontWeight: 'bold'
                        }}
                        tooltipProps = {{
                            title: metric.tooltip ?? 'placeholder',
                            placement: 'bottom-start',
                            arrow: true
                        }}
                    />
                </Stack>
            )}
            {showReleasedAt &&
                <Stack direction = 'row' alignItems = 'baseline' spacing = {0.5}>
                    <Typography variant = 'body2' width = '50%' minWidth = '155px'>Latest Release:</Typography>
                    {releasedAt ?
                        <Typography
                            variant = 'body2'
                            color = 'text.primary'
                            fontWeight = 'bold'
                            data-testid = 'ProductDoraMetrics__last-release'
                            width = '100%'
                        >
                            <TextSkeleton
                                loading = {loading}
                                text = {formatReleasedAt(releasedAt)}
                                width = {24}
                            />
                        </Typography>
                        :
                        <Typography
                            variant = 'body2'
                            color = 'secondary'
                            fontStyle = 'italic'
                            data-testid = 'ProductDoraMetrics__no-release'
                            width = '100%'
                        >
                            <TextSkeleton loading = {loading} text = 'N/A' width = {24}/>
                        </Typography>
                    }
                </Stack>
            }
        </Stack>
    )
}

ProductDoraMetrics.propTypes = {
    deliveredPointsAverage: PropTypes.number,
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
    deliveredPointsAverage: undefined,
    loading: false,
    releasedAt: null,
    showReleasedAt: true,
    sprintMetrics: {},
}
