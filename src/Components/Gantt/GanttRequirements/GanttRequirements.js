import { Stack, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectCapabilityById } from 'Redux/Capabilities/selectors'
import { selectDeliverablesByCapabilityId, selectDeliverablesByIds } from 'Redux/Deliverables/selectors'

export default function GanttRequirements({ capabilityId, deliverableIds }) {

    const selectedDeliverables = useSelector(state => selectDeliverablesByIds(state, deliverableIds))
    const allDeliverables = useSelector(state => selectDeliverablesByCapabilityId(state, capabilityId))
    const capability = useSelector(state => selectCapabilityById(state, capabilityId))
    const capabilityDeliverables = selectedDeliverables.filter(d => d.capabilityId === capability.id)

    return (
        <Tooltip
            arrow
            followCursor
            data-testid = 'GanttRequirements__tooltip'
            title = {capabilityDeliverables.map((deliverable, index) => {
                return (
                    <Typography
                        key = {index}
                        data-testid = {`GanttRequirements__deliverable-${index}`}
                        margin = {1}
                    >
                        {deliverable.title}
                    </Typography>
                )
            })}
        >
            <Stack direction = 'row' spacing = {1}>
                <Typography>
                    {capability.title}
                </Typography>
                <Typography>-</Typography>
                <Typography data-testid = 'GanttRequirements__capability-count'>
                    {capabilityDeliverables.length + '/' + allDeliverables.length}
                </Typography>
            </Stack>
        </Tooltip>
    )
}

GanttRequirements.propTypes = {
    capabilityId: PropTypes.number.isRequired,
    deliverableIds: PropTypes.arrayOf(PropTypes.number)
}

GanttRequirements.defaultProps = {
    deliverableIds: []
}