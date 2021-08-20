import { Box, Button, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { Popup } from 'Components/Popup'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

function RoadmapEntryPopup({ id, index, productId }) {
    const dispatch = useDispatch()

    const roadmapEntry = useSelector(state => selectRoadmapById(state, id))
    const context = initDetails(roadmapEntry.id === undefined)

    const errors = useSelector(state => selectRequestErrors(state, context.constant))
    const titleErrors = useMemo(() => errors.filter(error => error.includes('title')), [errors])
    const targetDateErrors = useMemo(() => errors.filter(error => error.includes('targeted')), [errors])

    const [open, setOpen] = useState(false)

    const [formValues, formDispatch] = React.useReducer(useFormReducer, {
        title: roadmapEntry.title,
        description: roadmapEntry.description,
        targetDate: roadmapEntry.targetDate?.substring(0, 7) ?? '',
        status: roadmapEntry.status
    })

    const handleChange = (name, value) => {
        formDispatch({
            type: 'onChange',
            payload: { name, value }
        })
    }

    const onClose = () => dispatch(closePopup(context.constant))

    const onSubmit = () => {
        dispatch(context.request({
            ...roadmapEntry,
            title: formValues.title,
            description: formValues.description,
            status: formValues.status,
            targetDate: formValues.targetDate,
            index,
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

    return (
        <Popup
            title = {context.title}
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Title'
                    data-testid = 'RoadmapEntryPopup__input-title'
                    value = {formValues.title}
                    onChange = {(e) => handleChange('title', e.target.value)}
                    margin = 'dense'
                    error = {titleErrors.length > 0}
                    helperText = {<FormatErrors errors = {titleErrors}/>}
                    required
                />
                <TextField
                    label = 'Description'
                    data-testid = 'RoadmapEntryPopup__input-description'
                    value = {formValues.description}
                    onChange = {(e) => handleChange('description', e.target.value)}
                    margin = 'dense'
                    multiline
                />
                <InputLabel id = 'status' style = {{ marginTop: '8px' }} shrink required>Status</InputLabel>
                <Select
                    labelId = 'status'
                    value = {formValues.status}
                    data-testid = 'RoadmapEntryPopup__select-status'
                    onChange = {(e) => handleChange('status', e.target.value)}
                >
                    <MenuItem value = {'FUTURE'}>FUTURE</MenuItem>
                    <MenuItem value = {'IN_PROGRESS'}>IN PROGRESS</MenuItem>
                    <MenuItem value = {'COMPLETE'}>COMPLETE</MenuItem>
                </Select>
                {/* TODO: Replace with material-ui 5 when available */}
                <TextField
                    label = 'Target Date'
                    type = 'month'
                    InputLabelProps = {{ shrink: true }}
                    data-testid = 'RoadmapEntryPopup__input-target-date'
                    value = {formValues.targetDate}
                    onChange = {(e) => handleChange('targetDate', e.target.value)}
                    error = {targetDateErrors.length > 0}
                    helperText = {<FormatErrors errors = {targetDateErrors}/>}
                    margin = 'dense'
                    required
                />
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
            </Box>
        </Popup>
    )
}

RoadmapEntryPopup.propTypes = {
    id: PropTypes.number,
    index: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
}

RoadmapEntryPopup.defaultProps = {
    id: null
}

export default RoadmapEntryPopup