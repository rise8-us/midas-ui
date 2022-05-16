import { DeleteOutlined } from '@mui/icons-material'
import { Box, IconButton, LinearProgress, Stack, Tooltip, Typography } from '@mui/material'
import { HrefText } from 'Components/HrefText'
import PropTypes from 'prop-types'
import { styled } from 'Styles/materialThemes'
import { normalise, roundedPercent } from 'Utilities/progressHelpers'

const StyledDiv = styled('div')(({ theme }) => ({
    borderRadius: theme.spacing(1),
    color: theme.palette.gantt.association.dark.text,
    background: theme.palette.gantt.association.dark.background,
    padding: theme.spacing(1),
}))

const StyledHrefText = styled(HrefText)(({ theme }) => ({
    color: theme.palette.gantt.association.dark.text,
}))

export default function GanttAssociatedEpic({ name, title, webUrl, onDelete, totalWeight, completedWeight }) {
    return (
        <StyledDiv>
            <Tooltip
                followCursor
                disableInteractive
                title = {roundedPercent(completedWeight, totalWeight)}
            >
                <Box display = 'flex' alignItems = 'center'>
                    <Typography
                        variant = 'body2'
                        color = 'text.secondary'
                        minWidth = {35}
                    >
                        {Math.floor(normalise(completedWeight, totalWeight)) + '%'}
                    </Typography>
                    <Box width = '100%' marginLeft = {1}>
                        <LinearProgress
                            variant = 'determinate'
                            value = {normalise(completedWeight, totalWeight)}
                            color = 'primary'
                            data-testid = 'GanttAssociatedEpic__epic-progress'
                        />
                    </Box>
                </Box>
            </Tooltip>
            <Stack direction = 'row' spacing = {1} alignItems = 'center'>
                {name &&
                    <>
                        <Typography>{name}</Typography>
                        <Typography color = 'secondary'>-</Typography>
                    </>
                }
                <StyledHrefText text = {title} href = {webUrl}/>
                {typeof onDelete === 'function' &&
                    <IconButton onClick = {onDelete} style = {{ marginLeft: 'auto' }}>
                        <DeleteOutlined fontSize = 'small'/>
                    </IconButton>
                }
            </Stack>
        </StyledDiv>
    )
}

GanttAssociatedEpic.propTypes = {
    name: PropTypes.string,
    onDelete: PropTypes.func,
    title: PropTypes.string.isRequired,
    webUrl: PropTypes.string,
    totalWeight: PropTypes.number,
    completedWeight: PropTypes.number,
}

GanttAssociatedEpic.defaultProps = {
    name: undefined,
    onDelete: undefined,
    webUrl: undefined,
    totalWeight: 0,
    completedWeight: 0,
}