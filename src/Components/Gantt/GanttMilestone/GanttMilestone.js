import { DeleteOutline, Edit } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { requestDeleteMilestone } from 'Redux/Milestones/actions'
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

    const deleteMilestone = () => {
        dispatch(requestDeleteMilestone(milestone.id))
    }

    return (
        <div>
            {shouldRender && <Box sx = {sxMilestone}>
                <Box sx = {sxFlag}>
                    <Typography>
                        {milestone.title}
                    </Typography>
                    {permissions.edit &&
                    <div style = {{ display: 'flex', paddingLeft: '10px' }}>
                        <IconButton
                            onClick = {updateMilestone}
                            color = 'secondary'
                            data-testid = 'GanttMilestone__button-edit'
                            size = 'small'
                        >
                            <Edit fontSize = 'small'/>
                        </IconButton>
                        <IconButton
                            onClick = {deleteMilestone}
                            color = 'secondary'
                            data-testid = 'GanttMilestone__button-delete'
                            size = 'small'
                        >
                            <DeleteOutline fontSize = 'small'/>
                        </IconButton>
                    </div>
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
