import { AddCircle } from '@mui/icons-material'
import { Button } from '@mui/material'
import { MoreOptionsPopperMenu } from 'Components/MoreOptionsPopperMenu'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import EventConstants from 'Redux/Events/constants'
import MilestoneConstants from 'Redux/Milestones/constants'
import { openPopup } from 'Redux/Popups/actions'
import TargetConstants from 'Redux/Targets/constants'
import WinConstants from 'Redux/Wins/constants'

export default function GanttAddNewItem({ portfolioId }) {

    const dispatch = useDispatch()

    const createMilestone = () =>
        dispatch(openPopup(MilestoneConstants.CREATE_MILESTONE, 'MilestonePopup', { portfolioId: portfolioId }))
    const createEvent = () =>
        dispatch(openPopup(EventConstants.CREATE_EVENT, 'EventPopup', { portfolioId: portfolioId }))
    const createTarget = () =>
        dispatch(openPopup(TargetConstants.CREATE_TARGET, 'TargetPopup', { portfolioId: portfolioId }))
    const createWin = () =>
        dispatch(openPopup(WinConstants.CREATE_WIN, 'WinPopup', { portfolioId: portfolioId }))

    const addCompButtons = [
        {
            text: 'Milestone',
            onClick: createMilestone
        }, {
            text: 'Win',
            onClick: createWin
        }, {
            text: 'Event',
            onClick: createEvent
        }, {
            text: 'Target',
            onClick: createTarget
        }
    ]

    return (
        <div style = {{ marginLeft: 'auto', marginRight: '8px' }}>
            <MoreOptionsPopperMenu
                options = {addCompButtons}
                icon = {
                    <Button
                        data-testid = 'GanttAddNewItem__button'
                        color = 'primary'
                        size = 'small'
                        title = 'Add Content to Chart'
                        endIcon = {<AddCircle />}
                    >
                        Add new
                    </Button>
                }
            />
        </div>
    )
}

GanttAddNewItem.propTypes = {
    portfolioId: PropTypes.number.isRequired
}