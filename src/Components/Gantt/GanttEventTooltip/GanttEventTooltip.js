import { LocationOnOutlined, PeopleOutlined } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSearchUsers } from 'Redux/Users/actions'
import { selectUsersByIds } from 'Redux/Users/selectors'
import { buildOrQueryByIds } from 'Utilities/requests'
import { GanttTooltip } from '../GanttTooltip'

export default function GanttEventTooltip({ event, dateRange, onEditClick, onDeleteClick, permissions }) {
    const dispatch = useDispatch()
    const { title, description, location, organizerIds, attendeeIds } = event

    const organizers = useSelector(state => selectUsersByIds(state, organizerIds))
    const attendees = useSelector(state => selectUsersByIds(state, attendeeIds))

    useEffect(() => {
        dispatch(requestSearchUsers(buildOrQueryByIds([...organizerIds, ...attendeeIds])))
    }, [])

    return (
        <GanttTooltip
            dateRange = {dateRange}
            description = {description}
            onDeleteClick = {onDeleteClick}
            onEditClick = {onEditClick}
            permissions = {permissions}
            title = {title}
        >
            <>
                <Stack direction = 'row'>
                    <LocationOnOutlined color = 'secondary' style = {{ marginRight: '12px' }}/>
                    <Typography color = 'text.secondary' variant = 'subtitle2'>
                        {location?.length > 0 ? location : 'No location given.'}
                    </Typography>
                </Stack>
                <Stack direction = 'row'>
                    <PeopleOutlined color = 'secondary' style = {{ marginRight: '12px' }}/>
                    <div>
                        {organizers.map((organizer, index) => (
                            <div key = {index} style = {{ display: 'flex', alignItems: 'baseline', height: '22px' }}>
                                <Typography
                                    color = 'text.secondary'
                                    variant = 'subtitle2'
                                    paddingRight = '3px'
                                    whiteSpace = 'nowrap'
                                >
                                    {organizer.displayName}
                                </Typography>
                                <Typography color = 'text.secondary' variant = 'caption'>
                                    (organizer) {index < organizers.length - 1 ? ',' : ''}
                                </Typography>
                            </div>
                        ))}
                        {attendees.map((attendee, index) => (
                            <div key = {index} style = {{ display: 'flex', alignItems: 'baseline', height: '22px' }}>
                                <Typography
                                    color = 'text.secondary'
                                    variant = 'subtitle2'
                                    paddingRight = '3px'
                                    whiteSpace = 'nowrap'
                                >
                                    {attendee.displayName}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </Stack>
            </>
        </GanttTooltip>
    )
}

GanttEventTooltip.propTypes = {
    event: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        location: PropTypes.string,
        organizerIds: PropTypes.arrayOf(PropTypes.number),
        attendeeIds: PropTypes.arrayOf(PropTypes.number)
    }),
    dateRange: PropTypes.string.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    permissions: PropTypes.shape({})
}

GanttEventTooltip.defaultProps = {
    event: PropTypes.shape({
        description: '',
        location: '',
        organizerIds: [],
        attendeeIds: []
    }),
    permissions: {
        edit: false
    }
}
