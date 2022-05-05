import { DeleteOutline, ExpandMore } from '@mui/icons-material'
import { Button, Collapse, Grow, IconButton } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCapabilitiesByPortfolioId } from 'Redux/Capabilities/selectors'
import { selectDeliverablesById } from 'Redux/Deliverables/selectors'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { requestDeleteTarget, requestUpdateTarget } from 'Redux/Targets/actions'
import TargetConstants from 'Redux/Targets/constants'
import { styled } from 'Styles/materialThemes'
import { GanttRequirements } from '../GanttRequirements'

const StyledDiv = styled('div')(({ theme }) => ({
    borderRadius: '6px',
    color: theme.palette.gantt.subtarget.dark.text,
    background: theme.palette.gantt.subtarget.dark.background,
    padding: theme.spacing(1),
    minWidth: '106px',
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
    margin: '8px 0px',
    '&:hover': {
        background: '#3e94cf'
    }
}))

export default function GanttSubTarget({ target, defaultOpen }) {
    const dispatch = useDispatch()
    const { id, portfolioId, title, deliverableIds } = target
    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))
    const capabilities = useSelector(state => selectCapabilitiesByPortfolioId(state, portfolioId))
    const deliverables = useSelector(state => selectDeliverablesById(state, deliverableIds))

    const deleteTarget = () => {
        dispatch(openPopup(TargetConstants.DELETE_TARGET, 'DeletePopup', {
            id: id,
            title: title,
            type: 'subtarget',
            request: requestDeleteTarget,
            constant: TargetConstants.DELETE_TARGET
        }))
    }

    const associateReq = () => {
        dispatch(openPopup(
            TargetConstants.UPDATE_TARGET,
            'AssociateRequirementsPopup',
            { id, capabilities, target }))
    }

    const updateTitle = (newTitle) => {
        dispatch(requestUpdateTarget({
            ...target,
            title: newTitle,
        }))
    }

    const [open, setOpen] = useState(defaultOpen)
    const [hover, setHover] = useState(false)


    return (
        <StyledDiv>
            <StyledHeader>
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
                            textOverflow: 'ellipsis'
                        }
                    }}
                    style = {{
                        paddingRight: '8px'
                    }}
                    InputProps = {{
                        endAdornment: (permissions.edit &&
                            <Grow in = {hover}>
                                <IconButton
                                    onClick = {deleteTarget}
                                    data-testid = 'GanttActionButtons__delete'
                                    size = 'small'
                                >
                                    <DeleteOutline fontSize = 'small' color = 'inherit' htmlColor = 'white' />
                                </IconButton>
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
            <Collapse
                in = {open}
                collapsedSize = {0}
            >
                {permissions.edit &&
                    <div>
                        <StyledButton
                            data-testid = 'GanttSubTarget__associate-req'
                            onClick = {associateReq}
                            color = 'secondary'
                            variant = 'contained'
                            style = {{ marginRight: '8px' }}
                        >
                            Associate Req
                        </StyledButton>
                        <StyledButton
                            color = 'secondary'
                            variant = 'contained'
                            style = {{ display: 'none' }}
                        >
                            Associate Epic
                        </StyledButton>
                    </div>
                }
                <GanttRequirements
                    id = {id}
                    portfolioId = {portfolioId}
                    deliverables = {deliverables}
                    target = {target}/>
            </Collapse>
        </StyledDiv>
    )
}

GanttSubTarget.propTypes = {
    target: PropTypes.shape({
        id: PropTypes.number,
        portfolioId: PropTypes.number,
        title: PropTypes.string,
        type: PropTypes.string,
        startDate: PropTypes.string,
        dueDate: PropTypes.string,
        deliverableIds: PropTypes.array
    }).isRequired,
    defaultOpen: PropTypes.bool,
}

GanttSubTarget.defaultProps = {
    defaultOpen: false
}