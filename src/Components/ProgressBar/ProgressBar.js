import { FlagOutlined, HikingOutlined, SportsScoreOutlined } from '@mui/icons-material'
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
            <Stack>
                {hasEdit && hasHover &&
                    <Box justifyContent = 'space-between' display = 'flex'>
                        <AutoSaveTextField
                            canEdit = {hasEdit}
                            disabled = {!hasEdit}
                            initialValue = {value.toString()}
                            onSave = {onSaveValue}
                            revertOnEmpty
                            InputProps = {{
                                startAdornment: (<FlagOutlined color = 'secondary' style = {{ marginLeft: '-5px' }}/>),
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
                                    <SportsScoreOutlined color = 'secondary' style = {{ marginRight: '-5px' }}/>
                                ),
                                disableUnderline: true
                            }}
                            revertOnEmpty
                        />
                    </Box>
                }
                <div style = {{ position: 'relative' }}>
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
                        <Tooltip title = 'Today' position = 'top-center' arrow>
                            <div
                                style = {{
                                    top: '-6px',
                                    width: '2px',
                                    height: '18px',
                                    borderLeft: '2px solid',
                                    borderColor: '#c3c3c3',
                                    position: 'absolute',
                                    marginLeft: `calc(${progressDate}% - 1px)`
                                }}
                            />
                        </Tooltip>
                    }
                    <LinearProgress
                        variant = 'determinate'
                        value = {progressValue}
                        style = {{ position: 'absolute', width: '100%', zIndex: -1 }}
                    />
                </div>
            </Stack>
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