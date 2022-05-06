import { Edit } from '@mui/icons-material'
import { IconButton, Stack, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectCapabilitiesByIds } from 'Redux/Capabilities/selectors'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import TargetConstants from 'Redux/Targets/constants'
import { styled } from 'Styles/materialThemes'

const StyledDiv = styled('div')(({ theme }) => ({
    borderRadius: theme.spacing(1),
    color: theme.palette.gantt.association.dark.text,
    background: theme.palette.gantt.association.dark.background,
    padding: theme.spacing(1),
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
            { id, capabilities: capabilities, target }
        ))
    }

    if (deliverables.length === 0) return null
    return (
        <StyledDiv>
            <Stack direction = 'row' alignItems = 'center' justifyContent = 'space-between'>
                <Stack spacing = {1}>
                    {capabilities?.map((capability, index) => {
                        let deliverableCount = 0
                        return (
                            <Tooltip
                                key = {index}
                                arrow
                                followCursor
                                data-testid = 'GanttRequirements__tooltip'
                                title = {deliverables.map((deliverable, index2) => {
                                    if (deliverable.capabilityId === capability.id) {
                                        deliverableCount++
                                        return (
                                            <Typography
                                                key = {index2}
                                                data-testid = {`GanttRequirements__deliverable-${index2}`}
                                                margin = {1}
                                            >
                                                {deliverable.title}
                                            </Typography>
                                        )
                                    }
                                })}>
                                <Typography data-testid = 'GanttRequirements__title'>
                                    {capability.title + ' - ' +
                                    deliverableCount + '/' + capability.deliverableIds.length}
                                </Typography>
                            </Tooltip>
                        )}
                    )}
                </Stack>
                {permissions.edit &&
                    <IconButton title = 'edit' onClick = {handleEditCapability}>
                        <Edit fontSize = 'small'/>
                    </IconButton>
                }
            </Stack>
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