import { EventAvailableOutlined, EventBusyOutlined, EventOutlined } from '@mui/icons-material'
import { Chip, Grid, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectRoadmapStatuses } from 'Redux/AppSettings/selectors'

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

function ProductRoadmapHeader({ action, hasEdit }) {

    const roadmapStatuses = useSelector(selectRoadmapStatuses)

    return (
        <Stack>
            <Grid container alignItems = 'center' height = '34px'>
                <Grid item>
                    <Typography variant = 'h6' lineHeight = 'normal'>ROADMAP</Typography>
                </Grid>
                <Grid item>
                    {performActionIfAllowed(hasEdit, action)}
                </Grid>
            </Grid>
            <Grid container>
                {Object.values(roadmapStatuses).map((status, index) =>
                    <Grid item key = {index} marginLeft = '-1px'>
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
        </Stack>
    )
}

ProductRoadmapHeader.propTypes = {
    action: PropTypes.node,
    hasEdit: PropTypes.bool
}

ProductRoadmapHeader.defaultProps = {
    action: undefined,
    hasEdit: false
}

export default ProductRoadmapHeader