import { Badge, Box, IconButton, makeStyles, TextField, Typography } from '@material-ui/core'
import { Chat, Delete, KeyboardReturn } from '@material-ui/icons'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useAssertionStatuses from '../../../Hooks/useAssertionStatuses'
import { setAssertionComment } from '../../../Redux/AppSettings/reducer'
import { requestUpdateAssertion } from '../../../Redux/Assertions/actions'
import { requestCreateComment, requestSearchComments } from '../../../Redux/Comments/actions'
import { ConfirmationPopup } from '../../Popups/ConfirmationPopup'
import { AssertionStatusDropdown } from '../AssertionStatusDropdown'

const useStyles = makeStyles((theme) => ({
    heading: {
        margin: 'auto 0',
        marginLeft: -4
    },
    detail: {
        ...theme.typography.h6,
        margin: 'auto 0',
        paddingLeft: 6,
        '&:hover': {
            cursor: 'pointer'
        }
    },
    creatableDetail: {
        ...theme.typography.h6,
        margin: 'auto 0',
        marginRight: 'auto',
        paddingLeft: 6
    }
}))

function AssertionHeader(props) {
    const {
        id, category, title, status, commentCount, addChildAssertionLabel,
        onSave, onDelete, addChildAssertion
    } = props

    const classes = useStyles()
    const dispatch = useDispatch()

    const statuses = useAssertionStatuses()

    const defaultTag = statuses.filter(t => t.name === status)[0]

    const [value, setValue] = useState(title)
    const [changeable, setChangeable] = useState(false)
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const [viewingComments, setViewingComments] = useState(false)

    const onValueChange = (event) => {
        const val = event.target.value
        setValue(val)
    }

    const saveChanges = () => {
        onSave(value)
        setChangeable(false)
    }

    const onTitleBlur = (event) => {
        event.stopPropagation()
        saveChanges()
    }

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            saveChanges()
        } else if (event.key === 'Escape') {
            onValueChange({ target: { value: title } })
            setChangeable(false)
        }
    }

    const onTitleFocus = (event) => {
        event.stopPropagation()
        event.target.setSelectionRange(0, event.target.value.length)
    }

    const onTitleClick = (event) => {
        event.stopPropagation()
        setViewingComments(true)
        setChangeable(true)
    }

    const onStatusChange = (val) => {
        dispatch(requestCreateComment({
            assertionId: id,
            text: `###${val}`
        })).then(unwrapResult).then(() => {
            dispatch(setAssertionComment(id))
            dispatch(requestUpdateAssertion({
                id,
                text: value,
                status: val,
                children: []
            }))
        })
    }

    const onStatusClick = (event) => {
        event.stopPropagation()
    }

    const onDeleteClick = (event) => {
        event.stopPropagation()
        setOpenConfirmation(true)
    }

    const onAddChildAssertionClick = (event) => {
        event.stopPropagation()
        addChildAssertion()
    }

    const onCommentsClick = (event) => {
        event.stopPropagation()
        setViewingComments(!viewingComments)
    }

    const handlePopup = () => setOpenConfirmation(prev => !prev)

    const handlePopupCancel = (event) => {
        event.stopPropagation()
        handlePopup()
    }

    const handlePopupConfirm = (event) => {
        event.stopPropagation()
        handlePopup()
        onDelete(event)
    }

    useEffect(() => {
        if (viewingComments) {
            dispatch(requestSearchComments(`assertion.id:${id}`))
            dispatch(setAssertionComment(id))
        } else {
            dispatch(setAssertionComment(null))
        }
    }, [viewingComments])

    return (
        <>
            <Typography className = {classes.heading} variant = 'h6' color = 'textSecondary'>
                {category}:
            </Typography>
            <Box display = 'flex' width = '100%'>
                <div style = {{ width: '100%' }}>
                    <TextField
                        fullWidth
                        title = {value}
                        InputProps = {{
                            disableUnderline: !changeable,
                            readOnly: !changeable,
                            className: classes.creatableDetail,
                        }}
                        inputProps = {{
                            style: {
                                textOverflow: 'ellipsis'
                            }
                        }}
                        value = {value}
                        onKeyDown = {onKeyDown}
                        onChange = {onValueChange}
                        onFocus = {onTitleFocus}
                        onBlur = {onTitleBlur}
                        onClick = {onTitleClick}
                        style = {{
                            height: '100%'
                        }}
                    >
                        {title}
                    </TextField>
                    <Typography
                        variant = 'caption'
                        color = 'textSecondary'
                        style = {{
                            position: 'relative',
                            bottom: '13px',
                            zIndex: 1,
                            left: '8px',
                            display: (changeable) ? 'inherit' : 'none'
                        }}
                    >
                        enter to save • escape to revert
                    </Typography>
                </div>
                <Box display = 'flex' flexDirection = 'row'>
                    { addChildAssertion &&
                        <IconButton
                            color = 'secondary'
                            title = {addChildAssertionLabel}
                            size = 'small'
                            onClick = {onAddChildAssertionClick}
                        ><KeyboardReturn /></IconButton>
                    }
                    <IconButton
                        color = 'secondary'
                        title = 'delete'
                        size = 'small'
                        onClick = {onDeleteClick}
                    ><Delete /></IconButton>
                    <Badge
                        badgeContent = {commentCount}
                        overlap = 'circular'
                        color = 'primary'
                        style = {{ marginRight: '8px' }}
                        onClick = {onCommentsClick}
                    >
                        <IconButton
                            color = 'secondary'
                            title = 'comment'
                            size = 'small'
                        >
                            <Chat />
                        </IconButton>
                    </Badge>
                    {defaultTag &&
                        <AssertionStatusDropdown
                            onClick = {onStatusClick}
                            option = {defaultTag}
                            onChange = {onStatusChange}
                        />
                    }
                </Box>
            </Box>
            {openConfirmation &&
                <ConfirmationPopup
                    open = {openConfirmation}
                    onConfirm = {handlePopupConfirm}
                    onCancel = {handlePopupCancel}
                    detail = {`You are about to delete '${category}: ${value}'`}
                />
            }
        </>
    )
}

AssertionHeader.propTypes = {
    id: PropTypes.number.isRequired,
    commentCount: PropTypes.number,
    category: PropTypes.string.isRequired,
    title: PropTypes.string,
    status: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    addChildAssertion: PropTypes.func,
    addChildAssertionLabel: PropTypes.string,
}

AssertionHeader.defaultProps = {
    commentCount: 0,
    title: '',
    status: undefined,
    addChildAssertion: undefined,
    addChildAssertionLabel: undefined,
}

export default AssertionHeader