import { ArrowDropUp, FlagOutlined, HikingOutlined, SportsScoreOutlined } from '@mui/icons-material'
import { Box, LinearProgress, Stack, Tooltip, Typography } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import PropTypes from 'prop-types'
import React from 'react'
import { getTodayAsPercentageInRange } from 'Utilities/dateHelpers'
import { getNumberOrZero } from 'Utilities/getNumberOrZero'

const getProgessOrZero = (value, target) => getNumberOrZero(value / target * 100)
export default function ProgressBar({
    hasEdit,
    hasHover,
    onSaveTarget,
    onSaveValue,
    overlayDate,
    progressCompleteComponent,
    showPercent,
    target,
    value
}) {

    const { start, end, show } = overlayDate

    const progressValue = Math.round(getProgessOrZero(value, target))
    const progressDate = getTodayAsPercentageInRange(start, end)

    return (
        <Stack spacing = {1} padding = {2}>
            {hasEdit && hasHover &&
                <Box justifyContent = 'space-between' display = 'flex'>
                    <AutoSaveTextField
                        canEdit = {hasEdit}
                        disabled = {!hasEdit}
                        initialValue = {value.toString()}
                        onSave = {onSaveValue}
                        revertOnEmpty
                        InputProps = {{
                            startAdornment: (
                                <Tooltip title = 'Current value towards completion' arrow>
                                    <FlagOutlined color = 'secondary' style = {{ marginLeft: '-5px' }}/>
                                </Tooltip>
                            ),
                            disableUnderline: true
                        }}
                    />
                    <AutoSaveTextField
                        inputProps = {{
                            style: { textAlign: 'end' },
                        }}
                        canEdit = {hasEdit}
                        disabled = {!hasEdit}
                        initialValue = {target.toString()}
                        onSave = {onSaveTarget}
                        InputProps = {{
                            endAdornment: (
                                <Tooltip title = 'Target value for completion' arrow>
                                    <SportsScoreOutlined color = 'secondary' style = {{ marginRight: '-5px' }}/>
                                </Tooltip>
                            ),
                            disableUnderline: true
                        }}
                        revertOnEmpty
                    />
                </Box>
            }
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
                {show &&
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
            {showPercent && progressCompleteComponent(progressValue)}
        </Stack>
    )
}

ProgressBar.propTypes = {
    hasEdit: PropTypes.bool,
    hasHover: PropTypes.bool,
    onSaveTarget: PropTypes.func.isRequired,
    onSaveValue: PropTypes.func.isRequired,
    overlayDate: PropTypes.shape({
        end: PropTypes.string,
        show: PropTypes.bool,
        start: PropTypes.string,
    }),
    progressCompleteComponent: PropTypes.func,
    showPercent: PropTypes.bool,
    target: PropTypes.number,
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
    progressCompleteComponent: (percent) => (
        <Typography variant = 'body2' color = 'primary' width = '100%' textAlign = 'center'>
            {`${percent}% Complete`}
        </Typography>
    ),
    showPercent: true,
    target: 1,
    value: 0,
}