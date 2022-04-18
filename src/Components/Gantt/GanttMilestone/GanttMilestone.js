import { Edit } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import MilestoneConstants from 'Redux/Milestones/constants'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { calculatePosition, parseStringToDate } from 'Utilities/dateHelpers'

function GanttMilestone({ milestone, dateRange, portfolioId }) {

    const dispatch = useDispatch()
    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))

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
        alignItems: 'center',
        display: 'flex',
        left: `${position}%`,
        marginTop: '2px',
        background: 'black',
        paddingX: '10px',
        zIndex: 4
    }

    const updateMilestone = () =>
        dispatch(openPopup(MilestoneConstants.UPDATE_MILESTONE, 'MilestonePopup', {
            id: milestone.id,
            portfolioId: portfolioId
        }))

    return (
        <div>
            {shouldRender && <Box sx = {sxMilestone}>
                <Box sx = {sxFlag}>
                    <Typography>
                        {milestone.title}
                    </Typography>
                    {permissions.edit &&
                        <IconButton
                            onClick = {updateMilestone}
                            color = 'secondary'
                            data-testid = 'GanttMilestone__button-edit'
                            size = 'small'
                        >
                            <Edit fontSize = 'small'/>
                        </IconButton>
                    }
                </Box>
            </Box>}
        </div>
    )
}

GanttMilestone.propTypes = {
    milestone: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        dueDate: PropTypes.string,
        description: PropTypes.string
    }).isRequired,
    portfolioId: PropTypes.number.isRequired,
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired
}

export default GanttMilestone
