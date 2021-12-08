import { Chat, Delete, TrackChangesOutlined } from '@mui/icons-material'
import { Badge, Divider, Grid, IconButton, Stack, Typography } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { Collapsable } from 'Components/Cards/Collapsable'
import { DateSelector } from 'Components/DateSelector'
import { CompletionType } from 'Components/OGSM/CompletionType'
import { ConfirmationPopup } from 'Components/Popups/ConfirmationPopup'
import { ProgressBar } from 'Components/ProgressBar'
import { StatusSelectorChip } from 'Components/StatusSelectorChip'
import { parseISO } from 'date-fns'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAssertionComment } from 'Redux/AppSettings/reducer'
import { selectAssertionStatuses } from 'Redux/AppSettings/selectors'
import { requestSearchComments } from 'Redux/Comments/actions'
import { requestDeleteMeasure, requestUpdateMeasure } from 'Redux/Measures/actions'
import { selectMeasureById } from 'Redux/Measures/selectors'
import { styled } from 'Styles/materialThemes'
import { dateInDisplayOrder } from 'Utilities/dateHelpers'
import { getMeasureStatus } from 'Utilities/getMeasureStatus'

const AutoSaveTextFieldTitle = styled(AutoSaveTextField)(({ theme }) => ({
    ...theme.typography.h5,
    fontSize: '18px',
}))

const displayCompletedAt = (dateTime) => {
    const date = parseISO(dateTime).toString().split(' ')

    return (
        <Typography textAlign = 'center' color = 'primary'>
            Completed on: {date[0]} {date[1]} {date[2]} {date[3]}
        </Typography>
    )
}
export default function MeasureCard({ id, hasEdit, icon }) {
    const dispatch = useDispatch()
    const collapse = useRef(null)

    const allStatuses = useSelector(selectAssertionStatuses)
    const measure = useSelector((state) => selectMeasureById(state, id))

    const status = allStatuses[getMeasureStatus(measure)] ?? { label: 'Not Started', color: '#c3c3c3' }

    const [openConfirmation, setOpenConfirmation] = useState(false)
    const [expanded, setExpanded] = useState(false)

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

    const onDelete = () => dispatch(requestDeleteMeasure(measure.id))

    const updateMeasure = (key, value) => {
        value !== measure[key] && dispatch(requestUpdateMeasure({ ...measure, children: [], [key]: value }))
    }

    const updateCompletionType = (data) => dispatch(requestUpdateMeasure({ ...measure, children: [], ...data }))

    return (
        <Collapsable
            ref = {collapse}
            onExpanded = {setExpanded}
            header = {
                <Grid container wrap = 'nowrap' columnGap = {1} padding = {1} flexGrow = {1}>
                    <Grid
                        item
                        sx = {{ display: { xs: 'none', sm: 'flex' } }}
                        style = {{ marginTop: '4px', color: status.color }}
                    >
                        {icon}
                    </Grid>
                    <Grid item flexGrow = {1}>
                        <AutoSaveTextFieldTitle
                            canEdit = {hasEdit}
                            initialValue = {measure.text}
                            onSave = {(v) => updateMeasure('text', v)}
                            title = {measure.text}
                            fullWidth
                            multiline
                        />
                    </Grid>
                    <Grid item marginTop = '3px'>
                        <StatusSelectorChip statusName = {status?.name}/>
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
                        {hasEdit &&
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
                        }
                    </Grid>
                </Grid>
            }
            footer = {
                <ProgressBar
                    value = {measure.value}
                    target = {measure.target}
                    onSaveTarget = {(v) => updateMeasure('target', v)}
                    onSaveValue = {(v) => updateMeasure('value', v)}
                    hasEdit = {hasEdit}
                    hasHover = {expanded}
                    overlayDate = {{
                        end: measure.dueDate,
                        show: true,
                        start: measure.startDate
                    }}
                    progressCompleteComponent = {measure.completedAt
                        ? () => <span>{ displayCompletedAt(measure.completedAt) }</span>
                        : undefined
                    }
                    showPercent = {expanded}
                />
            }
        >
            <Grid container justifyContent = 'space-between' spacing = {2} paddingX = {2}>
                <Grid item xs = {4}>
                    <DateSelector
                        label = 'Start Date'
                        onAccept = {(v) => updateMeasure('startDate', v)}
                        initialValue = {dateInDisplayOrder(measure?.startDate ?? null)}
                        hasEdit = {hasEdit}
                    />
                </Grid>
                <Grid item xs = {4}>
                    <DateSelector
                        label = 'Due Date'
                        initialValue = {dateInDisplayOrder(measure?.dueDate ?? null)}
                        onAccept = {(v) => updateMeasure('dueDate', v)}
                        hasEdit = {hasEdit}
                    />
                </Grid>
                <Grid item xs = {12}>
                    {hasEdit &&
                        <Stack spacing = {2} paddingBottom = {2}>
                            <Divider />
                            <CompletionType
                                hasEdit = {hasEdit}
                                value = {measure.value}
                                target = {measure.target}
                                completionType = {measure.completionType}
                                onSaveValue = {(v) => updateMeasure('value', v)}
                                onSaveTarget = {(v) => updateMeasure('target', v)}
                                onChangeType = {updateCompletionType}
                            />
                        </Stack>
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
    )
}

MeasureCard.propTypes = {
    id: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool.isRequired,
    icon: PropTypes.node
}

MeasureCard.defaultProps = {
    icon: <TrackChangesOutlined/>
}