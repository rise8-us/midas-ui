import { DeleteOutline, Diamond, Edit, ExpandMore } from '@mui/icons-material'
import { Button, CircularProgress, Collapse, Grow, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCapabilitiesByPortfolioId } from 'Redux/Capabilities/selectors'
import { selectEpicsByIds } from 'Redux/Epics/selectors'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { requestDeleteTarget, requestUpdateTarget } from 'Redux/Targets/actions'
import TargetConstants from 'Redux/Targets/constants'
import { styled } from 'Styles/materialThemes'
import { getTotalWeights } from 'Utilities/progressHelpers'
import { GanttEpicsList } from '../GanttEpicsList'
import { GanttProgressBar } from '../GanttProgressBar'
import { GanttRequirementsList } from '../GanttRequirementsList'

const StyledDiv = styled('div')(({ theme }) => ({
    borderRadius: theme.spacing(1),
    color: theme.palette.gantt.subtarget.dark.text,
    background: theme.palette.gantt.subtarget.dark.background,
    padding: theme.spacing(1),
}))

const StyledHeader = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
    textAlign: 'left',
    width: '100%',
    cursor: 'pointer'
}))

const StyledButton = styled(Button)(() => ({
    background: '#0071bc',
    maxHeight: '40px',
    margin: '8px 0px',
    '&:hover': {
        background: '#3e94cf'
    }
}))

const getPrioritySettings = (isPriority) => ({
    color: !isPriority ? 'secondary' : undefined,
    htmlColor: isPriority ? 'orange' : 'inherit',
    title: isPriority ? 'Priority Item' : 'Not Priority Item',
})

export default function GanttSubTarget({ target, defaultOpen }) {
    const { id, portfolioId, title, deliverableIds, epicIds, isPriority, startDate, dueDate } = target

    const dispatch = useDispatch()

    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))
    const capabilities = useSelector(state => selectCapabilitiesByPortfolioId(state, portfolioId))
    const epics = useSelector(state => selectEpicsByIds(state, epicIds))

    const [totalWeight, totalCompletedWeight] = getTotalWeights(epics)
    const prioritySettings = getPrioritySettings(isPriority)

    const [open, setOpen] = useState(defaultOpen)
    const [hover, setHover] = useState(false)
    const [loading, setLoading] = useState(false)

    const deleteTarget = () => {
        dispatch(openPopup(TargetConstants.DELETE_TARGET, 'DeletePopup', {
            id: id,
            title: title,
            type: 'subtarget',
            request: requestDeleteTarget,
            constant: TargetConstants.DELETE_TARGET
        }))
    }

    const updateTitle = (newTitle) => {
        dispatch(requestUpdateTarget({
            ...target,
            title: newTitle,
        }))
    }

    const updateIsPriority = () => {
        setLoading(true)
        dispatch(requestUpdateTarget({
            ...target,
            isPriority: !isPriority
        })).then(() => {
            setLoading(false)
        })
    }

    const onClickAssociateRequirements = () => {
        dispatch(openPopup(
            TargetConstants.UPDATE_TARGET,
            'AssociateRequirementsPopup',
            { id, capabilities, target }))
    }

    const onClickAssociateEpics = () => {

        const onSelectEpic = (newEpic) => {
            dispatch(requestUpdateTarget({
                ...target,
                epicIds: [...epicIds, newEpic.id]
            }))
        }

        dispatch(openPopup('AssociateEpics', 'AssociateEpicsPopup', {
            onSelect: onSelectEpic,
            subtitle: title,
            title: 'Add Epics to subtarget',
            excludeIds: epicIds
        }))
    }

    const handleEpicDelete = (epicIdToRemove) => {
        dispatch(requestUpdateTarget({
            ...target,
            epicIds: epicIds.filter(epicId => epicId !== epicIdToRemove)
        }))
    }

    const updateSubtarget = (e) => {
        e.stopPropagation()
        dispatch(openPopup(TargetConstants.UPDATE_TARGET, 'TargetPopup', {
            disableDates: true,
            id,
            portfolioId,
            title: 'Subtarget'
        }))
    }

    const handleEditCapability = () => {
        dispatch(openPopup(
            TargetConstants.UPDATE_TARGET,
            'AssociateRequirementsPopup',
            { id, capabilities: capabilities, target }
        ))
    }

    useEffect(() => {
        setOpen(defaultOpen)
    }, [defaultOpen])

    return (
        <StyledDiv>
            {epics.length > 0 ?
                <GanttProgressBar
                    currentValue = {totalCompletedWeight}
                    targetValue = {totalWeight}
                    startDate = {startDate}
                    endDate = {dueDate}
                    dataTestId = 'GanttSubtarget__subtarget-progress'
                />
                :
                <Typography variant = 'body2' color = 'text.secondary'>No Epics linked</Typography>}
            <StyledHeader>
                {(permissions.edit || isPriority) &&
                    <Tooltip disableInteractive title = {prioritySettings.title}>
                        <div style = {{ cursor: !permissions.edit ? 'default' : 'pointer' }}>
                            <IconButton
                                disabled = {!permissions.edit || loading}
                                onClick = {updateIsPriority}
                                data-testid = 'GanttSubTarget__priority'
                                size = 'medium'
                            >
                                {loading ?
                                    <CircularProgress size = {24} />
                                    :
                                    <Diamond
                                        fontSize = 'medium'
                                        color = {prioritySettings.color}
                                        htmlColor = {prioritySettings.htmlColor}
                                    />
                                }
                            </IconButton>
                        </div>
                    </Tooltip>
                }
                <AutoSaveTextField
                    canEdit = {permissions.edit}
                    initialValue = {title}
                    onSave = {updateTitle}
                    title = {title}
                    fullWidth
                    onHoverChange = {setHover}
                    maxLength = {280}
                    inputProps = {{
                        style: {
                            textOverflow: 'ellipsis',
                            fontWeight: 'bold'
                        }
                    }}
                    style = {{
                        paddingRight: '8px'
                    }}
                    InputProps = {{
                        endAdornment: (permissions.edit &&
                            <Grow in = {hover}>
                                <div style = {{ display: 'flex' }}>
                                    <IconButton
                                        onClick = {updateSubtarget}
                                        data-testid = 'GanttActionButtons__edit'
                                        size = 'small'
                                    >
                                        <Edit fontSize = 'small' color = 'inherit' htmlColor = 'white' />
                                    </IconButton>
                                    <IconButton
                                        onClick = {deleteTarget}
                                        data-testid = 'GanttActionButtons__delete'
                                        size = 'small'
                                    >
                                        <DeleteOutline fontSize = 'small' color = 'inherit' htmlColor = 'white' />
                                    </IconButton>
                                </div>
                            </Grow>
                        )
                    }}
                />
                <IconButton
                    data-testid = {'GanttTarget__expandButton_' + (open ? 'open' : 'closed')}
                    onClick = {() => setOpen(prev => !prev)}
                    style = {{ maxHeight: '40px' }}
                    size = 'small'
                >
                    <ExpandMore
                        style = {{
                            transform: `rotate(${open ? 180 : 0}deg)`,
                            transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
                        }}
                    />
                </IconButton>
            </StyledHeader>
            <Collapse in = {open} collapsedSize = {0}>
                <Stack spacing = {1}>
                    {target.description &&
                        <Typography
                            color = 'text.secondary'
                            variant = 'body2'
                            data-testid = 'GanttSubTarget__description'
                        >
                            {target.description}
                        </Typography>
                    }
                    {permissions.edit &&
                        <Stack direction = 'row' spacing = {1} alignItems = 'center'>
                            <StyledButton
                                data-testid = 'GanttSubTarget__associate-req'
                                onClick = {onClickAssociateRequirements}
                                variant = 'contained'
                            >
                                Associate Requirement
                            </StyledButton>
                            <StyledButton
                                onClick = {onClickAssociateEpics}
                                variant = 'contained'
                            >
                                Associate Epic
                            </StyledButton>
                        </Stack>
                    }
                    {deliverableIds.length > 0 &&
                        <GanttRequirementsList
                            handleEditCapability = {permissions.edit ? handleEditCapability : undefined}
                            portfolioId = {portfolioId}
                            capabilities = {capabilities}
                            deliverableIds = {deliverableIds}
                        />
                    }
                    <GanttEpicsList
                        ids = {epicIds}
                        onDeleteClick = {permissions.edit ? handleEpicDelete : undefined}
                        startDate = {startDate}
                        dueDate = {dueDate}
                    />
                </Stack>
            </Collapse>
        </StyledDiv>
    )
}

GanttSubTarget.propTypes = {
    defaultOpen: PropTypes.bool,
    target: PropTypes.shape({
        deliverableIds: PropTypes.arrayOf(PropTypes.number),
        description: PropTypes.string,
        dueDate: PropTypes.string,
        epicIds: PropTypes.arrayOf(PropTypes.number),
        id: PropTypes.number,
        portfolioId: PropTypes.number,
        startDate: PropTypes.string,
        title: PropTypes.string,
        type: PropTypes.string,
        isPriority: PropTypes.bool
    }).isRequired,
}

GanttSubTarget.defaultProps = {
    defaultOpen: false
}