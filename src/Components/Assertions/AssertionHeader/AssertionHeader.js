import { Badge, Box, IconButton, makeStyles, TextField, Typography } from '@material-ui/core'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import { Chat, Delete, Edit, ExpandMore, Restore, Save } from '@material-ui/icons'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
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
    },
    summaryRoot: {
        minHeight: 48,
        height: 48,
        width: '100%',
        '&.Mui-expanded': {
            height: 48,
            minHeight: 48
        }
    }
}))

const expandIcon = (cat) => {
    return (
        <ExpandMore data-testid = {`AssertionHeader__icon-expand-${cat}`}/>
    )
}

function AssertionHeader(props) {
    const { id, category, detail, autoFocus, defaultEditable, editable, status, commentCount, ...actions } = props
    const { onClick, onSave, onChange, onDelete, onEditClick } = actions

    const classes = useStyles()
    const dispatch = useDispatch()

    const statuses = useAssertionStatuses()

    const canEdit = typeof onChange === 'function' && defaultEditable
    const canPerformChange = typeof onChange === 'function'
    const canPerformSave = typeof onSave === 'function'
    const canPerformDelete = typeof onDelete === 'function'

    const defaultTag = statuses.filter(t => t.name === status)[0]

    const [value, setValue] = useState(detail)
    const [changeable, setChangeable] = useState(canEdit)
    const [openConfirmation, setOpenConfirmation] = useState(false)

    const onValueChange = (event) => {
        const val = event.target.value

        setValue(val)
        canPerformChange && onChange(val)
    }

    const onEditClicked = (event) => {
        event.stopPropagation()
        typeof onEditClick === 'function' && onEditClick(!changeable)
        setChangeable(!changeable)
    }

    const onRestoreClicked = (event) => {
        event.stopPropagation()
        setValue(detail)
    }

    const onSaveClicked = (event) => {
        event.stopPropagation()
        onSave(event)
        setChangeable(false)
    }

    const onFocus = (event) => {
        event.stopPropagation()
        event.target.setSelectionRange(0, event.target.value.length)
    }

    const onCommentClicked = (event) => {
        event.stopPropagation()
        dispatch(requestSearchComments(`assertion.id:${id}`))

        dispatch(setAssertionComment(id))
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

    const onDeleteClicked = (event) => {
        event.stopPropagation()
        setOpenConfirmation(true)
    }

    const onTextClick = (event) => {
        event.stopPropagation()
        !changeable && onEditClicked(event)
        !changeable && onCommentClicked(event)
    }

    const handlePopup = () => setOpenConfirmation(prev => !prev)

    const handlePopupCancel = (event) => {
        event.stopPropagation()
        handlePopup()
    }

    const handlePopupConfirm = (event) => {
        event.stopPropagation()
        handlePopup()

        typeof onDelete === 'function' && onDelete(event)
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            onSave(value)
            setChangeable(prev => !prev)
        } else if (event.key === 'Escape') {
            onValueChange({ target: { value: detail } })
            setChangeable(prev => !prev)
            typeof onEditClick === 'function' && onEditClick(!changeable)
        }

    }

    return (
        <AccordionSummary
            expandIcon = {expandIcon(category)}
            classes = {{
                root: classes.summaryRoot
            }}
            IconButtonProps = {{
                style: {
                    padding: '8px'
                }
            }}
            onClick = {onClick}
        >
            <Typography className = {classes.heading} variant = 'h6' color = 'textSecondary'>
                {category}:
            </Typography>
            <Box display = 'flex' justifyContent = 'space-between' width = '100%'>
                <TextField
                    autoFocus = {autoFocus}
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
                    onKeyDown = {handleEnter}
                    onChange = {onValueChange}
                    onClick = {onTextClick}
                    onFocus = {onFocus}
                >
                    {detail}
                </TextField>
                <Box display = 'flex' flexDirection = 'row'>
                    {editable && changeable &&
                        <>
                            {canPerformSave &&
                                <IconButton
                                    color = 'secondary'
                                    title = 'save'
                                    size = 'small'
                                    onClick = {onSaveClicked}
                                ><Save /></IconButton>
                            }
                            <IconButton
                                color = 'secondary'
                                title = 'restore'
                                size = 'small'
                                onClick = {onRestoreClicked}
                            ><Restore /></IconButton>
                        </>
                    }
                    {editable &&
                        <IconButton
                            color = 'secondary'
                            title = 'edit'
                            size = 'small'
                            onClick = {onEditClicked}
                        ><Edit /></IconButton>
                    }
                    {editable && canPerformDelete &&
                        <IconButton
                            color = 'secondary'
                            title = 'delete'
                            size = 'small'
                            onClick = {onDeleteClicked}
                        ><Delete /></IconButton>
                    }
                    {id &&
                        <Badge
                            badgeContent = {commentCount}
                            overlap = 'circle'
                            color = 'primary'
                            style = {{ marginRight: '8px' }}
                            onClick = {onCommentClicked}
                        >
                            <IconButton
                                color = 'secondary'
                                title = 'update'
                                size = 'small'
                            >
                                <Chat />
                            </IconButton>
                        </Badge>
                    }
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
        </AccordionSummary>
    )
}

AssertionHeader.propTypes = {
    id: PropTypes.number,
    commentCount: PropTypes.number,
    category: PropTypes.string.isRequired,
    detail: PropTypes.string,
    status: PropTypes.string,
    autoFocus: PropTypes.bool,
    editable: PropTypes.bool,
    onChange: PropTypes.func,
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
    onClick: PropTypes.func,
    onEditClick: PropTypes.func,
    defaultEditable: PropTypes.bool,
    exitEditOnSave: PropTypes.bool
}

AssertionHeader.defaultProps = {
    id: undefined,
    commentCount: 0,
    detail: '',
    status: undefined,
    autoFocus: false,
    editable: false,
    onChange: undefined,
    onSave: undefined,
    onClick: undefined,
    onDelete: undefined,
    onEditClick: undefined,
    defaultEditable: false,
    exitEditOnSave: false
}

export default AssertionHeader