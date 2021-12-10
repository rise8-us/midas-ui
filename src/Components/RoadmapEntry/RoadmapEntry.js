import {
    EventAvailableOutlined, EventBusyOutlined, EventOutlined,
    VisibilityOffOutlined, VisibilityOutlined, WarningAmberRounded
} from '@mui/icons-material'
import { alpha, Grid, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { DateSelector } from 'Components/DateSelector'
import { Tag } from 'Components/Tag'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRoadmapStatuses } from 'Redux/AppSettings/selectors'
import { requestHideRoadmap, requestUpdateRoadmap } from 'Redux/Roadmaps/actions'
import { selectRoadmapById } from 'Redux/Roadmaps/selectors'
import { styled } from 'Styles/materialThemes'
import { dateInDisplayOrder } from 'Utilities/dateHelpers'

const StyledGridWrap = styled(Grid)(({ theme }) => ({
    minHeight: '92px',
    maxHeight: '92px',
    padding: '4px',
    marginLeft: '-12px',
    border: 'solid 2px',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: '12px',
    '&:hover': {
        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
        borderColor: alpha(theme.palette.secondary.main, 0.5)
    }
}))

const StyledDiv = styled('div')(() => ({
    alignSelf: 'center',
    marginTop: '-4px',
    marginBottom: '16px',
    height: 26,
    padding: '4px'
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

const AutoSaveTitle = styled(AutoSaveTextField)(({ theme }) => ({
    ...theme.typography.h6
}))

const AutoSaveDescription = styled(AutoSaveTextField)(({ theme }) => ({
    ...theme.typography.body2
}))

export function StatusIcon({ newEntry, hidden, status, color }) {
    if (newEntry)
        return <WarningAmberRounded style = {{ color: color }}/>
    if (hidden)
        return <VisibilityOffOutlined style = {{ color: color }}/>

    switch (status) {
    case 'COMPLETE':
        return <EventAvailableOutlined style = {{ color: color }}/>
    case 'IN_PROGRESS':
        return <EventOutlined style = {{ color: color }}/>
    case 'FUTURE':
        return <EventBusyOutlined style = {{ color: color }}/>
    default:
        return null
    }
}

StatusIcon.propTypes = {
    newEntry: PropTypes.bool.isRequired,
    hidden: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}

export const getVisibilityIcon = (isHidden) => isHidden ? <VisibilityOutlined/> : <VisibilityOffOutlined/>

export const getDate = (entry) => {
    const complete = (entry.status === 'COMPLETE')
    const key = complete ? 'completedAt' : 'dueDate'
    return complete ? entry[key]?.split('T')[0] : entry[key]
}

function TooltipTitle({ onStatusChange, statuses }) {
    return (
        <Stack width = '160px' data-testid = 'tooltipTitle'>
            {statuses.map((status, index) => (
                <Tag key = {index} {...status} onClick = {() => onStatusChange(status.name)}/>
            ))}
        </Stack>
    )
}

TooltipTitle.propTypes = {
    onStatusChange: PropTypes.func.isRequired,
    statuses: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        label: PropTypes.string,
        color: PropTypes.string
    })).isRequired
}

function RoadmapEntry({ id, hasEdit }) {
    const dispatch = useDispatch()
    const theme = useTheme()
    const titleWrapRef = useRef()

    const roadmapStatuses = useSelector(selectRoadmapStatuses)
    const roadmapEntry = useSelector(state => selectRoadmapById(state, id))

    const [hover, setHover] = useState(false)
    const [maxTitleWidth, setMaxTitleWidth] = useState('20px')

    const { isHidden } = roadmapEntry
    const newEntry = roadmapEntry.title === 'Enter roadmap title...'
    const status = roadmapStatuses[roadmapEntry.status]

    const date = getDate(roadmapEntry)
    const dateOffset = date ? 80 : 0

    const statusIconColor = useMemo(() => {
        if (newEntry) return theme.palette.warning.main
        if (isHidden) return theme.palette.error.main
        return status?.color ?? '#c3c3c3'
    }, [newEntry, isHidden, status])

    const toggleIsHidden = (event) => {
        event.stopPropagation()
        dispatch(requestHideRoadmap({ id, isHidden: !isHidden }))
    }

    const updateRoadmapEntry = (key, value) => {
        value !== roadmapEntry[key] && dispatch(requestUpdateRoadmap({ ...roadmapEntry, [key]: value }))
    }

    useEffect(() => {
        setMaxTitleWidth(
            titleWrapRef?.current?.offsetWidth
                ? (titleWrapRef.current.offsetWidth - dateOffset - 20) + 'px'
                : '20px'
        )
    }, [titleWrapRef])

    return (
        <StyledGridWrap
            container
            selected = {hasEdit}
            onMouseEnter = {() => setHover(true)}
            onMouseLeave = {() => setHover(false)}
            data-testid = 'RoadmapEntry__grid-wrap'
        >
            <Grid item width = '28px'>
                <Stack>
                    <Tooltip
                        disableHoverListener = {(!hasEdit && !newEntry) || isHidden}
                        arrow
                        title = {newEntry ? 'You must update your title before changing your status.' :
                            <TooltipTitle
                                onStatusChange = {(v) => updateRoadmapEntry('status', v)}
                                statuses = {Object.values(roadmapStatuses)}
                            />
                        }
                    >
                        <StyledDiv data-testid = 'RoadmapEntry__status-icon'>
                            <StatusIcon
                                newEntry = {newEntry}
                                hidden = {isHidden}
                                status = {status?.name}
                                color = {statusIconColor}
                            />
                        </StyledDiv>
                    </Tooltip>
                    <VerticalLine/>
                </Stack>
            </Grid>
            <Grid container item direction = 'column' paddingLeft = '4px' width = 'calc(100% - 64px)'>
                <Grid container item ref = {titleWrapRef} wrap = 'nowrap'>
                    <Grid item height = '32px'>
                        <AutoSaveTitle
                            autogrow
                            fullWidth
                            canEdit = {hasEdit}
                            initialValue = {roadmapEntry.title}
                            onSave = {(v) => updateRoadmapEntry('title', v)}
                            revertOnEmpty
                            InputProps = {{
                                style: {
                                    marginTop: '-2px',
                                    maxWidth: maxTitleWidth
                                }
                            }}
                            inputProps = {{
                                style: {
                                    color: status?.name === 'FUTURE' ?
                                        theme.palette.text.secondary : theme.palette.text.primary,
                                    padding: 0,
                                    textOverflow: 'ellipsis'
                                }
                            }}
                        />
                    </Grid>
                    {(date || hasEdit) &&
                        <>
                            <Grid item marginTop = '-4px'>
                                <Typography variant = 'h6' color = 'secondary' paddingRight = '4px'>
                                    •
                                </Typography>
                            </Grid>
                            <Grid item
                                minWidth = '100px'
                                marginRight = '100%'
                                marginTop = '-2px'
                                onClick = {() => setHover(false)}
                            >
                                <DateSelector
                                    disableUnderline
                                    placeholder = 'Due Date'
                                    hasEdit = {hasEdit && (roadmapEntry.status !== 'COMPLETE')}
                                    initialValue = {date ? dateInDisplayOrder(date) : null}
                                    inputFormat = 'MMM yyyy'
                                    onAccept = {(v) => updateRoadmapEntry('dueDate', v)}
                                    InputProps = {{
                                        style: { ...theme.typography.h6 }
                                    }}
                                />
                            </Grid>
                        </>
                    }
                </Grid>
                <Grid item zeroMinWidth>
                    <AutoSaveDescription
                        variant = {hover && hasEdit ? 'filled' : 'standard'}
                        canEdit = {hasEdit}
                        multiline
                        rows = {3}
                        fullWidth
                        initialValue = {roadmapEntry.description}
                        onSave = {(v) => updateRoadmapEntry('description', v)}
                        InputProps = {{
                            disableUnderline: true,
                            style: {
                                marginTop: '-6px',
                                lineHeight: 'normal',
                                padding: 0
                            }
                        }}
                        inputProps = {{
                            'aria-label': 'description',
                            style: {
                                color: theme.palette.text.secondary
                            }
                        }}
                    />
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
                        {getVisibilityIcon(isHidden)}
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