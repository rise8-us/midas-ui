import { Chat, Delete, TrackChangesOutlined } from '@mui/icons-material'
import { Badge, Divider, Grid, IconButton, Stack, Typography } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { CollapsableCard } from 'Components/Cards/CollapsableCard'
import { CompletionType } from 'Components/CompletionType'
import { DateSelector } from 'Components/DateSelector'
import { ConfirmationPopup } from 'Components/Popups/ConfirmationPopup'
import { ProgressBar } from 'Components/ProgressBar'
import { StatusSelectorChip } from 'Components/StatusSelectorChip'
import { parseISO } from 'date-fns'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAssertionComment } from 'Redux/AppSettings/reducer'
import { selectAssertionStatuses, selectCompletionTypes } from 'Redux/AppSettings/selectors'
import { requestSearchComments } from 'Redux/Comments/actions'
import { requestDeleteMeasure, requestUpdateMeasure } from 'Redux/Measures/actions'
import { selectMeasureById } from 'Redux/Measures/selectors'
import { styled } from 'Styles/materialThemes'
import { getDateInDisplayOrder } from 'Utilities/dateHelpers'

const AutoSaveTextFieldTitle = styled(AutoSaveTextField)(({ theme }) => ({
    ...theme.typography.h5,
    fontSize: '18px',
}))

const isManualOption = (option) => ['BINARY', 'PERCENTAGE', 'NUMBER', 'MONEY'].includes(option)

const displayCompletedAt = (dateTime) => {
    const date = parseISO(dateTime).toString().split(' ')

    return (
        <Typography textAlign = 'center' color = 'primary'>
            Completed on: {date[0]} {date[1]} {date[2]} {date[3]}
        </Typography>
    )
}

const determineStatusByValue = (data, origStatus) => {
    if (data.value === 0 && data.startDate === null) {
        return 'NOT_STARTED'
    } else if (data.value !== data.target && data.dueDate !== null && new Date(data.dueDate) < new Date()) {
        return 'BLOCKED'
    } else if (data.value === 0 && data.startDate !== null) {
        return 'ON_TRACK'
    } else {
        return origStatus
    }
}

export default function MeasureCard({ id, hasEdit, icon }) {
    const dispatch = useDispatch()
    const collapse = useRef(null)

    const allStatuses = useSelector(selectAssertionStatuses)
    const allCompletionTypes = useSelector(selectCompletionTypes)
    const measure = useSelector((state) => selectMeasureById(state, id))

    const [openConfirmation, setOpenConfirmation] = useState(false)
    const [expanded, setExpanded] = useState(false)

    const status = allStatuses[measure.status] ?? { color: '#c3c3c3' }
    const selectedCompletionType = allCompletionTypes[measure.completion.completionType]

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
        value !== measure[key] &&
            dispatch(requestUpdateMeasure({ ...measure, [key]: value }))
    }

    const updateMeasureCompletion = (data) => {
        dispatch(requestUpdateMeasure({
            ...measure,
            status: determineStatusByValue({ ...measure.completion, ...data }, measure.status),
            completion: {
                ...measure.completion,
                ...data
            }
        }))
    }

    return (
        <CollapsableCard
            ref = {collapse}
            onExpanded = {setExpanded}
            header = {
                <Grid
                    container
                    wrap = 'nowrap'
                    columnGap = {1}
                    padding = {1}
                    flexGrow = {1}
                >
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
                            data-testid = {`MeasureCard__title-input-${id}`}
                        />
                    </Grid>
                    <Grid item marginTop = '3px'>
                        <StatusSelectorChip
                            statusName = {measure.status}
                            onEditProps = {{ id: id, type: 'measure' }}
                            hasEdit = {hasEdit} />
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
                                    data-testid = {`MeasureCard__delete-icon-${id}`}
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
                    showPercent = {expanded}
                    value = {measure.completion.value}
                    target = {measure.completion.target}
                    hasEdit = {hasEdit}
                    overlayDate = {{
                        end: measure.completion.dueDate,
                        show: true,
                        start: measure.completion.startDate
                    }}
                    progressCompleteComponent = {measure?.completion?.completedAt
                        ? () => <span>{ displayCompletedAt(measure.completion.completedAt) }</span>
                        : undefined
                    }
                    descriptor = {selectedCompletionType?.descriptor ? ` ${selectedCompletionType.descriptor}` : null}
                />
            }
        >
            <Grid
                container
                justifyContent = 'space-between'
                marginBottom = {2}
                paddingX = {2}
                data-testid = {`MeasureCard__collapsable-card-${id}`}
            >
                <Grid item xs = {12}>
                    {hasEdit &&
                        <Stack spacing = {1} paddingBottom = {1}>
                            <CompletionType
                                hasEdit = {hasEdit}
                                completion = {measure.completion}
                                onChange = {updateMeasureCompletion}
                            />
                            <Divider />
                        </Stack>
                    }
                </Grid>
                <Grid item container justifyContent = 'space-around'>
                    <Grid item width = '96px' data-testid = {`MeasureCard__start-date-${id}`}>
                        <DateSelector
                            label = 'Start Date'
                            initialValue = {getDateInDisplayOrder(measure?.completion?.startDate)}
                            onAccept = {startDate => updateMeasureCompletion({ startDate })}
                            hasEdit = {isManualOption(measure.completion.completionType) && hasEdit}
                        />
                    </Grid>
                    <Grid item width = '96px' data-testid = {`MeasureCard__due-date-${id}`}>
                        <DateSelector
                            label = 'Due Date'
                            minDate = {measure.completion.startDate}
                            initialValue = {getDateInDisplayOrder(measure?.completion?.dueDate)}
                            onAccept = {dueDate => updateMeasureCompletion({ dueDate })}
                            hasEdit = {
                                isManualOption(measure.completion.completionType) &&
                                measure.completion.startDate &&
                                hasEdit
                            }
                        />
                    </Grid>
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
        </CollapsableCard>
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