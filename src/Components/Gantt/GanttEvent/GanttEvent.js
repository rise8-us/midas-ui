import { Box } from '@mui/material'
import { PropTypes } from 'prop-types'

const defaultGanttEntryStyling = (theme) => {
    return {
        borderRadius: '4px',
        background: theme.palette.grey[800],
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%)',
        textAlign: 'left',
    }
}

export default function GanttEvent({ event }) {

    return (
        <Box data-testid = 'GanttEntry__defaultEntryWrapper' sx = {defaultGanttEntryStyling}>
            <p style = {{ marginBlock: 0, padding: '8px' }}>
                {event.title}
            </p>
        </Box>
    )
}

GanttEvent.propTypes = {
    event: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired
}