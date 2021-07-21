import { Badge, Box, IconButton, makeStyles, TextField, Typography } from '@material-ui/core'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import { Add, Chat, Delete, ExpandMore } from '@material-ui/icons'
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

const returnDisplay = (setDisplay) => setDisplay ? 'inherit' : 'none'

function AssertionHeader(props) {
    const {
        id, category, detail, defaultEditable, editable, status,
        commentCount, addChildAssertionLabel, expandable, quickSave,
        ...actions
    } = props
    const { onClick, onSave, onChange, onDelete, addChildAssertion } = actions

    const classes = useStyles()
    const dispatch = useDispatch()

    const statuses = useAssertionStatuses()

    const canEdit = typeof onChange === 'function' && defaultEditable
    const canPerformChange = typeof onChange === 'function'
    const canPerformDelete = typeof onDelete === 'function'

    const defaultTag = statuses.filter(t => t.name === status)[0]

    const [value, setValue] = useState(detail)
    const [changeable, setChangeable] = useState(canEdit)
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const [viewingComments, setViewingComments] = useState(false)

    const onValueChange = (event) => {
        const val = event.target.value
        setValue(val)
    }

    const onSaveClicked = (event) => {
        event.stopPropagation()
        canPerformChange && onChange(value)
        quickSave && onSave(value)
        setChangeable(false)
        setViewingComments(false)
    }

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            canPerformChange && onChange(value)
            quickSave && onSave(value)
            setChangeable(false)
        } else if (event.key === 'Escape') {
            onValueChange({ target: { value: detail } })
            setChangeable(false)
        }
    }

    const onFocus = (event) => {
        event.stopPropagation()
        event.target.setSelectionRange(0, event.target.value.length)
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

    const onTextClick = (event) => {
        event.stopPropagation()

        if (!changeable) {
            setViewingComments(true)
            setChangeable(true)
        }
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

        typeof onDelete === 'function' && onDelete(event)
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
        <AccordionSummary
            expandIcon = {expandable ? expandIcon(category) : <></>}
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
                <div style = {{ width: '100%' }}>
                    <TextField
                        autoFocus = {id === undefined}
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
                        onClick = {onTextClick}
                        onFocus = {onFocus}
                        onBlur = {onSaveClicked}
                        style = {{
                            height: '100%'
                        }}
                    >
                        {detail}
                    </TextField>
                    <Typography
                        variant = 'caption'
                        color = 'textSecondary'
                        style = {{
                            position: 'relative',
                            bottom: '13px',
                            zIndex: 1,
                            left: '8px',
                            display: returnDisplay(changeable)
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
                        ><Add /></IconButton>
                    }
                    {editable && canPerformDelete &&
                        <IconButton
                            color = 'secondary'
                            title = 'delete'
                            size = 'small'
                            onClick = {onDeleteClick}
                        ><Delete /></IconButton>
                    }
                    {id &&
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
    editable: PropTypes.bool,
    onChange: PropTypes.func,
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
    onClick: PropTypes.func,
    defaultEditable: PropTypes.bool,
    exitEditOnSave: PropTypes.bool,
    addChildAssertion: PropTypes.func,
    addChildAssertionLabel: PropTypes.string,
    expandable: PropTypes.bool,
    quickSave: PropTypes.bool
}

AssertionHeader.defaultProps = {
    id: undefined,
    commentCount: 0,
    detail: '',
    status: undefined,
    editable: false,
    onChange: undefined,
    onSave: undefined,
    onClick: undefined,
    onDelete: undefined,
    defaultEditable: false,
    exitEditOnSave: false,
    addChildAssertion: undefined,
    addChildAssertionLabel: undefined,
    expandable: true,
    quickSave: true
}

export default AssertionHeader