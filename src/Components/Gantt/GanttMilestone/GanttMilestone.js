import { Tooltip } from '@mui/material'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { requestDeleteMilestone } from 'Redux/Milestones/actions'
import MilestoneConstants from 'Redux/Milestones/constants'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { styled } from 'Styles/materialThemes'
import { parseStringToDate } from 'Utilities/dateHelpers'
import { parseDate } from 'Utilities/ganttHelpers'
import { GanttEntryHeader } from '../GanttEntryHeader'
import { GanttTooltip } from '../GanttTooltip'

const MilestoneFlagPole = styled('div')(({ theme }) => ({
    position: 'sticky',
    width: '3px',
    height: `calc(100% + ${theme.spacing(1)})`,
    background: theme.palette.gantt.milestone.dark.background,
    top: `-${theme.spacing(1)}`,
    '&:hover': {
        boxShadow: '0px 0px 8px 0px black'
    }
}))

const MilestoneFlag = styled('div')(({ theme }) => ({
    display: 'flex',
    left: '3px',
    justifyContent: 'center',
    color: theme.palette.gantt.milestone.dark.text,
    alignItems: 'center',
    width: 'fit-content',
    textAlign: 'left',
    maxWidth: 'calc(100vw - 48px - 76vw)',
    flexWrap: 'nowrap',
    background: theme.palette.gantt.milestone.dark.background,
    padding: theme.spacing(0, 1),
    borderRadius: theme.spacing(1),
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: `1px solid ${theme.palette.background.paper}`,
    borderLeft: 0,
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%)',
    '&:hover': {
        boxShadow: '0px 0px 12px 0px black'
    }
}))

export default function GanttMilestone({ milestone }) {
    const dispatch = useDispatch()

    const { portfolioId, dueDate, id, title, type } = milestone
    const dateString = parseDate(null, dueDate)
    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))

    const updateMilestone = () =>
        dispatch(openPopup(MilestoneConstants.UPDATE_MILESTONE, 'MilestonePopup', { id, portfolioId }))

    const deleteMilestone = () =>
        dispatch(openPopup(MilestoneConstants.DELETE_MILESTONE, 'DeletePopup', {
            id: id,
            title: title,
            type: type,
            request: requestDeleteMilestone,
            constant: MilestoneConstants.DELETE_MILESTONE
        }))

    return (
        <>
            <Tooltip
                arrow
                title = {
                    <GanttTooltip
                        dateRange = {parseStringToDate(milestone.dueDate).toDateString()}
                        description = {milestone.description}
                        milestone = {milestone}
                        onDeleteClick = {deleteMilestone}
                        onEditClick = {updateMilestone}
                        permissions = {permissions}
                        title = {milestone.title}
                    />
                }
            >
                <MilestoneFlag>
                    <div style = {{ maxWidth: 'calc(100vw - 48px - 76vw - 14px)' }}>
                        <GanttEntryHeader title = {milestone.title} dateRange = {dateString} />
                    </div>
                </MilestoneFlag>
            </Tooltip>
            <Tooltip
                arrow
                followCursor
                title = {
                    <GanttTooltip
                        dateRange = {parseStringToDate(milestone.dueDate).toDateString()}
                        description = {milestone.description}
                        milestone = {milestone}
                        onDeleteClick = {deleteMilestone}
                        onEditClick = {updateMilestone}
                        permissions = {permissions}
                        title = {milestone.title}
                    />
                }
            >
                <MilestoneFlagPole />
            </Tooltip>
        </>
    )
}

GanttMilestone.propTypes = {
    milestone: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        dueDate: PropTypes.string,
        description: PropTypes.string,
        type: PropTypes.string,
        portfolioId: PropTypes.number
    }).isRequired
}
