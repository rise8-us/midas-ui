
import {
    EventAvailableOutlined, EventBusyOutlined, EventOutlined, VisibilityOffOutlined, VisibilityOutlined
} from '@mui/icons-material'
import { alpha, Grid, IconButton, Stack, Typography } from '@mui/material'
import MonthNames from 'Constants/MonthNames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRoadmapStatuses } from 'Redux/AppSettings/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { requestHideRoadmap } from 'Redux/Roadmaps/actions'
import RoadmapConstants from 'Redux/Roadmaps/constants'
import { selectRoadmapById } from 'Redux/Roadmaps/selectors'
import { styled } from 'Styles/materialThemes'

const StyledGridWrap = styled(Grid)(({ theme, selected }) => ({
    minHeight: '84px',
    maxHeight: '84px',
    padding: '6px',
    marginLeft: '-12px',
    border: 'solid 2px',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: '12px',
    '&:hover': {
        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
        borderColor: alpha(theme.palette.secondary.main, 0.5),
        cursor: selected ? 'pointer' : 'default'
    }
}))

const StyledIcon = styled('div')(({ theme, inactive, color }) => ({
    alignSelf: 'center',
    height: 32,
    color: inactive ? theme.palette.error.main : color
}))

const VerticalLine = styled('div')(({ theme }) => ({
    width: '50%',
    height: '52px',
    position: 'relative',
    top: '-12px',
    marginLeft: 'calc(50% - 1px)',
    opacity: .3,
    borderLeft: 'solid 2px',
    borderLeftColor: theme.palette.text.secondary,
}))

export const getStatusIcon = (hidden, status) => {
    if (hidden) return <VisibilityOffOutlined/>

    switch (status) {
    case 'COMPLETE':
        return <EventAvailableOutlined/>
    case 'IN_PROGRESS':
        return <EventOutlined/>
    case 'FUTURE':
        return <EventBusyOutlined/>
    default:
        return null
    }
}

export const getVisibilityIcon = (isHidden) => isHidden ? <VisibilityOutlined/> : <VisibilityOffOutlined/>

export const getDate = (entry) => {
    const key = entry.status === 'COMPLETE' ? 'completedAt' : 'dueDate'
    return entry[key]?.split('T')[0].split('-') ?? null
}

const defaultTypographyProps = { lineHeight: 'normal', variant: 'h6', noWrap: true }

function RoadmapEntry({ id, hasEdit }) {
    const dispatch = useDispatch()

    const roadmapEntry = useSelector(state => selectRoadmapById(state, id))
    const roadmapStatuses = useSelector(selectRoadmapStatuses)

    const [hover, setHover] = useState(false)

    const status = roadmapStatuses[roadmapEntry.status]
    const date = getDate(roadmapEntry)

    const toggleIsHidden = (event) => {
        event.stopPropagation()
        dispatch(requestHideRoadmap({ id, isHidden: !roadmapEntry.isHidden }))
    }

    const toggleHover = () => setHover(prev => !prev)

    const onClick = () => {
        hasEdit && dispatch(openPopup(
            RoadmapConstants.UPDATE_ROADMAP,
            'RoadmapEntryPopup',
            { id, productId: roadmapEntry.productId }
        ))
    }

    if (roadmapEntry.isHidden && !hasEdit) return null

    return (
        <StyledGridWrap
            container
            selected = {hasEdit}
            onMouseEnter = {toggleHover}
            onMouseLeave = {toggleHover}
            onClick = {onClick}
            data-testid = 'RoadmapEntry__grid-wrap'
        >
            <Grid item width = '28px'>
                <Stack>
                    <StyledIcon inactive = {roadmapEntry.isHidden ? 1 : 0} color = {status.color}>
                        {getStatusIcon(roadmapEntry.isHidden, status?.name)}
                    </StyledIcon>
                    <VerticalLine/>
                </Stack>
            </Grid>
            <Grid container item direction = 'column' style = {{ width: 'calc(100% - 64px)', paddingLeft: '4px' }}>
                <Grid container item wrap = 'nowrap' style = {{ height: '26px' }}>
                    <Grid item>
                        <Typography
                            {...defaultTypographyProps}
                            color = {status?.name === 'FUTURE' ? 'text.secondary' : 'text.primary'}
                        >
                            {roadmapEntry.title}
                        </Typography>
                    </Grid>
                    <Grid item zeroMinWidth>
                        {date &&
                            <Typography
                                {...defaultTypographyProps}
                                color = 'text.secondary'
                                style = {{ paddingLeft: '4px' }}
                                title = {`${MonthNames[date[1]]} ${date[0]}`}
                            >
                                {`• ${MonthNames[date[1]]} ${date[0]}`}
                            </Typography>
                        }
                    </Grid>
                </Grid>
                <Grid item zeroMinWidth>
                    <Typography
                        variant = 'body2'
                        color = 'text.secondary'
                        lineHeight = 'normal'
                        style = {{
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            display: '-webkit-box',
                            overflow: 'hidden',
                            wordBreak: 'break-word'
                        }}
                        title = {roadmapEntry.description}
                    >
                        {roadmapEntry.description}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item>
                {hover && hasEdit &&
                    <IconButton
                        color = 'secondary'
                        title = 'show/hide'
                        size = 'small'
                        style = {{ top: '-4px' }}
                        onClick = {toggleIsHidden}
                    >
                        {getVisibilityIcon(roadmapEntry.isHidden)}
                    </IconButton>
                }
            </Grid>
        </StyledGridWrap>
    )
}

RoadmapEntry.propTypes = {
    id: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool
}

RoadmapEntry.defaultProps = {
    hasEdit: false,
}

export default RoadmapEntry