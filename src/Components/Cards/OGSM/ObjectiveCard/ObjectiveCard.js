import { ArchiveOutlined, Chat, Delete, ExploreOutlined, UnarchiveOutlined } from '@mui/icons-material'
import { DateTimePicker } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Badge, Card, CardHeader, Grid, IconButton, Stack, TextField } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { DateSelector } from 'Components/DateSelector'
import { ConfirmationPopup } from 'Components/Popups/ConfirmationPopup'
import { AssignedUser } from 'Components/Search'
import { StatusSelectorChip } from 'Components/StatusSelectorChip'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAssertionComment } from 'Redux/AppSettings/reducer'
import { selectAssertionStatuses } from 'Redux/AppSettings/selectors'
import {
    requestArchiveAssertion,
    requestDeleteAssertion,
    requestUpdateAssertion
} from 'Redux/Assertions/actions'
import { selectAssertionById } from 'Redux/Assertions/selectors'
import { requestSearchComments } from 'Redux/Comments/actions'
import { styled } from 'Styles/materialThemes'
import { getDateInDisplayOrder } from 'Utilities/dateHelpers'

const AutoSaveTextFieldTitle = styled(AutoSaveTextField)(({ theme }) => ({
    ...theme.typography.h5,
    margin: 'auto 0',
    marginRight: 'auto',
    paddingLeft: theme.spacing(1)
}))

function ObjectiveCard({ id, hasEdit }) {
    const dispatch = useDispatch()

    const objective = useSelector((state) => selectAssertionById(state, id))

    const statuses = useSelector(selectAssertionStatuses)

    const defaultTag = statuses[objective.status] ?? { color: '#c3c3c3' }

    const [openConfirmation, setOpenConfirmation] = useState(false)

    const handlePopup = () => setOpenConfirmation((prev) => !prev)

    const handlePopupCancel = (event) => {
        event.stopPropagation()
        handlePopup()
    }

    const handlePopupConfirm = (event) => {
        event.stopPropagation()
        handlePopup()
        onDelete()
    }

    const onCommentsClick = (event) => {
        event.stopPropagation()
        dispatch(requestSearchComments(`assertion.id:${id}`))
        dispatch(setAssertionComment({
            assertionId: id,
            deletedAssertionId: null,
            type: 'assertions'
        }))
    }

    const onDeleteClick = (event) => {
        event.stopPropagation()
        setOpenConfirmation(true)
    }

    const onDelete = () => {
        dispatch(requestDeleteAssertion(id))
    }

    const updateObjective = (key, value) => {
        value !== objective[key] &&
            dispatch(requestUpdateAssertion({ ...objective, children: [], [key]: value }))
    }

    const archiveObjective = () => dispatch(requestArchiveAssertion({ id, isArchived: !objective.isArchived }))

    return (
        <>
            <Card style = {{ borderRadius: '8px' }}>
                <Grid container wrap = 'nowrap'>
                    <Grid container item>
                        <Grid container height = '60px'>
                            <Grid item flexGrow = {1}>
                                <CardHeader
                                    avatar = {
                                        <ExploreOutlined
                                            fontSize = 'large'
                                            style = {{
                                                color: defaultTag.color
                                            }}
                                        />
                                    }
                                    title = {
                                        <Grid container wrap = 'nowrap'>
                                            <Grid item flexGrow = {1}>
                                                <AutoSaveTextFieldTitle
                                                    dataTestId = 'ObjectiveCard__objective-title'
                                                    canEdit = {hasEdit}
                                                    initialValue = {objective.text}
                                                    onSave = {(v) => updateObjective('text', v)}
                                                    title = {objective.text}
                                                    fullWidth
                                                    inputProps = {{
                                                        style: {
                                                            textOverflow: 'ellipsis'
                                                        }
                                                    }}
                                                    style = {{
                                                        paddingRight: '8px'
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item style = {{ marginRight: '8px' }}>
                                                <AssignedUser
                                                    id = {objective.assignedPersonId}
                                                    hasEdit = {hasEdit}
                                                    onUserChange = {v =>
                                                        updateObjective('assignedPersonId', v.id ?? null)}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <StatusSelectorChip
                                                    statusName = {objective.status}
                                                    onEditProps = {{ id: id, type: 'assertion' }}
                                                    hasEdit = {hasEdit}
                                                />
                                            </Grid>
                                        </Grid>
                                    }
                                    titleTypographyProps = {{
                                        variant: 'h5',
                                        color: 'text.primary',
                                        'data-testid': 'ObjectiveCard__header-title'
                                    }}
                                    style = {{
                                        paddingTop: '8px'
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container
                            alignItems = 'center'
                            sx = {{ justifyContent: { xs: 'center', sm: 'space-between' } }}
                        >
                            <Grid item padding = {2}>
                                <DateSelector
                                    label = 'Start Date'
                                    initialValue = {getDateInDisplayOrder(objective?.startDate)}
                                    onAccept = {(v) => updateObjective('startDate', v)}
                                    hasEdit = {hasEdit}
                                />
                            </Grid>
                            <Grid item padding = {2}>
                                <DateSelector
                                    label = 'Due Date'
                                    initialValue = {getDateInDisplayOrder(objective?.dueDate)}
                                    minDate = {objective.startDate}
                                    onAccept = {(v) => updateObjective('dueDate', v)}
                                    hasEdit = {objective.startDate && hasEdit}
                                />
                            </Grid>
                            <LocalizationProvider dateAdapter = {DateAdapter}>
                                <Grid item padding = {2}>
                                    {objective.completedAt &&
                                        <DateTimePicker
                                            label = {'Completed At'}
                                            value = {objective.completedAt}
                                            disabled
                                            disableOpenPicker
                                            onChange = {() => { return }}
                                            renderInput = {(params) => <TextField {...params}/>}
                                        />
                                    }
                                </Grid>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Grid item margin = {1}>
                        <Stack>
                            <Badge
                                badgeContent = {objective.commentIds?.length}
                                overlap = 'circular'
                                color = 'primary'
                                onClick = {onCommentsClick}
                            >
                                <IconButton color = 'secondary' title = 'comment' size = 'small'>
                                    <Chat />
                                </IconButton>
                            </Badge>
                            {hasEdit && (
                                <>
                                    <IconButton
                                        color = 'secondary'
                                        title = {objective.isArchived ? 'unarchive' : 'archive' }
                                        size = 'small'
                                        onClick = {archiveObjective}
                                    >
                                        {objective.isArchived ? <UnarchiveOutlined /> : <ArchiveOutlined />}
                                    </IconButton>
                                    <IconButton
                                        color = 'secondary'
                                        title = 'delete'
                                        size = 'small'
                                        onClick = {onDeleteClick}
                                        data-testid = {`ObjectiveCard__delete-icon-${id}`}
                                    >
                                        <Delete />
                                    </IconButton>
                                </>
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Card>
            {openConfirmation && (
                <ConfirmationPopup
                    open = {openConfirmation}
                    onConfirm = {handlePopupConfirm}
                    onCancel = {handlePopupCancel}
                    detail = {`You are about to delete objective: '${objective.text}'`}
                />
            )}
        </>
    )
}

ObjectiveCard.propTypes = {
    id: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired
}

export default ObjectiveCard