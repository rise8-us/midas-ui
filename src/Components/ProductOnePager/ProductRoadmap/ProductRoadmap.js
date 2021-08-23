import { Chip, Grid, IconButton, Tooltip, Typography } from '@material-ui/core'
import { AddLocationOutlined } from '@material-ui/icons'
import Timeline from '@material-ui/lab/Timeline'
import { RoadmapEntry } from 'Components/RoadmapEntry'
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
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: color
        }}
    />
)

const performActionIfAllowed = (canDo, action) => canDo ? action : null

function ProductRoadmap({ productId, hasEditAccess }) {

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
            <Grid container item alignItems = 'center'>
                {performActionIfAllowed(hasEditAccess,
                    <Grid item>
                        <Tooltip title = 'Add a new entry' placement = 'top'>
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
                <Grid item>
                    <Typography variant = 'h6' color = 'textPrimary'>ROADMAP</Typography>
                </Grid>
            </Grid>
            <Grid container item style = {{ marginTop: '-12px', paddingBottom: 0 }}>
                {Object.values(roadmapStatuses).map((status, index) =>
                    <Grid item key = {index}>
                        <Chip
                            label = {status.label.toUpperCase()}
                            icon = {generateCircle(status.color)}
                            variant = 'outlined'
                            color = 'secondary'
                            style = {{ border: 0 }}
                        />
                    </Grid>
                )}
            </Grid>
            <Grid item style = {{ flexGrow: 1, paddingTop: 0 }}>
                <Timeline align = 'left' style = {{ paddingLeft: '4px' }}>
                    {roadmapEntries.map((entry, index) =>
                        <RoadmapEntry key = {index} id = {entry.id} hasEditAccess = {hasEditAccess} />
                    )}
                </Timeline>
            </Grid>
        </Grid>
    )
}

ProductRoadmap.propTypes = {
    productId: PropTypes.number.isRequired,
    hasEditAccess: PropTypes.bool
}

ProductRoadmap.defaultProps = {
    hasEditAccess: false
}

export default ProductRoadmap