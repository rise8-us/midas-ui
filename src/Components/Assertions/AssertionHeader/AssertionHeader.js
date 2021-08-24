import { alpha, Badge, Box, Grow, IconButton, makeStyles, Tooltip, Typography } from '@material-ui/core'
import { Chat, Delete, KeyboardReturn } from '@material-ui/icons'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { ConfirmationPopup } from 'Components/Popups/ConfirmationPopup'
import { Tag } from 'Components/Tag'
import useAssertionStatuses from 'Hooks/useAssertionStatuses'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setAssertionComment } from 'Redux/AppSettings/reducer'
import { requestSearchComments } from 'Redux/Comments/actions'

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
    statusIndicator: {
        borderLeft: '3px solid',
        borderRadius: '4px 0 0 4px',
        width: 8,
        marginRight: 3
    },
    row: {
        display: 'flex',
        width: '100%',
        '&:hover': {
            backgroundColor: alpha(theme.palette.background.default, .4),
            borderRadius: 6
        }
    }
}))
function AssertionHeader(props) {
    const {
        id, category, title, status, commentCount, addChildAssertionLabel,
        onSave, onDelete, addChildAssertion, hasAccess
    } = props

    const classes = useStyles()
    const dispatch = useDispatch()

    const ref = useRef()
    const { assertionId } = useParams()
    const assertionIdInt = parseInt(assertionId)

    const statuses = useAssertionStatuses()

    const defaultTag = statuses.filter(t => t.name === status)[0] ?? { label: 'Not Started', color: '#c3c3c3' }

    const [openConfirmation, setOpenConfirmation] = useState(false)
    const [viewingComments, setViewingComments] = useState(false)
    const [showActions, setShowActions] = useState(false)

    const saveChanges = (newValue) => {
        onSave(newValue)
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

    useEffect(() => {
        if (assertionIdInt === id) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
            })
        }
    }, [assertionId])

    return (
        <div
            onMouseEnter = {() => setShowActions(true)}
            onMouseLeave = {() => setShowActions(false)}
            className = {classes.row}
            style = {{
            }}
        >
            <div style = {{ display: 'flex', justifyContent: 'space-between' }}>
                <Tooltip arrow title = {<Tag {...defaultTag}/>} placement = 'left' interactive>
                    <div
                        className = {classes.statusIndicator}
                        style = {{
                            borderLeftColor: defaultTag?.color ?? '#797979'
                        }}
                    />
                </Tooltip>
                <Typography className = {classes.heading} variant = 'h6' color = 'textSecondary' ref = {ref}>
                    {category}:
                </Typography>
            </div>
            <Box display = 'flex' width = '100%'>
                <div style = {{ width: '100%' }} onClick = {(e) => e.stopPropagation()}>
                    <AutoSaveTextField
                        canEdit = {hasAccess}
                        initialValue = {title}
                        onSave = {saveChanges}
                        className = {classes.creatableDetail}
                        fullWidth
                    />
                </div>
                <Box display = 'flex' flexDirection = 'row'>
                    <Grow in = {showActions} unmountOnExit>
                        <Box display = 'flex' flexDirection = 'row'>
                            { hasAccess && addChildAssertion &&
                                <IconButton
                                    color = 'secondary'
                                    title = {addChildAssertionLabel}
                                    size = 'small'
                                    onClick = {onAddChildAssertionClick}
                                ><KeyboardReturn /></IconButton>
                            }
                            { hasAccess &&
                                <IconButton
                                    color = 'secondary'
                                    title = 'delete'
                                    size = 'small'
                                    onClick = {onDeleteClick}
                                ><Delete /></IconButton>
                            }
                        </Box>
                    </Grow>
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
                </Box>
            </Box>
            {openConfirmation &&
                <ConfirmationPopup
                    open = {openConfirmation}
                    onConfirm = {handlePopupConfirm}
                    onCancel = {handlePopupCancel}
                    detail = {`You are about to delete '${category}: ${title}'`}
                />
            }
        </div>
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
    hasAccess: PropTypes.bool.isRequired
}

AssertionHeader.defaultProps = {
    commentCount: 0,
    title: '',
    status: undefined,
    addChildAssertion: undefined,
    addChildAssertionLabel: undefined,
}

export default AssertionHeader