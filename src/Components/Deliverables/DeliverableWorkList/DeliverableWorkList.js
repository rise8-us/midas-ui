import { Typography } from '@mui/material'
import { DeliverableWorkEntry } from 'Components/Deliverables'
import staticConstants from 'Constants/Statics'
import PropTypes from 'prop-types'

export default function DeliverableWorkList({ deliverables, hasEdit }) {
    return (
        <>
            {deliverables.map((child, index) => (
                <DeliverableWorkEntry key = {index} id = {child.id} hasEdit = {hasEdit}/>
            ))}
            {deliverables.length === 0 &&
                <Typography
                    fontStyle = 'italic'
                    fontWeight = {300}
                    variant = 'h6'
                    color = 'secondary'
                >
                    {staticConstants.NO_DELIVERABLES_ASSIGNED}
                </Typography>
            }
        </>
    )
}

DeliverableWorkList.propTypes = {
    hasEdit: PropTypes.bool,
    deliverables: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number
    }))
}

DeliverableWorkList.defaultProps = {
    hasEdit: false,
    deliverables: []
}