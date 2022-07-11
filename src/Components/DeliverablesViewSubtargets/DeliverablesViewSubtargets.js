import { useTheme } from '@emotion/react'
import { Box, LinearProgress, Stack, Tooltip, Typography } from '@mui/material'
import { DeliverablesViewEpics } from 'Components/DeliverablesViewEpics'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectEpicsByIds } from 'Redux/Epics/selectors'
import { getTotalWeights, normalise, roundedPercent } from 'Utilities/progressHelpers'

export default function DeliverablesViewSubtargets({ subtarget }) {
    const theme = useTheme()

    const epics = useSelector(state => selectEpicsByIds(state, subtarget.epicIds))
    const [totalWeight, totalCompletedWeight] = getTotalWeights(epics)
    const progressValue = normalise(totalCompletedWeight, totalWeight)

    return (
        <Stack marginTop = {1} paddingLeft = {1} borderLeft = {'1px solid ' + theme.palette.background.default}>
            <Typography variant = 'h7'>{subtarget.title}</Typography>
            <Tooltip
                followCursor
                disableInteractive
                title = {roundedPercent(totalCompletedWeight, totalWeight)}
            >
                {epics.length > 0 ?
                    <Box display = 'flex' alignItems = 'center'>
                        <Box minWidth = {35}>
                            <Typography variant = 'body2' color = 'text.secondary'>
                                {Math.floor(normalise(totalCompletedWeight, totalWeight)) + '%'}
                            </Typography>
                        </Box>
                        <Box width = '100%' marginLeft = {1}>
                            <LinearProgress
                                variant = 'determinate'
                                value = {progressValue}
                                color = 'primary'
                                data-testid = 'DeliverablesViewSubtargets__progress-bar'
                            />
                        </Box>
                    </Box>
                    :
                    <Typography variant = 'body2' color = 'text.secondary'>No Epics linked</Typography>
                }
            </Tooltip>
            {epics.map((epic, index) => (
                <DeliverablesViewEpics epic = {epic} key = {index}/>
            ))}
        </Stack>
    )
}

DeliverablesViewSubtargets.propTypes = {
    subtarget: PropTypes.object
}

DeliverablesViewSubtargets.defaultProps = {
    subtarget: {}
}