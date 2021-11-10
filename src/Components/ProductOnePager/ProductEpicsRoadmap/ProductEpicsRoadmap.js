import { EventAvailableOutlined, EventBusyOutlined, EventOutlined, Sync } from '@mui/icons-material'
import { Chip, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { RoadmapEpic } from 'Components/Epics/RoadmapEpic'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRoadmapStatuses } from 'Redux/AppSettings/selectors'
import { requestSyncEpicsByProductId } from 'Redux/Epics/actions'
import { selectEpicsByProductId } from 'Redux/Epics/selectors'

const getLegendIcon = (key, color) => {
    const defProps = { style: { color } }

    const icons = {
        COMPLETE: <EventAvailableOutlined {...defProps}/>,
        IN_PROGRESS: <EventOutlined {...defProps}/>,
        FUTURE: <EventBusyOutlined {...defProps}/>
    }

    return icons[key]
}

const performActionIfAllowed = (canDo, action) => canDo ? action : null

const sortProductEpics = (productId) => {
    const productEpics = useSelector(state => selectEpicsByProductId(state, productId))

    const closedEpics = productEpics.filter(epic => epic.state === 'closed')
        .sort((a, b) => (new Date(a.closedAt)).getTime() < (new Date(b.closedAt)).getTime() ? -1 : 1)

    const openedEpics = productEpics.filter(epic => epic.state === 'opened')
    const futureEpics = openedEpics.filter(epic => epic.startDate == null)
    const currentEpics = openedEpics.filter(epic => epic.startDate != null)

    return closedEpics.concat(currentEpics.reverse()).concat(futureEpics.reverse())
}

function ProductEpicsRoadmap({ productId, hasEdit }) {

    const dispatch = useDispatch()

    const roadmapStatuses = useSelector(selectRoadmapStatuses)

    const syncEpics = () => {
        dispatch(requestSyncEpicsByProductId(productId))
    }

    return (
        <Grid container spacing = {2} direction = 'column'>
            <Grid container item alignItems = 'center' spacing = {1}>
                <Grid item height = '40px'>
                    <Typography variant = 'h6' color = 'text.primary'>ROADMAP</Typography>
                </Grid>
                <Grid item height = '40px'>
                    {performActionIfAllowed(hasEdit,
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
                    )}
                </Grid>
            </Grid>
            <Grid container item style = {{ paddingTop: '8px' }} spacing = {1}>
                {Object.values(roadmapStatuses).map((status, index) =>
                    <Grid item key = {index}>
                        <Chip
                            label = {
                                <Typography variant = 'caption' color = 'text.secondary'>
                                    {status.label.toUpperCase()}
                                </Typography>
                            }
                            icon = {getLegendIcon(status.name, status.color)}
                            variant = 'outlined'
                            color = 'secondary'
                            size = 'small'
                            style = {{  borderWidth: 0 }}
                        />
                    </Grid>
                )}
            </Grid>
            <Grid container item direction = 'column'>
                {sortProductEpics(productId).map((epic, index) =>
                    <Grid item key = {index}>
                        <RoadmapEpic
                            id = {epic.id}
                            dateDisplayed = {epic.state === 'closed' ? 'closedAt' : 'dueDate'}
                            hasEdit = {hasEdit}
                        />
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