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
    const { title, startDate, dueDate, description, epicIds } = target

    const dispatch = useDispatch()

    const [deliverableIds, setDeliverableIds] = useState(target.deliverableIds)

    const onClose = () => dispatch(closePopup(TargetConstants.UPDATE_TARGET))

    const onSubmit = () => {
        dispatch(requestUpdateTarget({
            deliverableIds,
            description,
            dueDate,
            epicIds,
            id,
            startDate,
            title,
        }))
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
                                    <div style = {{ display: 'flex', alignItems: 'center' }}
                                        key = {index2}>
                                        <Checkbox checked = {deliverableIds?.includes(deliverable.id)}
                                            onChange = {() => onCheckboxChange(deliverable.id)}
                                            data-testid = {'AssociateRequirementsPopup__checkbox-' +
                                            `${index2}`}
                                        />
                                        <Typography
                                            style = {{ display: 'flex', cursor: 'pointer' }}
                                            onClick = {() => onCheckboxChange(deliverable.id)}>
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
        deliverableIds: PropTypes.arrayOf(PropTypes.number),
        description: PropTypes.string,
        dueDate: PropTypes.string,
        epicIds: PropTypes.arrayOf(PropTypes.number),
        id: PropTypes.number,
        portfolioId: PropTypes.number,
        startDate: PropTypes.string,
        title: PropTypes.string,
        type: PropTypes.string,
    }).isRequired
}

AssociateRequirementsPopup.defaultProps = {
    id: undefined
}

export default AssociateRequirementsPopup