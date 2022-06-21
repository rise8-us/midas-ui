import { EmojiEvents } from '@mui/icons-material'
import { Stack, Typography, useTheme } from '@mui/material'
import { capitalize } from 'Utilities/caseConversions'

export default function GanttLegend() {
    const theme = useTheme()

    const items = [
        { text: 'milestone', icon: null },
        { text: 'win', icon: <EmojiEvents color = 'primary' style = {{ marginLeft: '5px' }}/> },
        { text: 'event', icon: null },
        { text: 'target', icon: null },
    ]

    const getStyle = (item) => ({
        display: 'flex',
        alignContent: 'center',
        padding: '2px 4px',
        borderRadius: theme.spacing(1),
        border: `2px solid ${theme.palette.gantt[item].dark.background}`,
        backgroundColor: item === 'win'
            ? theme.palette.background.default
            : theme.palette.gantt[item].dark.background,
    })

    return (
        <Stack direction = 'row' justifyContent = 'center' spacing = {2} marginBottom = {1}>
            <Typography fontSize = '1.1rem' fontWeight = 'bold' alignSelf = 'center'>Legend:</Typography>
            {items.map((item, index) =>
                <span key = {index} style = {getStyle(item.text)}>
                    <Typography color = {theme.palette.gantt[item.text].dark.text} display = 'inline'>
                        {capitalize(item.text)}s
                    </Typography>
                    {item.icon}
                </span>
            )}
        </Stack>
    )
}