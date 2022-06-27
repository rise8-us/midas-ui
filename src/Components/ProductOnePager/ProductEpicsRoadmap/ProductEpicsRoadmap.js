import { Grid } from '@mui/material'
import { RoadmapEpic } from 'Components/Epics/RoadmapEpic'
import { EpicSyncRequest } from 'Components/EpicSyncRequest'
import { ProductRoadmapHeader } from 'Components/ProductOnePager'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
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

export default function ProductEpicsRoadmap({ productId, hasEdit }) {
    const dispatch = useDispatch()

    const productEpics = useSelector(state => selectEpicsByProductId(state, productId))
    const sortedEpics = useMemo(() => sortProductEpics(productEpics), [productEpics])

    return (
        <Grid container spacing = {2} direction = 'column'>
            <Grid item>
                <ProductRoadmapHeader
                    hasEdit = {hasEdit}
                    action = {
                        <EpicSyncRequest
                            id = {productId}
                            request = {() => dispatch(requestSyncEpicsByProductId(productId))}
                            tooltip = {Tooltips.EPICS_ROADMAP_SYNC}
                        />
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