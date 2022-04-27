import { DeleteOutline, Edit } from '@mui/icons-material'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { requestDeleteMilestone } from 'Redux/Milestones/actions'
import MilestoneConstants from 'Redux/Milestones/constants'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { styled } from 'Styles/materialThemes'
import { parseDate } from 'Utilities/ganttHelpers'
import { GanttMilestoneTooltip } from '../GanttMilestoneTooltip'

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
            <Tooltip title = {<GanttMilestoneTooltip milestone = {milestone}/>} arrow followCursor>
                <MilestoneFlag>
                    <div style = {{ maxWidth: permissions.edit ? 'calc(100vw - 48px - 76vw - 76px)' : '100%' }}>
                        <Typography whiteSpace = 'nowrap' textOverflow = 'ellipsis' overflow = 'hidden' >
                            {title}
                        </Typography>
                        <Typography whiteSpace = 'nowrap' textOverflow = 'ellipsis' overflow = 'hidden'>
                            {dateString}
                        </Typography>
                    </div>
                    {permissions.edit &&
                        <div style = {{ display: 'flex', maxHeight: '40px' }}>
                            <IconButton
                                onClick = {updateMilestone}
                                data-testid = 'GanttMilestone__button-edit'
                                size = 'small'
                            >
                                <Edit fontSize = 'small' htmlColor = 'black'/>
                            </IconButton>
                            <IconButton
                                onClick = {deleteMilestone}
                                data-testid = 'GanttMilestone__button-delete'
                                size = 'small'
                            >
                                <DeleteOutline fontSize = 'small' htmlColor = 'black'/>
                            </IconButton>
                        </div>
                    }
                </MilestoneFlag>
            </Tooltip>
            <Tooltip title = {<GanttMilestoneTooltip milestone = {milestone}/>} arrow followCursor>
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
