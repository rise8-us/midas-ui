import { Chat, Delete, OpenWith as Directions } from '@mui/icons-material'
import { DateTimePicker } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Badge, Grid, IconButton, Stack, TextField } from '@mui/material'
import { MeasuresContainer } from 'Components/Assertions/'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { CollapsableCard } from 'Components/Cards/CollapsableCard'
import { DateSelector } from 'Components/DateSelector'
import { ConfirmationPopup } from 'Components/Popups/ConfirmationPopup'
import { AssignedUser } from 'Components/Search'
import { StatusSelectorChip } from 'Components/StatusSelectorChip'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAssertionComment } from 'Redux/AppSettings/reducer'
import { selectAssertionStatuses } from 'Redux/AppSettings/selectors'
import { requestDeleteAssertion, requestUpdateAssertion } from 'Redux/Assertions/actions'
import { selectAssertionById } from 'Redux/Assertions/selectors'
import { requestSearchComments } from 'Redux/Comments/actions'
import { styled } from 'Styles/materialThemes'
import { getDateInDisplayOrder } from 'Utilities/dateHelpers'

const AutoSaveTextFieldTitle = styled(AutoSaveTextField)(({ theme }) => ({
    ...theme.typography.h6,
    margin: 'auto 0',
    marginRight: 'auto',
    paddingLeft: theme.spacing(1)
}))

const StyledDiv = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1, 1, 4),
}))

function StrategyCard({ id, hasEdit }) {
    const dispatch = useDispatch()
    const collapse = useRef(null)

    const strategy = useSelector((state) => selectAssertionById(state, id))
    const statuses = useSelector(selectAssertionStatuses)

    const defaultStatus = statuses[strategy.status] ?? { color: '#c3c3c3' }

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
        dispatch(setAssertionComment({ assertionId: id, type: 'assertions', deletedAssertionId: null }))
    }

    const onDeleteClick = (event) => {
        event.stopPropagation()
        setOpenConfirmation(true)
    }

    const onDelete = () => {
        dispatch(requestDeleteAssertion(id))
    }

    const updateStrategy = (key, value) => {
        value !== strategy[key] &&
            dispatch(requestUpdateAssertion({ ...strategy, children: [], [key]: value }))
    }

    return (
        <>
            <CollapsableCard
                ref = {collapse}
                width = '100%'
                header = {
                    <Grid container wrap = 'nowrap' columnGap = {1} padding = {1} flexGrow = {1}>
                        <Grid
                            item
                            sx = {{ display: { xs: 'none', sm: 'flex' } }}
                            style = {{ height: '38px', color: defaultStatus.color }}
                            alignItems = 'center'
                        >
                            <Directions />
                        </Grid>
                        <Grid item flexGrow = {1}>
                            <AutoSaveTextFieldTitle
                                initialValue = {strategy.text}
                                canEdit = {hasEdit}
                                onSave = {(v) => updateStrategy('text', v)}
                                fullWidth
                                inputProps = {{
                                    style: {
                                        textOverflow: 'ellipsis'
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <AssignedUser
                                hasEdit = {hasEdit}
                                id = {strategy.assignedPersonId}
                                onUserChange = {v => updateStrategy('assignedPersonId', v.id ?? null)}
                            />
                        </Grid>
                        <Grid item marginTop = '6px'>
                            <StatusSelectorChip
                                statusName = {strategy.status}
                                onEditProps = {{ id: id, type: 'assertion' }}
                                hasEdit = {hasEdit}
                            />
                        </Grid>
                        <Grid item>
                            <Stack marginTop = '3px'>
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
                                {hasEdit &&
                                    <IconButton
                                        color = 'secondary'
                                        title = 'delete'
                                        size = 'small'
                                        onClick = {onDeleteClick}
                                    >
                                        <Delete />
                                    </IconButton>
                                }
                            </Stack>
                        </Grid>
                    </Grid>
                }
                footer = {
                    <StyledDiv>
                        <MeasuresContainer assertionId = {id} hasEdit = {hasEdit} />
                    </StyledDiv>
                }
            >
                <Stack spacing = {2}>
                    <Grid container justifyContent = 'space-between'>
                        <Grid item padding = {2}>
                            <DateSelector
                                label = 'Start Date'
                                initialValue = {getDateInDisplayOrder(strategy?.startDate)}
                                onAccept = {(v) => updateStrategy('startDate', v)}
                                hasEdit = {hasEdit}
                            />
                        </Grid>
                        <Grid item padding = {2}>
                            <DateSelector
                                label = 'Due Date'
                                initialValue = {getDateInDisplayOrder(strategy?.dueDate)}
                                minDate = {strategy.startDate}
                                onAccept = {(v) => updateStrategy('dueDate', v)}
                                hasEdit = {strategy.startDate && hasEdit}
                            />
                        </Grid>
                        <LocalizationProvider dateAdapter = {DateAdapter}>
                            <Grid item padding = {2} display = {'flex'}>
                                {strategy.completedAt &&
                                    <DateTimePicker
                                        label = 'Completed At'
                                        value = {strategy.completedAt}
                                        disabled
                                        disableOpenPicker
                                        onChange = {() => { return }}
                                        renderInput = {(params) => <TextField {...params} />}
                                    />
                                }
                            </Grid>
                        </LocalizationProvider>
                    </Grid>
                </Stack>
            </CollapsableCard>
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