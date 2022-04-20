import { DeleteOutline, Edit } from '@mui/icons-material'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { requestDeleteMilestone } from 'Redux/Milestones/actions'
import MilestoneConstants from 'Redux/Milestones/constants'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { styled } from 'Styles/materialThemes'

const defaultStyles = {
    position: 'absolute',
    zIndex: 4
}

const MilestoneFlagPole = styled('div')(({ theme }) => ({
    ...defaultStyles,
    width: '3px',
    height: '100%',
    background: theme.palette.info.dark,
    top: 0,
    '&:hover': {
        boxShadow: '0px 0px 8px 0px black'
    }
}))

const MilestoneFlag = styled('div')(({ theme }) => ({
    ...defaultStyles,
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.info.dark,
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%)',
    padding: theme.spacing(0, 1),
    minHeight: '40px',
    borderRadius: theme.spacing(1),
    borderTopLeftRadius: 0,
    '&:hover': {
        boxShadow: '0px 0px 12px 0px black'
    }
}))

export default function GanttMilestone({ milestone }) {
    const dispatch = useDispatch()

    const { portfolioId, id, title } = milestone

    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))

    const updateMilestone = () =>
        dispatch(openPopup(MilestoneConstants.UPDATE_MILESTONE, 'MilestonePopup', { id, portfolioId }))

    const deleteMilestone = () => {
        dispatch(requestDeleteMilestone(id))
    }

    return (
        <>
            <Tooltip title = {title} arrow followCursor>
                <MilestoneFlagPole />
            </Tooltip>
            <Tooltip title = {title} arrow followCursor>
                <MilestoneFlag>
                    <Typography maxWidth = '160px' textOverflow = 'ellipsis' overflow = 'hidden' marginRight = {1}>
                        {title}
                    </Typography>
                    {permissions.edit &&
                        <div style = {{ display: 'flex', maxHeight: '40px' }}>
                            <IconButton
                                onClick = {updateMilestone}
                                style = {{ color: 'black' }}
                                data-testid = 'GanttMilestone__button-edit'
                                size = 'small'
                            >
                                <Edit fontSize = 'small'/>
                            </IconButton>
                            <IconButton
                                onClick = {deleteMilestone}
                                style = {{ color: 'black' }}
                                data-testid = 'GanttMilestone__button-delete'
                                size = 'small'
                            >
                                <DeleteOutline fontSize = 'small'/>
                            </IconButton>
                        </div>
                    }
                </MilestoneFlag>
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
        portfolioId: PropTypes.number
    }).isRequired
}
