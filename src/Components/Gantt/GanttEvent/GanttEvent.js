import { DeleteOutlined, Edit } from '@mui/icons-material'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { requestDeleteEvent } from 'Redux/Events/actions'
import EventConstants from 'Redux/Events/constants'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { styled } from 'Styles/materialThemes'
import { parseDate } from 'Utilities/ganttHelpers'
import { GanttEventTooltip } from '../GanttEventTooltip'

const StyledDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: 'calc(100vw - 48px - 76vw)',
    minHeight: '40px',
    background: theme.palette.gantt.event.dark.background,
    color: theme.palette.gantt.event.dark.text,
    padding: theme.spacing(0, 1),
    textAlign: 'left',
    borderRadius: '4px',
    alignItems: 'center',
    '&:hover': {
        boxShadow: '0px 0px 16px 0px black'
    }
}))

export default function GanttEvent({ event }) {
    const dispatch = useDispatch()

    const { id, portfolioId, startDate, dueDate, title, type } = event

    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))
    const dateString = parseDate(startDate, dueDate)

    const updateEvent = () => {
        dispatch(
            openPopup(EventConstants.UPDATE_EVENT, 'EventPopup', { id: event.id, portfolioId })
        )
    }

    const deleteEvent = () =>
        dispatch(openPopup(EventConstants.DELETE_EVENT, 'DeletePopup', {
            id: id,
            title: title,
            type: type,
            request: requestDeleteEvent,
            constant: EventConstants.DELETE_EVENT
        }))


    return (
        <Tooltip title = {<GanttEventTooltip event = {event}/>} arrow followCursor>
            <StyledDiv>
                <div style = {{ maxWidth: permissions.edit ? 'calc(100vw - 48px - 76vw - 76px)' : '100%' }}>
                    <Typography whiteSpace = 'nowrap' textOverflow = 'ellipsis' overflow = 'hidden'>
                        {event.title}
                    </Typography>
                    <Typography whiteSpace = 'nowrap' textOverflow = 'ellipsis' overflow = 'hidden'>
                        {dateString}
                    </Typography>
                </div>
                {permissions.edit &&
                <div style = {{ display: 'flex' }}>
                    <IconButton
                        size = 'small'
                        onClick = {updateEvent}
                        data-testid = 'Event__button-edit'
                    >
                        <Edit fontSize = 'small' htmlColor = 'black'/>
                    </IconButton>
                    <IconButton
                        size = 'small'
                        onClick = {deleteEvent}
                        data-testid = 'Event__button-delete'
                    >
                        <DeleteOutlined fontSize = 'small' htmlColor = 'black'/>
                    </IconButton>
                </div>
                }
            </StyledDiv>
        </Tooltip>
    )
}

GanttEvent.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        startDate: PropTypes.string,
        dueDate: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string,
        portfolioId: PropTypes.number,
        type: PropTypes.string,
        organizerIds: PropTypes.arrayOf(PropTypes.number)
    }).isRequired,
}