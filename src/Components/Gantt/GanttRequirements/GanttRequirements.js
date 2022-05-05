import { Edit } from '@mui/icons-material'
import { IconButton, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectCapabilitiesByIds } from 'Redux/Capabilities/selectors'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import TargetConstants from 'Redux/Targets/constants'
import { styled } from 'Styles/materialThemes'

const StyledDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '6px',
    color: theme.palette.gantt.requirements.dark.text,
    background: theme.palette.gantt.requirements.dark.background,
    padding: theme.spacing(1),
    marginTop: '8px',
    minWidth: '106px',
}))

export default function GanttRequirements({ id, deliverables, portfolioId, target }) {
    const dispatch = useDispatch()
    const visibleCapabilityIds = [...new Set(deliverables?.map(item => item.capabilityId))]
    const capabilities = useSelector(state => selectCapabilitiesByIds(state, visibleCapabilityIds))
    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))

    const handleEditCapability = () => {
        dispatch(openPopup(
            TargetConstants.UPDATE_TARGET,
            'AssociateRequirementsPopup',
            { id, capabilities: capabilities, target }))
    }

    return (
        <StyledDiv>
            <div>
                {capabilities?.map((capability, index) => {
                    return (
                        <Tooltip
                            key = {index}
                            arrow
                            followCursor
                            data-testid = 'GanttRequirements__tooltip'
                            title = {deliverables.map((deliverable, index2) => {
                                if (deliverable.capabilityId === capability.id) {
                                    return (<Typography key = {index2}
                                        data-testid = {`GanttRequirements__deliverable-${index2}`}
                                        style = {{ margin: '8px' }}>
                                        {deliverable.title}
                                    </Typography>)
                                }
                            })}>
                            <Typography data-testid = 'GanttRequirements__title'>
                                {capability.title}
                            </Typography>
                        </Tooltip>
                    )
                })}
            </div>
            {permissions.edit &&
                <IconButton
                    sx = {{ display: 'inline' }}
                    title = 'edit'
                    color = 'secondary'
                    onClick = {handleEditCapability}
                    size = 'small'
                >
                    <Edit />
                </IconButton>}
        </StyledDiv>
    )
}

GanttRequirements.propTypes = {
    id: PropTypes.number.isRequired,
    deliverables: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        parentId: PropTypes.number,
        capabilityId: PropTypes.number,
        isArchived: PropTypes.bool,
    })).isRequired,
    portfolioId: PropTypes.number.isRequired,
    target: PropTypes.shape({
        id: PropTypes.number,
        portfolioId: PropTypes.number,
        title: PropTypes.string,
        type: PropTypes.string,
        startDate: PropTypes.string,
        dueDate: PropTypes.string,
        deliverableIds: PropTypes.array
    }).isRequired
}