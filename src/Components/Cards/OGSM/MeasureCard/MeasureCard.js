import { Chat, Delete, TrackChangesOutlined } from '@mui/icons-material'
import { DateTimePicker } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Badge, Grid, IconButton, LinearProgress, TextField, Typography } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { Collapsable } from 'Components/Cards/Collapsable'
import { DateSelector } from 'Components/DateSelector'
import { ConfirmationPopup } from 'Components/Popups/ConfirmationPopup'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAssertionComment } from 'Redux/AppSettings/reducer'
import { requestSearchComments } from 'Redux/Comments/actions'
import { requestDeleteMeasure, requestUpdateMeasure } from 'Redux/Measures/actions'
import { selectMeasureById } from 'Redux/Measures/selectors'
import { styled } from 'Styles/materialThemes'
import { DateInDisplayOrder } from 'Utilities/dateHelpers'

const AutoSaveTextFieldTitle = styled(AutoSaveTextField)(({ theme }) => ({
    ...theme.typography.h5,
    fontSize: '18px',
}))

export const determineStatusColor = (measure) => {
    if (measure.completedAt) return '#0fcf50'
    else if (!measure.completedAt && measure.startDate) return '#5dade2'
    else return '#c3c3c3'
}

function MeasureCard({ id, hasEdit }) {
    const dispatch = useDispatch()

    const measure = useSelector((state) => selectMeasureById(state, id))
    const collapse = useRef(null)

    const [openConfirmation, setOpenConfirmation] = useState(false)

    const handleStartDateChange = (newValue) => {
        const updatedMeasure = {
            ...measure,
            startDate: newValue,
            children: []
        }
        dispatch(requestUpdateMeasure(updatedMeasure))
    }

    const handleDueDateChange = (newValue) => {
        const updatedMeasure = {
            ...measure,
            dueDate: newValue,
            children: []
        }
        dispatch(requestUpdateMeasure(updatedMeasure))
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
        dispatch(requestSearchComments(`measure.id:${measure.id}`))
        dispatch(setAssertionComment({ assertionId: measure.id, type: 'measures', deletedMeasureId: null }))
    }

    const onDeleteClick = (event) => {
        event.stopPropagation()
        setOpenConfirmation(true)
    }

    const onDelete = () => {
        dispatch(requestDeleteMeasure(id))
    }

    const updateMeasureText = (value) => {
        if (measure.text !== value) {
            const updatedMeasure = {
                ...measure,
                text: value,
                children: []
            }
            dispatch(requestUpdateMeasure(updatedMeasure))
        }
    }

    const updateMeasureCurrentValue = (value) => {
        if (measure.value !== value) {
            const updatedMeasure = {
                ...measure,
                value: value,
                children: []
            }
            dispatch(requestUpdateMeasure(updatedMeasure))
        }
    }

    const updateMeasureTarget = (value) => {
        if (measure.target !== value) {
            const updatedMeasure = {
                ...measure,
                target: value,
                children: []
            }
            dispatch(requestUpdateMeasure(updatedMeasure))
        }
    }

    return (
        <>
            <Collapsable
                ref = {collapse}
                header = {
                    <Grid container wrap = 'nowrap' columnGap = {1} padding = {1} flexGrow = {1}>
                        <Grid item>
                            <TrackChangesOutlined
                                fontSize = 'medium'
                                style = {{
                                    color: determineStatusColor(measure),
                                    marginTop: '5px'
                                }}
                            />
                        </Grid>
                        <Grid item flexGrow = {1}>
                            <AutoSaveTextFieldTitle
                                canEdit = {hasEdit}
                                initialValue = {measure.text}
                                onSave = {updateMeasureText}
                                title = {measure.text}
                                fullWidth
                                multiline
                            />
                        </Grid>
                        <Grid container item direction = 'column' marginRight = '3px' width = 'fit-content'>
                            <Grid item>
                                <Badge
                                    badgeContent = {measure.commentIds?.length}
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
                footer = {
                    <Grid
                        container
                        sx = {{
                            display: 'flex',
                            paddingBottom: '8px',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Grid item sx = {{ padding: '8px', width: '100%' }}>
                            <LinearProgress
                                variant = 'determinate'
                                value = {measure.value / measure.target * 100 ?? null}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant = 'body2' color = 'primary' >{`${Math.round(
                                measure.value / measure.target * 100,)}% Complete`}
                            </Typography>
                        </Grid>
                    </Grid>
                }
            >
                <Grid container >
                    <Grid container
                        direction = 'column'
                        sx = {{ justifyContent: { xs: 'center', sm: 'space-between' } }}
                    >
                        <Grid item padding = {2}>
                            <DateSelector
                                label = 'Start Date'
                                initialValue = {DateInDisplayOrder(measure?.startDate ?? null)}
                                onAccept = {handleStartDateChange}
                                hasEdit = {hasEdit}
                            />
                        </Grid>
                        <Grid item padding = {2}>
                            <DateSelector
                                label = 'Due Date'
                                initialValue = {DateInDisplayOrder(measure?.dueDate ?? null)}
                                onAccept = {handleDueDateChange}
                                hasEdit = {hasEdit}
                            />
                        </Grid>
                        <Grid item padding = {2}>
                            <LocalizationProvider dateAdapter = {DateAdapter}>
                                <DateTimePicker
                                    label = {measure.completedAt ? 'Completed At' : 'Not Completed'}
                                    value = {measure.completedAt ?? null}
                                    disabled
                                    disableOpenPicker
                                    onChange = {() => { return }}
                                    renderInput = {(params) => <TextField {...params}/>}
                                />
                            </LocalizationProvider>
                        </Grid>
                        {hasEdit &&
                            <>
                                <Grid item padding = '16px'>
                                    <AutoSaveTextField
                                        canEdit = {hasEdit}
                                        disabled = {!hasEdit}
                                        variant = 'outlined'
                                        label = 'Current Value'
                                        initialValue = {measure.value.toString()}
                                        onSave = {updateMeasureCurrentValue}
                                        title = 'Current Value'
                                        revertOnEmpty
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item padding = '16px'>
                                    <AutoSaveTextField
                                        canEdit = {hasEdit}
                                        disabled = {!hasEdit}
                                        variant = 'outlined'
                                        label = 'Target'
                                        initialValue = {measure.target.toString()}
                                        onSave = {updateMeasureTarget}
                                        title = 'Target'
                                        revertOnEmpty
                                        fullWidth
                                    />
                                </Grid>
                            </>
                        }
                    </Grid>
                </Grid>
                {openConfirmation && (
                    <ConfirmationPopup
                        open = {openConfirmation}
                        onConfirm = {handlePopupConfirm}
                        onCancel = {handlePopupCancel}
                        detail = {`You are about to delete measure: '${measure.text}'`}
                    />
                )}
            </Collapsable>
        </>
    )
}

MeasureCard.propTypes = {
    id: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired
}

export default MeasureCard