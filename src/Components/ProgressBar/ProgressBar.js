import { ArrowDropUp, HikingOutlined } from '@mui/icons-material'
import { Collapse, LinearProgress, Stack, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { getTodayAsPercentageInRange } from 'Utilities/dateHelpers'
import { getNumberOrZero } from 'Utilities/getNumberOrZero'

const getProgessOrZero = (value, target) => getNumberOrZero(value / target * 100)

export default function ProgressBar({
    hasEdit,
    overlayDate,
    progressCompleteComponent,
    showPercent,
    target,
    timeout,
    value,
}) {

    const { start, end, show } = overlayDate

    const progressValue = Math.round(getProgessOrZero(value, target))
    const progressDate = getTodayAsPercentageInRange(start, end)

    return (
        <Stack spacing = {1} padding = {2}>
            <div style = {{ position: 'relative', marginBottom: '8px' }}>
                {!hasEdit &&
                    <div
                        style = {{
                            position: 'absolute',
                            marginLeft: `calc(${progressValue}% - 13px)`,
                            top: '-24px'
                        }}
                    >
                        <HikingOutlined/>
                    </div>
                }
                {show && progressValue < 100 &&
                    <Tooltip title = 'Today' placement = 'top' arrow>
                        <ArrowDropUp
                            style = {{
                                top: '-5px',
                                position: 'absolute',
                                marginLeft: `calc(${progressDate}% - 12px)`,
                                zIndex: 1
                            }}
                        />
                    </Tooltip>
                }
                <LinearProgress
                    variant = 'determinate'
                    value = {progressValue}
                    style = {{ position: 'absolute', width: '100%' }}
                />
            </div>
            <Collapse in = {showPercent} timeout = {timeout} collapsedSize = {0}>
                {progressCompleteComponent(progressValue, target, value)}
            </Collapse>
        </Stack>
    )
}

ProgressBar.propTypes = {
    hasEdit: PropTypes.bool,
    overlayDate: PropTypes.shape({
        end: PropTypes.string,
        show: PropTypes.bool,
        start: PropTypes.string,
    }),
    progressCompleteComponent: PropTypes.func,
    showPercent: PropTypes.bool,
    target: PropTypes.number,
    timeout: PropTypes.shape({
        enter: PropTypes.number,
        exit: PropTypes.number
    }),
    value: PropTypes.number,
}

ProgressBar.defaultProps = {
    hasEdit: false,
    hasHover: false,
    overlayDate: {
        end: undefined,
        show: false,
        start: undefined,
    },
    progressCompleteComponent: (percent, target, value) => (
        <Stack spacing = {1} direction = 'row' justifyContent = 'center'>
            <Typography variant = 'body2' color = 'primary'>
                {`${percent}% Complete`}
            </Typography>
            {target > 1 &&
            <Typography variant = 'body2' color = 'text.secondary'>
                ({value} / {target})
            </Typography>
            }
        </Stack>
    ),
    showPercent: true,
    target: 1,
    timeout: { enter: 1500, exit: 750 },
    value: 0,
}