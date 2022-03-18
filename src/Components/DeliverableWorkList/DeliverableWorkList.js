import { Typography } from '@mui/material'
import { DeliverableWorkEntry } from 'Components/DeliverableWorkEntry'
import staticConstants from 'Constants/Statics'
import PropTypes from 'prop-types'

export default function DeliverableWorkList({ workList }) {
    return (
        <>
            {workList.map((child, index) => (
                <DeliverableWorkEntry key = {index} id = {child.id}/>
            ))}
            {workList.length === 0 &&
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
    workList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number
    }))
}

DeliverableWorkList.defaultProps = {
    workList: []
}