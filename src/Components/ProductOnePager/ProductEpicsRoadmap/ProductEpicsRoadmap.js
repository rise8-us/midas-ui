import { Sync } from '@mui/icons-material'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { RoadmapEpic } from 'Components/Epics/RoadmapEpic'
import { ProductRoadmapHeader } from 'Components/ProductOnePager'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSyncEpicsByProductId } from 'Redux/Epics/actions'
import { selectEpicsByProductId } from 'Redux/Epics/selectors'

const dateToNumber = (date) => new Date().valueOf(date)

export const sortProductEpics = (productEpics) => {
    const closedEpics = productEpics.filter(epic => epic.state === 'closed')
        .sort((a, b) => (dateToNumber(a.closedAt) - dateToNumber(b.closedAt)) < 0 ? -1 : 1)

    const openedEpics = productEpics.filter(epic => epic.state === 'opened')
    const futureEpics = openedEpics.filter(epic => epic.startDate === null)
    const currentEpics = openedEpics.filter(epic => epic.startDate !== null)
    return futureEpics.reverse().concat(currentEpics.reverse()).concat(closedEpics)
}

function ProductEpicsRoadmap({ productId, hasEdit }) {

    const dispatch = useDispatch()

    const productEpics = useSelector(state => selectEpicsByProductId(state, productId))

    const sortedEpics = useMemo(() => sortProductEpics(productEpics), [productEpics])

    const syncEpics = () => dispatch(requestSyncEpicsByProductId(productId))

    return (
        <Grid container spacing = {2} direction = 'column'>
            <Grid item>
                <ProductRoadmapHeader
                    hasEdit = {hasEdit}
                    action = {
                        <Tooltip title = {Tooltips.EPICS_ROADMAP_SYNC} placement = 'top' arrow>
                            <IconButton
                                color = 'secondary'
                                size = 'small'
                                data-testid = 'ProductEpicsRoadmap__button-sync'
                                onClick = {syncEpics}
                            >
                                <Sync />
                            </IconButton>
                        </Tooltip>
                    }
                />
            </Grid>
            <Grid container item direction = 'column'>
                {sortedEpics.map((epic, index) =>
                    <Grid item key = {index}>
                        <RoadmapEpic id = {epic.id} hasEdit = {hasEdit} />
                    </Grid>
                )}
            </Grid>
        </Grid>
    )
}

ProductEpicsRoadmap.propTypes = {
    productId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired,
}

export default ProductEpicsRoadmap