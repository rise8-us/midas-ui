import { Clear, Delete } from '@mui/icons-material'
import { MobileDatePicker } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Autocomplete, Button, IconButton, Stack, TextField } from '@mui/material'
import { Popup } from 'Components/Popup'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRoadmapStatuses } from 'Redux/AppSettings/selectors'
import { selectRequestErrors } from 'Redux/Errors/selectors'
import { closePopup } from 'Redux/Popups/actions'
import { requestCreateRoadmap, requestDeleteRoadmap, requestUpdateRoadmap } from 'Redux/Roadmaps/actions'
import RoadmapConstants from 'Redux/Roadmaps/constants'
import { selectRoadmapById } from 'Redux/Roadmaps/selectors'
import FormatErrors from 'Utilities/FormatErrors'
import { ConfirmationPopup } from '../ConfirmationPopup'


const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Roadmap' : 'Update Roadmap',
        constant: create ? RoadmapConstants.CREATE_ROADMAP : RoadmapConstants.UPDATE_ROADMAP,
        request: (data) => create ? requestCreateRoadmap(data) : requestUpdateRoadmap(data)
    }
}

const GetValidDate = (date) => {
    if (date !== null && date?.toString() !== 'Invalid Date') {
        const newDate = new Date(date).toISOString().split('T')[0]
        if (newDate.split('-')[0] < 2000) {
            return 'invalid'
        } else {
            return newDate
        }
    } else if (date === null) {
        return null
    } else {
        return 'invalid'
    }
}

const GetDateInOrder = (date) => {
    if (date !== null && typeof date === 'string') {
        const splitDate = date.split('-')
        return splitDate[1] + '-' + splitDate[2] + '-' + splitDate[0]
    } else {
        return null
    }
}

function RoadmapEntryPopup({ id, productId }) {
    const dispatch = useDispatch()

    const roadmapEntry = useSelector(state => selectRoadmapById(state, id))
    const context = initDetails(roadmapEntry.id === undefined)

    const allRoadmapStatuses = useSelector(selectRoadmapStatuses)

    const errors = useSelector(state => selectRequestErrors(state, context.constant))
    const titleErrors = useMemo(() => errors.filter(error => error.includes('title')), [errors])

    const [open, setOpen] = useState(false)

    const [formValues, formDispatch] = React.useReducer(useFormReducer, {
        title: roadmapEntry.title,
        description: roadmapEntry.description,
        status: null,
        startDate: roadmapEntry.startDate ?? null,
        dueDate: roadmapEntry.dueDate ?? null
    })

    const handleChange = (name, value) => {
        formDispatch({
            type: 'onChange',
            payload: { name, value }
        })
    }

    const handleDateChange = (key, newValue) => {
        const validDate = GetValidDate(newValue)
        validDate !== 'invalid' && handleChange(key, validDate)
    }

    const onClose = () => dispatch(closePopup(context.constant))

    const onSubmit = () => {
        dispatch(context.request({
            ...roadmapEntry,
            title: formValues.title,
            description: formValues.description,
            status: formValues.status?.name ?? 'FUTURE',
            startDate: formValues.startDate,
            dueDate: formValues.dueDate,
            productId
        }))
    }

    const handlePopup = () => {
        setOpen(prev => !prev)
    }

    const handlePopupCancel = (event) => {
        event.stopPropagation()
        handlePopup()
    }

    const handlePopupConfirm = (event) => {
        event.stopPropagation()
        onClose()
        handlePopup()
        dispatch(requestDeleteRoadmap(id))
    }

    useEffect(() => {
        handleChange('status', allRoadmapStatuses[roadmapEntry.status] ?? null)
    }, [allRoadmapStatuses])

    return (
        <Popup
            title = {context.title}
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Stack spacing = {1}>
                <TextField
                    label = 'Title'
                    data-testid = 'RoadmapEntryPopup__input-title'
                    value = {formValues.title}
                    onChange = {(e) => handleChange('title', e.target.value)}
                    error = {titleErrors.length > 0}
                    helperText = {<FormatErrors errors = {titleErrors}/>}
                    required
                />
                <TextField
                    label = 'Description'
                    data-testid = 'RoadmapEntryPopup__input-description'
                    value = {formValues.description}
                    onChange = {(e) => handleChange('description', e.target.value)}
                    multiline
                />
                <Autocomplete
                    value = {formValues.status}
                    onChange = {(_e, values) => handleChange('status', values)}
                    options = {Object.values(allRoadmapStatuses)}
                    getOptionLabel = {(option) => option.label}
                    renderInput = {(params) => (
                        <TextField
                            {...params}
                            label = 'Status'
                            margin = 'dense'
                            InputProps = {{ ...params.InputProps, readOnly: true }}
                        />
                    )}
                />
                <LocalizationProvider dateAdapter = {DateAdapter}>
                    <MobileDatePicker
                        clearable
                        label = 'Start Date'
                        inputFormat = 'MM/dd/yyyy'
                        value = {GetDateInOrder(formValues.startDate)}
                        onChange = {(value) => handleDateChange('startDate', value)}
                        renderInput = {(params) =>
                            <TextField {...params}
                                style = {{
                                    width: '-webkit-fill-available'
                                }}
                                InputProps = {{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <IconButton
                                            onClick = {() => handleDateChange('startDate', null)}
                                            size = 'small'
                                        >
                                            <Clear title = 'clear' fontSize = '18px'/>
                                        </IconButton>
                                    )
                                }}
                            />
                        }
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter = {DateAdapter}>
                    <MobileDatePicker
                        clearable
                        label = 'Due Date'
                        inputFormat = 'MM/dd/yyyy'
                        value = {GetDateInOrder(formValues.dueDate)}
                        onChange = {(value) => handleDateChange('dueDate', value)}
                        renderInput = {(params) =>
                            <TextField {...params}
                                InputProps = {{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <IconButton
                                            onClick = {() => handleDateChange('dueDate', null)}
                                            size = 'small'
                                        >
                                            <Clear title = 'clear' fontSize = '18px'/>
                                        </IconButton>
                                    )
                                }}
                            />
                        }
                    />
                </LocalizationProvider>
                {!context.isCreate &&
                    <Button
                        variant = 'outlined'
                        startIcon = {<Delete />}
                        fullWidth
                        onClick = {handlePopup}
                        style = {{
                            marginTop: '24px',
                            color: '#d45555',
                            borderColor: '#d45555',
                            fontWeight: 'bold'
                        }}
                    >
                        DELETE THIS ROADMAP ENTRY
                    </Button>
                }
                {open &&
                    <ConfirmationPopup
                        open = {open}
                        onConfirm = {handlePopupConfirm}
                        onCancel = {handlePopupCancel}
                        detail = {`You are about to delete '${formValues.title}'`}
                    />
                }
            </Stack>
        </Popup>
    )
}

RoadmapEntryPopup.propTypes = {
    id: PropTypes.number,
    productId: PropTypes.number.isRequired,
}

RoadmapEntryPopup.defaultProps = {
    id: null
}

export default RoadmapEntryPopup