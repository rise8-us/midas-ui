import { Chip, Grid, IconButton, Tooltip, Typography } from '@material-ui/core'
import { Sync } from '@material-ui/icons'
import Timeline from '@material-ui/lab/Timeline'
import { RoadmapEpic } from 'Components/Epics/RoadmapEpic'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRoadmapStatuses } from 'Redux/AppSettings/selectors'
import { requestSyncEpicsByProductId } from 'Redux/Epics/actions'
import { selectEpicsByProductId } from 'Redux/Epics/selectors'

const generateCircle = (color) => (
    <div
        style = {{
            width: 8,
            height: 8,
            borderRadius: '50%',
            marginLeft: '5px',
            backgroundColor: color
        }}
    />
)

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
        <Grid container spacing = {2} wrap = 'wrap'>
            <Grid container item alignItems = 'center' style = {{ paddingBottom: 0 }}>
                <Grid item style = {{ paddingBottom: 0 }}>
                    <Typography variant = 'h6' color = 'textPrimary'>ROADMAP</Typography>
                </Grid>
                {performActionIfAllowed(hasEdit,
                    <Grid item style = {{ paddingBottom: 0 }}>
                        <Tooltip title = {Tooltips.EPICS_ROADMAP_SYNC} placement = 'top' arrow>
                            <IconButton
                                color = 'secondary'
                                size = 'small'
                                data-testid = 'ProductEpicsRoadmap__button-sync'
                                style = {{ left: '6px' }}
                                onClick = {() => syncEpics()}
                            >
                                <Sync />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                )}
            </Grid>
            <Grid container item style = {{ paddingBottom: 0, paddingTop: 0 }}>
                {Object.values(roadmapStatuses).map((status, index) =>
                    <Grid item key = {index}>
                        <Chip
                            label = {status.label.toUpperCase()}
                            icon = {generateCircle(status.color)}
                            variant = 'outlined'
                            color = 'secondary'
                            style = {{
                                border: 0,
                                fontSize: '10px',
                                height: '16px'
                            }}
                        />
                    </Grid>
                )}
            </Grid>
            <Grid item style = {{ flexGrow: 1, paddingTop: 0, maxWidth: '100%' }}>
                <Timeline align = 'left' style = {{ padding: '0px 4px' }}>
                    {sortProductEpics(productId).map((epic, index) =>
                        <RoadmapEpic
                            key = {index}
                            id = {epic.id}
                            dateDisplayed = {epic.state === 'closed' ? 'closedAt' : 'dueDate'}
                            hasEdit = {hasEdit}
                        />
                    )}
                </Timeline>
            </Grid>
        </Grid>
    )
}

ProductEpicsRoadmap.propTypes = {
    productId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired,
}

export default ProductEpicsRoadmap