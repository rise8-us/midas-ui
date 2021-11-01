
import {
    TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator
} from '@mui/lab'
import { Typography, useTheme } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRoadmapStatuses } from 'Redux/AppSettings/selectors'
import { openPopup } from 'Redux/Popups/actions'
import RoadmapContants from 'Redux/Roadmaps/constants'
import { selectRoadmapById } from 'Redux/Roadmaps/selectors'
import { styled } from 'Styles/materialThemes'

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const TimelineItemStyled = styled(TimelineItem)(({ selected }) => ({
    cursor: selected ? 'pointer' : 'default',
    '&:hover': {
        backgroundColor: selected ? '#FFFFFF04' : 'transparent'
    }
}))

function RoadmapEntry({ id, hasEdit }) {
    const theme = useTheme()
    const dispatch = useDispatch()

    const roadmapEntry = useSelector(state => selectRoadmapById(state, id))

    const roadmapStatuses = useSelector(selectRoadmapStatuses)
    const status = roadmapStatuses[roadmapEntry.status]

    const onClick = () => {
        dispatch(openPopup(RoadmapContants.UPDATE_ROADMAP, 'RoadmapEntryPopup', {
            id,
            index: roadmapEntry.index,
            productId: roadmapEntry.productId
        }))
    }

    const date = roadmapEntry.targetDate.split('-')
    const year = date[0]
    const month = Number.parseInt(date[1]) - 1

    return (
        <TimelineItemStyled selected = {hasEdit} onClick = {hasEdit ? onClick : null}>
            <TimelineSeparator>
                <TimelineDot
                    style = {{
                        backgroundColor: status?.color,
                        padding: '6px',
                        marginLeft: '-1px'
                    }}
                />
                <TimelineConnector style = {{ backgroundColor: theme.palette.text.secondary, opacity: .3 }}/>
            </TimelineSeparator>
            <TimelineContent style = {{ paddingTop: '1px', flex: 'auto' }}>
                <div style = {{ display: 'flex', flexWrap: 'wrap' }}>
                    <Typography
                        variant = 'h6'
                        color = {status?.name === 'FUTURE' ? 'text.secondary' : 'text.primary'}
                        style = {{ lineHeight: 'normal' }}
                    >
                        {roadmapEntry.title}
                    </Typography>
                    <Typography
                        variant = 'h6'
                        color = 'text.secondary'
                        style = {{ lineHeight: 'normal', paddingLeft: theme.spacing(1) }}
                        noWrap
                        title = {`${monthNames[month]} ${year}`}
                    >
                        {`• ${monthNames[month]} ${year}`}
                    </Typography>
                </div>
                <Typography
                    variant = 'body2'
                    color = 'text.secondary'
                    style = {{ marginBottom: '16px' }}
                >
                    {roadmapEntry.description}
                </Typography>
            </TimelineContent>
            <TimelineOppositeContent style = {{ width: 0 }}/>
        </TimelineItemStyled>
    )
}

RoadmapEntry.propTypes = {
    id: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired,
}

export default RoadmapEntry