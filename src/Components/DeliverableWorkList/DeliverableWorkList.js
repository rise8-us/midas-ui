import { Typography } from '@mui/material'
import { DeliverableWorkEntry } from 'Components/DeliverableWorkEntry'
import staticConstants from 'Constants/Statics'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectDeliverableByParentId } from 'Redux/Deliverables/selectors'

export default function DeliverableWorkList({ parentId }) {

    const children = useSelector(state => selectDeliverableByParentId(state, parentId))

    return (
        <>
            {children.map((child, index) => (
                <React.Fragment key = {index}>
                    <DeliverableWorkEntry
                        id = {child.id}
                        title = {child.title}
                        epicId = {child.epicId}
                        productId = {child.productId}
                    />
                </React.Fragment>
            ))}
            {children.length === 0 &&
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
    parentId: PropTypes.number
}

DeliverableWorkList.defaultProps = {
    parentId: null
}