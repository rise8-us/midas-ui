import { LinearProgress, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { normalise, roundedPercent } from 'Utilities/progressHelpers'

const dayInMilliseconds = 24 * 60 * 60 * 1000

export default function GanttProgressBar(props) {

    const { currentValue, targetValue, dataTestId, startDate, endDate } = props

    const progressValue = normalise(currentValue, targetValue)

    const getProgressBarColor = () => {
        const today = new Date().getTime()
        const start = new Date(startDate).getTime()
        const end = new Date(endDate).getTime()

        const currentDay = (today - start) / dayInMilliseconds
        const totalDays = (end - start) / dayInMilliseconds

        const daysPercentage = normalise(currentDay, totalDays)

        if (progressValue > (daysPercentage + 10) || progressValue === 100) {
            return 'success'
        } else if (progressValue < (daysPercentage - 10)) {
            return 'error'
        }

        return 'warning'
    }

    return (
        <Tooltip
            followCursor
            disableInteractive
            title = {roundedPercent(currentValue, targetValue)}
        >
            <div
                style = {{ display: 'flex', alignItems: 'center' }}
                data-testid = {dataTestId}
            >
                <LinearProgress
                    variant = 'determinate'
                    color = {getProgressBarColor()}
                    value = {progressValue}
                    style = {{ width: '100%', height: 14 }}
                />
                <Typography
                    variant = 'overline'
                    minWidth = {35}
                    style = {{
                        position: 'relative',
                        marginRight: '-100%',
                        right: '50%',
                        transform: 'translate(-50%, 0)',
                        color: progressValue > 51 ? 'black' : 'white',
                        lineHeight: '14px'
                    }}
                >
                    {Math.floor(progressValue) + '%'}
                </Typography>
            </div>
        </Tooltip>
    )
}

GanttProgressBar.propTypes = {
    currentValue: PropTypes.number,
    dataTestId: PropTypes.string,
    endDate: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    targetValue: PropTypes.number,
}

GanttProgressBar.defaultProps = {
    currentValue: 0,
    dataTestId: 'GanttProgressBar__default',
    targetValue: 0,
}