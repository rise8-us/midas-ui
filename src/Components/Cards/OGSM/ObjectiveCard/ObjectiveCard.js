import { ArchiveOutlined, Chat, Delete, ExploreOutlined } from '@mui/icons-material'
import { DateTimePicker } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Badge, Card, CardHeader, Grid, IconButton, Stack, TextField } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { DateSelector } from 'Components/DateSelector'
import { ConfirmationPopup } from 'Components/Popups/ConfirmationPopup'
import { StatusSelectorChip } from 'Components/StatusSelectorChip'
import useAssertionStatuses from 'Hooks/useAssertionStatuses'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAssertionComment } from 'Redux/AppSettings/reducer'
import {
    requestArchiveAssertion,
    requestDeleteAssertion,
    requestUpdateAssertion
} from 'Redux/Assertions/actions'
import { selectAssertionById } from 'Redux/Assertions/selectors'
import { requestSearchComments } from 'Redux/Comments/actions'
import { styled } from 'Styles/materialThemes'
import { DateInDisplayOrder } from 'Utilities/dateHelpers'

const AutoSaveTextFieldTitle = styled(AutoSaveTextField)(({ theme }) => ({
    ...theme.typography.h5,
    margin: 'auto 0',
    marginRight: 'auto',
    paddingLeft: theme.spacing(1)
}))

function ObjectiveCard({ id, hasEdit }) {
    const dispatch = useDispatch()
    const statuses = useAssertionStatuses()

    const objective = useSelector((state) => selectAssertionById(state, id))

    const defaultTag = statuses.filter((t) => t.name === objective.status)[0] ?? {
        label: 'Not Started',
        color: '#c3c3c3'
    }

    const [openConfirmation, setOpenConfirmation] = useState(false)

    const handleStartDateChange = (newValue) => {
        const updatedObjective = {
            ...objective,
            startDate: newValue,
            children: []
        }
        dispatch(requestUpdateAssertion(updatedObjective))
    }

    const handleDueDateChange = (newValue) => {
        const updatedObjective = {
            ...objective,
            dueDate: newValue,
            children: []
        }
        dispatch(requestUpdateAssertion(updatedObjective))
    }

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

    const onArchiveClick = (event) => {
        event.stopPropagation()
        dispatch(requestArchiveAssertion({ id: id, isArchived: true }))
    }

    const onDeleteClick = (event) => {
        event.stopPropagation()
        setOpenConfirmation(true)
    }

    const onDelete = () => {
        dispatch(requestDeleteAssertion(id))
    }

    const updateObjectiveText = (value) => {
        if (objective.text !== value) {
            const updatedObjective = {
                ...objective,
                text: value,
                children: []
            }
            dispatch(requestUpdateAssertion(updatedObjective))
        }
    }

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
                                                    canEdit = {hasEdit}
                                                    initialValue = {objective.text}
                                                    onSave = {updateObjectiveText}
                                                    title = {objective.text}
                                                    fullWidth
                                                    inputProps = {{
                                                        style: {
                                                            textOverflow: 'ellipsis'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <StatusSelectorChip
                                                    statusName = {defaultTag.name}
                                                    onEditProps = {{ assertionId: id }}
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
                                    initialValue = {DateInDisplayOrder(objective?.startDate ?? null)}
                                    onAccept = {handleStartDateChange}
                                    hasEdit = {hasEdit}
                                />
                            </Grid>
                            <Grid item padding = {2}>
                                <DateSelector
                                    label = 'Due Date'
                                    initialValue = {DateInDisplayOrder(objective?.dueDate ?? null)}
                                    onAccept = {handleDueDateChange}
                                    hasEdit = {hasEdit}
                                />
                            </Grid>
                            <LocalizationProvider dateAdapter = {DateAdapter}>
                                <Grid item padding = {2}>
                                    <DateTimePicker
                                        label = {(objective?.completedAt ?? null) ? 'Completed At' : 'Not Completed'}
                                        value = {objective?.completedAt ?? null}
                                        disabled
                                        disableOpenPicker
                                        onChange = {() => { return }}
                                        renderInput = {(params) => <TextField {...params}/>}
                                    />
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
                                        title = 'archive'
                                        size = 'small'
                                        onClick = {onArchiveClick}
                                    >
                                        <ArchiveOutlined />
                                    </IconButton>
                                    <IconButton
                                        color = 'secondary'
                                        title = 'delete'
                                        size = 'small'
                                        onClick = {onDeleteClick}
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