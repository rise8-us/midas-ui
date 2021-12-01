import {
    EventAvailableOutlined, EventBusyOutlined, EventOutlined, VisibilityOffOutlined, VisibilityOutlined
} from '@mui/icons-material'
import { alpha, Grid, IconButton, Link, SvgIcon, Typography, useTheme } from '@mui/material'
import { ReactComponent as GitLabLogo } from 'Assets/gitlabLogo.svg'
import MonthNames from 'Constants/MonthNames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRoadmapStatuses } from 'Redux/AppSettings/selectors'
import { requestHideEpic } from 'Redux/Epics/actions'
import { selectEpicById } from 'Redux/Epics/selectors'

const getEpicDescription = (input) => {
    if (input === null)
        return 'No description present on GitLab Epic.'
    else {
        const splitDescription = input.split(/\n/)
        if (splitDescription[0].trim().length === 0)
            return 'Empty first line in GitLab Epic description.'
        else
            return splitDescription[0]
    }
}

const getStatusIcon = (isHidden, expected, actual, icon) => {
    if (expected === actual && !isHidden)
        return icon
    else
        return null
}

const getVisibilityIcon = (isHidden) => {
    if (isHidden)
        return <VisibilityOutlined data-testid = 'RoadmapEpic__is-hidden-icon'/>
    else
        return <VisibilityOffOutlined data-testid = 'RoadmapEpic__is-not-hidden-icon'/>
}

const getRoadmapEpicStatus = (state, startDate) => {
    if (state === 'closed')
        return 'COMPLETE'
    else if (startDate == null)
        return 'FUTURE'
    else
        return 'IN_PROGRESS'
}

function RoadmapEpic({ id,  hasEdit }) {
    const theme = useTheme()
    const dispatch = useDispatch()

    const roadmapEpic = useSelector(state => selectEpicById(state, id))

    const roadmapStatuses = useSelector(selectRoadmapStatuses)
    const status = roadmapStatuses[getRoadmapEpicStatus(roadmapEpic.state, roadmapEpic.startDate)]

    const dateDisplayed = roadmapEpic.state === 'closed' ? 'closedAt' : 'dueDate'
    const date = roadmapEpic[dateDisplayed] ? roadmapEpic[dateDisplayed].split('-') : null

    const [showActions, setShowActions] = useState(false)

    const setEpicIsHidden = () => {
        dispatch(requestHideEpic({ id: id, isHidden: !roadmapEpic.isHidden }))
    }

    if (roadmapEpic.isHidden && !hasEdit)
        return null

    return (
        <Grid container
            style = {showActions ? {
                minHeight: '84px',
                maxHeight: '84px',
                padding: '4px',
                marginLeft: '-12px',
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                border: 'solid 2px',
                borderColor: alpha(theme.palette.secondary.main, 0.5),
                borderRadius: '12px'
            } : {
                minHeight: '84px',
                maxHeight: '84px',
                padding: '6px',
                marginLeft: '-12px'
            }}
            data-testid = 'RoadmapEpic__container'
            onMouseEnter = {() => setShowActions(true)}
            onMouseLeave = {() => setShowActions(false)}
        >
            <Grid container item direction = 'column' style = {{ width: '32px' }}>
                <Grid item
                    style = {{
                        height: '32px',
                        margin: 'auto',
                        color: roadmapEpic.isHidden ? theme.palette.error.main : status?.color
                    }}
                >
                    {roadmapEpic.isHidden && <VisibilityOffOutlined/>}
                    {getStatusIcon(roadmapEpic.isHidden, 'COMPLETE', status?.name, <EventAvailableOutlined/>)}
                    {getStatusIcon(roadmapEpic.isHidden, 'IN_PROGRESS', status?.name, <EventOutlined/>)}
                    {getStatusIcon(roadmapEpic.isHidden, 'FUTURE', status?.name, <EventBusyOutlined/>)}
                </Grid>
                <Grid item style = {{ flexGrow: 1, paddingBottom: '6px' }}>
                    <div
                        style = {{
                            width: '50%',
                            height: '100%',
                            marginLeft: 'calc(50% - 1px)',
                            opacity: .3,
                            borderLeft: 'solid 2px',
                            borderLeftColor: theme.palette.text.secondary,
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container
                item
                direction = 'column'
                style = {{
                    width: 'calc(100% - 64px)',
                    paddingLeft: '4px'
                }}
            >
                <Grid container item wrap = 'nowrap' style = {{ height: '26px' }}>
                    <Grid item zeroMinWidth>
                        <Typography
                            noWrap
                            variant = 'h6'
                            color = {status?.name === 'FUTURE' ? 'text.secondary' : 'text.primary'}
                            style = {{ lineHeight: 'normal' }}
                        >
                            {roadmapEpic.title}
                        </Typography>
                    </Grid>
                    {date &&
                        <Grid item>
                            <Typography
                                noWrap
                                variant = 'h6'
                                color = 'text.secondary'
                                style = {{ lineHeight: 'normal', paddingLeft: '8px' }}
                                title = {`${MonthNames[date[1]]} ${date[0]}`}
                            >
                                {`• ${MonthNames[date[1]]} ${date[0]}`}
                            </Typography>
                        </Grid>
                    }
                </Grid>
                <Grid item zeroMinWidth>
                    <Typography
                        variant = 'body2'
                        color = 'text.secondary'
                        style = {{
                            lineHeight: 'normal',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            display: '-webkit-box',
                            overflow: 'hidden',
                            wordBreak: 'break-word'
                        }}
                        title = {roadmapEpic.description}
                    >
                        {getEpicDescription(roadmapEpic.description)}
                    </Typography>
                </Grid>
            </Grid>
            {showActions &&
            <Grid container
                item
                direction = 'column'
                style = {{ width: '32px' }}
            >
                {hasEdit ?
                    <Grid item style = {{ marginRight: 'auto' }}>
                        <IconButton
                            color = 'secondary'
                            title = 'show/hide'
                            style = {{ padding: '3px' }}
                            onClick = {setEpicIsHidden}
                            data-testid = 'RoadmapEpic__visibility-button'
                        >
                            {getVisibilityIcon(roadmapEpic.isHidden)}
                        </IconButton>
                    </Grid>
                    :
                    <Grid item style = {{ marginRight: 'auto' }}>
                        <Link
                            href = {roadmapEpic.webUrl}
                            target = '_blank'
                            rel = 'noopener noreferrer'
                            style = {{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '3px'
                            }}
                        >
                            <SvgIcon fontSize = 'small'><GitLabLogo height = '24px' width = '24px'/></SvgIcon>
                        </Link>
                    </Grid>
                }
            </Grid>
            }
        </Grid>
    )
}

RoadmapEpic.propTypes = {
    id: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool,
}

RoadmapEpic.defaultProps = {
    hasEdit: false,
}

export default RoadmapEpic