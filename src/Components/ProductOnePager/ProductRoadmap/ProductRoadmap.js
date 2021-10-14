import { Chip, Grid, IconButton, Tooltip, Typography } from '@material-ui/core'
import { AddLocationOutlined } from '@material-ui/icons'
import Timeline from '@material-ui/lab/Timeline'
import { RoadmapEntry } from 'Components/RoadmapEntry'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRoadmapStatuses } from 'Redux/AppSettings/selectors'
import { openPopup } from 'Redux/Popups/actions'
import RoadmapConstants from 'Redux/Roadmaps/constants'
import { selectRoadmapsByProductId } from 'Redux/Roadmaps/selectors'

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

function ProductRoadmap({ productId, hasEdit }) {

    const dispatch = useDispatch()

    const roadmapStatuses = useSelector(selectRoadmapStatuses)
    const roadmapEntries = useSelector(state => selectRoadmapsByProductId(state, productId))

    const openCreatePopup = (id, index) => {
        dispatch(openPopup(RoadmapConstants.CREATE_ROADMAP,
            'RoadmapEntryPopup',
            { id, index, productId }
        ))
    }

    return (
        <Grid container spacing = {2} wrap = 'wrap'>
            <Grid container item alignItems = 'center' style = {{ paddingBottom: 0 }}>
                {performActionIfAllowed(hasEdit,
                    <Grid item style = {{ paddingBottom: 0 }}>
                        <Tooltip title = {Tooltips.ROADMAP_NEW_ENTRY} placement = 'top' arrow>
                            <IconButton
                                color = 'secondary'
                                size = 'small'
                                data-testid = 'ProductRoadmap__button-add'
                                style = {{ right: '6px' }}
                                onClick = {() => openCreatePopup(null, roadmapEntries.length)}
                            >
                                <AddLocationOutlined />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                )}
                <Grid item style = {{ paddingBottom: 0 }}>
                    <Typography variant = 'h6' color = 'textPrimary'>ROADMAP</Typography>
                </Grid>
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
            <Grid item style = {{ flexGrow: 1, paddingTop: 0 }}>
                <Timeline align = 'left' style = {{ padding: '0px 4px' }}>
                    {roadmapEntries.map((entry, index) =>
                        <RoadmapEntry
                            key = {index}
                            id = {entry.id}
                            hasEdit = {hasEdit}
                        />
                    )}
                </Timeline>
            </Grid>
        </Grid>
    )
}

ProductRoadmap.propTypes = {
    productId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired,
}

export default ProductRoadmap