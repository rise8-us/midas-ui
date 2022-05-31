import { Box, Grid, LinearProgress, Stack, Tooltip, Typography } from '@mui/material'
import { HrefText } from 'Components/HrefText'
import PropTypes from 'prop-types'
import { normalise, roundedPercent } from 'Utilities/progressHelpers'

export default function DeliverablesViewEpics({ epic }) {

    const { title, webUrl, completedWeight, totalWeight } = epic

    return (
        <Stack marginTop = {1} paddingLeft = {1}>
            <Grid container alignItems = 'center'>
                <Grid item xs = {8}>
                    <Tooltip
                        followCursor
                        disableInteractive
                        title = {roundedPercent(completedWeight, totalWeight)}
                    >
                        <div>
                            <HrefText
                                text = {title}
                                href = {webUrl}
                                color = 'secondary'
                            />
                        </div>
                    </Tooltip>
                </Grid>
            </Grid>
            <Tooltip
                followCursor
                disableInteractive
                title = {roundedPercent(completedWeight, totalWeight)}
            >
                <Box display = 'flex' alignItems = 'center'>
                    <Box minWidth = {35}>
                        <Typography variant = 'body2' color = 'text.secondary'>
                            {Math.floor(normalise(completedWeight, totalWeight)) + '%'}
                        </Typography>
                    </Box>
                    <Box width = '100%' marginLeft = {1}>
                        <LinearProgress
                            variant = 'determinate'
                            value = {normalise(completedWeight, totalWeight)}
                            color = 'primary'
                            data-testid = 'DeliverablesViewEpics__progress-bar'
                        />
                    </Box>
                </Box>
            </Tooltip>
        </Stack>
    )
}

DeliverablesViewEpics.propTypes = {
    epic: PropTypes.object
}

DeliverablesViewEpics.defaultProps = {
    epic: {}
}