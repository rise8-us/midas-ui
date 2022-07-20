import { Link, Stack, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectCapabilityById } from 'Redux/Capabilities/selectors'
import { selectDeliverablesByCapabilityId, selectDeliverablesByIds } from 'Redux/Deliverables/selectors'
export default function GanttRequirements({ capabilityId, deliverableIds, portfolioId }) {

    const history = useHistory()

    const selectedDeliverables = useSelector(state => selectDeliverablesByIds(state, deliverableIds))
    const allDeliverables = useSelector(state => selectDeliverablesByCapabilityId(state, capabilityId))
    const capability = useSelector(state => selectCapabilityById(state, capabilityId))
    const capabilityDeliverables = selectedDeliverables.filter(d => d.capabilityId === capability.id)

    const requirementLink = () => {
        history.push(`/portfolios/${portfolioId}/requirements/${capabilityId}`)
    }

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
                <Link onClick = {requirementLink} color = 'inherit' underline = 'hover' style = {{ cursor: 'pointer' }}>
                    {capability.title}
                </Link>
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
    deliverableIds: PropTypes.arrayOf(PropTypes.number),
    portfolioId: PropTypes.number.isRequired,
}

GanttRequirements.defaultProps = {
    deliverableIds: []
}