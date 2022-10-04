import { Typography } from '@mui/material'

export default function ClosedLabel() {
    return (
        <Typography
            color = 'epic.closed.text'
            backgroundColor = 'epic.closed.background'
            style = {{
                padding: '0 4px',
                fontSize: '12px',
                borderRadius: '2px',
                lineHeight: '20px'
            }}
        >
            CLOSED
        </Typography>
    )
}
