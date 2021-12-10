import { AddLocationOutlined } from '@mui/icons-material'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { ProductRoadmapHeader } from 'Components/ProductOnePager'
import { RoadmapEntry } from 'Components/RoadmapEntry'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateRoadmap } from 'Redux/Roadmaps/actions'
import { selectRoadmapsByProductId } from 'Redux/Roadmaps/selectors'

export const sortProductRoadmapEntries = (entries, hasEdit) => {
    const completedEntries = entries.filter(e => e.status === 'COMPLETE')
        .sort((a, b) => (new Date(a.completedAt)).getTime() > (new Date(b.completedAt)).getTime() ? -1 : 1)
    const inProgressEntries = entries.filter(e => e.status === 'IN_PROGRESS')
        .sort((a, b) => (new Date(a.dueDate)) < (new Date(b.dueDate)) ? -1 : 1)
    const futureEntries = entries.filter(e => e.status === 'FUTURE')
        .sort((a, b) => (new Date(a.dueDate)) > (new Date(b.dueDate)) ? -1 : 1).reverse()

    const fullList = futureEntries.concat(inProgressEntries).concat(completedEntries)

    return hasEdit ? fullList : fullList.filter(re => !re.isHidden && re.title !== 'Enter roadmap title...')
}

function ProductRoadmap({ productId, hasEdit }) {
    const dispatch = useDispatch()

    const roadmapEntries = useSelector(state => selectRoadmapsByProductId(state, productId))

    const sortedRoadmapEntries = sortProductRoadmapEntries(roadmapEntries, hasEdit)
    const newEntries = roadmapEntries.filter(e => e.title === 'Enter roadmap title...')

    const createNewRoadmapEntry = () => {
        dispatch(requestCreateRoadmap({
            title: 'Enter roadmap title...',
            description: 'Enter roadmap description...',
            status: 'FUTURE',
            productId
        }))
    }

    return (
        <Stack spacing = {2}>
            <ProductRoadmapHeader
                hasEdit = {hasEdit}
                action = {
                    <Tooltip
                        disableHoverListener = {newEntries.length < 1}
                        title = 'You must update a new roadmap entry before adding another.'
                        placement = 'top'
                        arrow
                    >
                        <div>
                            <Tooltip title = {Tooltips.ROADMAP_NEW_ENTRY} placement = 'top' arrow>
                                <IconButton
                                    color = 'secondary'
                                    size = 'small'
                                    data-testid = 'ProductRoadmap__button-add'
                                    onClick = {createNewRoadmapEntry}
                                    disabled = {newEntries.length > 0}
                                >
                                    <AddLocationOutlined />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Tooltip>
                }
            />
            <Stack>
                {sortedRoadmapEntries.map((entry, index) =>
                    <RoadmapEntry key = {index} id = {entry.id} hasEdit = {hasEdit}/>
                )}
            </Stack>
        </Stack>
    )
}

ProductRoadmap.propTypes = {
    productId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired,
}

export default ProductRoadmap