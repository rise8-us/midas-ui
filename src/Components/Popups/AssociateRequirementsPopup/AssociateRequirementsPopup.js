import { Box, Checkbox, Typography } from '@mui/material'
import { Popup } from 'Components/Popup'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDeliverablesByCapabilityId } from 'Redux/Deliverables/selectors'
import { closePopup } from 'Redux/Popups/actions'
import { requestUpdateTarget } from 'Redux/Targets/actions'
import TargetConstants from 'Redux/Targets/constants'

function AssociateRequirementsPopup({ id, capabilities, target }) {
    const dispatch = useDispatch()
    const [deliverableIds, setDeliverableIds] = useState(target.deliverableIds)
    const { title, startDate, dueDate } = target
    const onClose = () => dispatch(closePopup(TargetConstants.UPDATE_TARGET))

    const onSubmit = () => {
        const update = { id, title, startDate, dueDate, deliverableIds }
        dispatch(requestUpdateTarget(update))
    }

    const onCheckboxChange = (deliverableId) => {
        if (deliverableIds?.includes(deliverableId)) {
            setDeliverableIds(deliverableIds.filter(item => item !== deliverableId))
        } else {
            setDeliverableIds([...deliverableIds, deliverableId])
        }
    }

    return (
        <Popup
            title = {'Associate Requirements to Target'}
            onClose = {onClose}
            onSubmit = {onSubmit}
            width = '695px'
        >
            <Box display = 'flex' flexDirection = 'column'>
                {capabilities.map((capability, index) => {
                    const allDeliverables = useSelector(state => selectDeliverablesByCapabilityId(state, capability.id))
                    return (
                        <div key = {index}>
                            <Typography variant = 'h6' marginBottom = {1}>
                                {capability.title}
                            </Typography>
                            {allDeliverables.length === 0 ? (<Typography>
                            No Deliverables for {capability.title}</Typography>) :
                                allDeliverables.map((deliverable, index2) => (
                                    <div style = {{ display: 'flex', alignItems: 'flex-start' }}
                                        key = {index2}>
                                        <Checkbox checked = {deliverableIds?.includes(deliverable.id)}
                                            onChange = {() => onCheckboxChange(deliverable.id)}
                                            data-testid = {'AssociateRequirementsPopup__checkbox-' +
                                            `${index2}`}
                                        />
                                        <Typography>
                                            {deliverable.title}
                                        </Typography>
                                    </div>
                                ))
                            }
                        </div>
                    )
                })}
            </Box>
        </Popup>
    )
}

AssociateRequirementsPopup.propTypes = {
    id: PropTypes.number,
    capabilities: PropTypes.any.isRequired,
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

AssociateRequirementsPopup.defaultProps = {
    id: undefined
}

export default AssociateRequirementsPopup