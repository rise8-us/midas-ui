import { AddLocationOutlined } from '@mui/icons-material'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { ProductRoadmapHeader } from 'Components/ProductOnePager'
import { RoadmapEntry } from 'Components/RoadmapEntry'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from 'Redux/Popups/actions'
import RoadmapConstants from 'Redux/Roadmaps/constants'
import { selectRoadmapsByProductId } from 'Redux/Roadmaps/selectors'

export const sortProductRoadmapEntries = (entries) => {
    const completedEntries = entries.filter(e => e.status === 'COMPLETE')
        .sort((a, b) => (new Date(a.completedAt)).getTime() < (new Date(b.completedAt)).getTime() ? -1 : 1)
    const inProgressEntries = entries.filter(e => e.status === 'IN_PROGRESS')
        .sort((a, b) => (new Date(a.dueDate)) < (new Date(b.dueDate)) ? -1 : 1)
    const futureEntries = entries.filter(e => e.status === 'FUTURE')

    return futureEntries.concat(inProgressEntries).concat(completedEntries)
}

function ProductRoadmap({ productId, hasEdit }) {
    const dispatch = useDispatch()

    const roadmapEntries = useSelector(state => selectRoadmapsByProductId(state, productId))

    const openCreatePopup = () => {
        dispatch(openPopup(RoadmapConstants.CREATE_ROADMAP,
            'RoadmapEntryPopup',
            { id: null, index: roadmapEntries.length, productId }
        ))
    }

    return (
        <Grid container spacing = {2} wrap = 'wrap'>
            <Grid item>
                <ProductRoadmapHeader
                    hasEdit = {hasEdit}
                    action = {
                        <Tooltip title = {Tooltips.ROADMAP_NEW_ENTRY} placement = 'top' arrow>
                            <IconButton
                                color = 'secondary'
                                size = 'small'
                                data-testid = 'ProductRoadmap__button-add'
                                onClick = {openCreatePopup}
                            >
                                <AddLocationOutlined />
                            </IconButton>
                        </Tooltip>
                    }
                />
            </Grid>
            <Grid container item direction = 'column'>
                {sortProductRoadmapEntries(roadmapEntries).map((entry, index) =>
                    <Grid item key = {index}>
                        <RoadmapEntry id = {entry.id} hasEdit = {hasEdit}/>
                    </Grid>
                )}
            </Grid>
        </Grid>
    )
}

ProductRoadmap.propTypes = {
    productId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired,
}

export default ProductRoadmap