import { Chat, Delete, OpenWith as Directions } from '@mui/icons-material'
import { DateTimePicker } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Badge, Grid, IconButton, TextField } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { Collapsable } from 'Components/Cards/Collapsable'
import { DateSelector } from 'Components/DateSelector'
import { ConfirmationPopup } from 'Components/Popups/ConfirmationPopup'
import useAssertionStatuses from 'Hooks/useAssertionStatuses'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAssertionComment } from 'Redux/AppSettings/reducer'
import {
    requestDeleteAssertion,
    requestUpdateAssertion
} from 'Redux/Assertions/actions'
import { selectAssertionById } from 'Redux/Assertions/selectors'
import { requestSearchComments } from 'Redux/Comments/actions'
import { styled } from 'Styles/materialThemes'
import { DateInDisplayOrder } from 'Utilities/dateHelpers'
import { MeasureContainer } from '../MeasureContainer'

const AutoSaveTextFieldTitle = styled(AutoSaveTextField)(({ theme }) => ({
    ...theme.typography.h6,
    margin: 'auto 0',
    marginRight: 'auto',
    paddingLeft: theme.spacing(1)
}))

function StrategyCard({ id, hasEdit }) {
    const dispatch = useDispatch()
    const statuses = useAssertionStatuses()

    const collapse = useRef(null)

    const strategy = useSelector((state) => selectAssertionById(state, id))

    const defaultStatus = statuses.filter((t) => t.name === strategy.status)[0] ?? { color: '#c3c3c3' }

    const [openConfirmation, setOpenConfirmation] = useState(false)

    const handleStartDateChange = (newValue) => {
        const updatedObjective = {
            ...strategy,
            startDate: newValue,
            children: []
        }
        dispatch(requestUpdateAssertion(updatedObjective))
    }

    const handleDueDateChange = (newValue) => {
        const updatedObjective = {
            ...strategy,
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
        dispatch(setAssertionComment({ assertionId: id, type: 'assertions', deletedAssertionId: null }))
    }

    const onDeleteClick = (event) => {
        event.stopPropagation()
        setOpenConfirmation(true)
    }

    const onDelete = () => {
        dispatch(requestDeleteAssertion(id))
    }

    const updateStrategyText = (value) => {
        if (strategy.text !== value) {
            const updatedObjective = {
                ...strategy,
                text: value,
                children: []
            }
            dispatch(requestUpdateAssertion(updatedObjective))
        }
    }

    return (
        <>
            <Collapsable
                ref = {collapse}
                width = '100%'
                header = {
                    <Grid container wrap = 'nowrap' columnGap = {1} padding = {1} flexGrow = {1}>
                        <Grid item>
                            <Directions
                                style = {{
                                    color: defaultStatus.color,
                                    marginTop: '5px'
                                }}
                            />
                        </Grid>
                        <Grid item flexGrow = {1}>
                            <AutoSaveTextFieldTitle
                                initialValue = {strategy.text}
                                canEdit = {hasEdit}
                                onSave = {updateStrategyText}
                                fullWidth
                            />
                        </Grid>
                        <Grid container item direction = 'column' marginRight = '3px' width = 'fit-content'>
                            <Grid item>
                                <Badge
                                    badgeContent = {strategy.commentIds?.length}
                                    overlap = 'circular'
                                    color = 'primary'
                                    onClick = {onCommentsClick}
                                >
                                    <IconButton color = 'secondary' title = 'comment' size = 'small'>
                                        <Chat />
                                    </IconButton>
                                </Badge>
                            </Grid>
                            {hasEdit && (
                                <Grid item>
                                    <IconButton
                                        color = 'secondary'
                                        title = 'delete'
                                        size = 'small'
                                        onClick = {onDeleteClick}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                }
            >
                <Grid container wrap = 'nowrap' columnGap = {2}>
                    <Grid container
                        item
                        direction = 'column'
                        xs = 'auto'
                        rowGap = {2}
                        marginLeft = {2}
                        marginBottom = {2}
                    >
                        <Grid item padding = {2}>
                            <DateSelector
                                label = 'Start Date'
                                initialValue = {DateInDisplayOrder(strategy?.startDate ?? null)}
                                onAccept = {handleStartDateChange}
                                hasEdit = {hasEdit}
                            />
                        </Grid>
                        <Grid item padding = {2}>
                            <DateSelector
                                label = 'Due Date'
                                initialValue = {DateInDisplayOrder(strategy?.dueDate ?? null)}
                                onAccept = {handleDueDateChange}
                                hasEdit = {hasEdit}
                            />
                        </Grid>
                        <Grid item padding = {2}>
                            <LocalizationProvider dateAdapter = {DateAdapter}>
                                <DateTimePicker
                                    label = {(strategy?.completedAt ?? null) ? 'Completed At' : 'Not Completed'}
                                    value = {strategy?.completedAt ?? null}
                                    disabled
                                    disableOpenPicker
                                    onChange = {() => { return }}
                                    renderInput = {(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Grid item flexGrow = {1} marginRight = {1}>
                        <MeasureContainer id = {id} hasEdit = {hasEdit} />
                    </Grid>
                </Grid>
            </Collapsable>
            {openConfirmation && (
                <ConfirmationPopup
                    open = {openConfirmation}
                    onConfirm = {handlePopupConfirm}
                    onCancel = {handlePopupCancel}
                    detail = {`You are about to delete strategy: '${strategy.text}'`}
                />
            )}
        </>
    )
}

StrategyCard.propTypes = {
    id: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired
}

export default StrategyCard