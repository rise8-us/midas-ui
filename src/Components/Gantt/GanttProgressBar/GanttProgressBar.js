import { LinearProgress, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { normalise, roundedPercent } from 'Utilities/progressHelpers'

export default function GanttProgressBar({ currentValue, targetValue, dataTestId }) {

    return (
        <Tooltip
            followCursor
            disableInteractive
            title = {roundedPercent(currentValue, targetValue)}
        >
            <div style = {{ display: 'flex', alignItems: 'center' }} data-testid = {dataTestId} >
                <LinearProgress
                    variant = 'determinate'
                    color = 'primary'
                    value = {normalise(currentValue, targetValue)}
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
                        color: 'black',
                        lineHeight: '14px'
                    }}
                >
                    {Math.floor(normalise(currentValue, targetValue)) + '%'}
                </Typography>
            </div>
        </Tooltip>
    )
}

GanttProgressBar.propTypes = {
    dataTestId: PropTypes.string,
    targetValue: PropTypes.number,
    currentValue: PropTypes.number,
}

GanttProgressBar.defaultProps = {
    dataTestId: 'GanttProgressBar__default',
    targetValue: 0,
    currentValue: 0,
}