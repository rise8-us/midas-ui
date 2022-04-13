import { Box } from '@mui/material'
import { PropTypes } from 'prop-types'
import { calculatePosition, parseStringToDate } from 'Utilities/dateHelpers'

function GanttMilestone({ milestone, index, dateRange }) {

    const dueDate = parseStringToDate(milestone.dueDate)

    const [shouldRender, position] = calculatePosition([null, dueDate], dateRange)

    const sxMilestone = {
        position: 'absolute',
        left: `${position}%`,
        width: '3px',
        marginLeft: '10px',
        background: 'black',
        zIndex: 4,
        height: '100%',
        top: 0
    }

    const sxFlag = {
        position: 'absolute',
        left: `${position}%`,
        top: `${index * 25}px`,
        marginTop: '2px',
        background: 'black',
        paddingX: '10px',
        zIndex: 4
    }

    return (
        <div>
            {shouldRender && <Box sx = {sxMilestone}>
                <Box sx = {sxFlag}>
                    {milestone.title}
                </Box>
            </Box>}
        </div>
    )
}

GanttMilestone.propTypes = {
    milestone: PropTypes.shape({
        title: PropTypes.string,
        dueDate: PropTypes.string,
        description: PropTypes.string
    }).isRequired,
    index: PropTypes.number.isRequired,
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired
}

export default GanttMilestone
