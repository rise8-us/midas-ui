import { Chat, Delete, KeyboardReturn } from '@mui/icons-material'
import { alpha, Badge, Box, Grid, Grow, IconButton } from '@mui/material'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { ConfirmationPopup } from 'Components/Popups/ConfirmationPopup'
import useAssertionStatuses from 'Hooks/useAssertionStatuses'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAssertionComment } from 'Redux/AppSettings/reducer'
import { requestSearchComments } from 'Redux/Comments/actions'
import { styled } from 'Styles/materialThemes'

const GridRow = styled(Grid)(({ theme }) => ({
    paddingLeft: 6,
    borderWidth: 1,
    borderRadius: theme.spacing(1),
    borderStyle: 'solid',
    borderColor: 'transparent',

    '&:hover': {
        borderColor: alpha(theme.palette.text.primary, 0.6)
    }
}))

const AutoSaveTextFieldTitle = styled(AutoSaveTextField)(({ theme }) => ({
    ...theme.typography.h6,
    margin: 'auto 0',
    marginRight: 'auto',
    paddingLeft: theme.spacing(1),
    color: alpha(theme.palette.text.primary, 0.6)
}))

const DivIndicator = styled('div')(({ theme }) => ({
    height: 20,
    width: 20,
    borderRadius: '50%',
    fontSize: '0.875rem',
    fontWeight: 900,
    textAlign: 'center',
    color: theme.palette.background.paper,
    lineHeight: '1.43'
}))

function AssertionEntry(props) {
    const {
        id,
        category,
        title,
        status,
        commentCount,
        addChildAssertionLabel,
        onSave,
        onDelete,
        addChildAssertion,
        hasEdit
    } = props

    const dispatch = useDispatch()

    const statuses = useAssertionStatuses()

    const defaultTag = statuses.filter((t) => t.name === status)[0] ?? {
        label: 'Not Started',
        color: '#c3c3c3'
    }

    const [openConfirmation, setOpenConfirmation] = useState(false)
    const [showActions, setShowActions] = useState(false)

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
        dispatch(requestSearchComments(`assertion.id:${id}`))
        dispatch(setAssertionComment({ assertionId: id, deletedAssertionId: null }))
    }

    const handlePopup = () => setOpenConfirmation((prev) => !prev)

    const handlePopupCancel = (event) => {
        event.stopPropagation()
        handlePopup()
    }

    const handlePopupConfirm = (event) => {
        event.stopPropagation()
        handlePopup()
        onDelete(event)
    }

    return (
        <>
            <GridRow
                container
                wrap = 'nowrap'
                alignItems = 'center'
                onMouseEnter = {() => setShowActions(true)}
                onMouseLeave = {() => setShowActions(false)}
            >
                <Grid item>
                    <DivIndicator
                        style = {{
                            backgroundColor: defaultTag?.color ?? '#797979'
                        }}
                    >
                        {category}
                    </DivIndicator>
                </Grid>
                <Grid item onClick = {(e) => e.stopPropagation()} style = {{ flexGrow: 1 }}>
                    <AutoSaveTextFieldTitle
                        canEdit = {hasEdit}
                        initialValue = {title}
                        onSave = {onSave}
                        title = {title}
                        fullWidth
                        inputProps = {{
                            style: {
                                textOverflow: 'ellipsis'
                            }
                        }}
                    />
                </Grid>
                <Grid item onClick = {(e) => e.stopPropagation()}>
                    <Grow in = {showActions} unmountOnExit>
                        <Box display = 'flex' flexDirection = 'row' id = 'test'>
                            {hasEdit && addChildAssertion && (
                                <IconButton
                                    color = 'secondary'
                                    title = {addChildAssertionLabel}
                                    size = 'small'
                                    onClick = {onAddChildAssertionClick}
                                >
                                    <KeyboardReturn />
                                </IconButton>
                            )}
                            {hasEdit && (
                                <IconButton
                                    color = 'secondary'
                                    title = 'delete'
                                    size = 'small'
                                    onClick = {onDeleteClick}
                                >
                                    <Delete />
                                </IconButton>
                            )}
                            <Badge
                                badgeContent = {commentCount}
                                overlap = 'circular'
                                color = 'primary'
                                onClick = {onCommentsClick}
                            >
                                <IconButton color = 'secondary' title = 'comment' size = 'small'>
                                    <Chat />
                                </IconButton>
                            </Badge>
                        </Box>
                    </Grow>
                </Grid>
            </GridRow>
            {openConfirmation && (
                <ConfirmationPopup
                    open = {openConfirmation}
                    onConfirm = {handlePopupConfirm}
                    onCancel = {handlePopupCancel}
                    detail = {`You are about to delete '${category}: ${title}'`}
                />
            )}
        </>
    )
}

AssertionEntry.propTypes = {
    id: PropTypes.number.isRequired,
    commentCount: PropTypes.number,
    category: PropTypes.string.isRequired,
    title: PropTypes.string,
    status: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    addChildAssertion: PropTypes.func,
    addChildAssertionLabel: PropTypes.string,
    hasEdit: PropTypes.bool.isRequired
}

AssertionEntry.defaultProps = {
    commentCount: 0,
    title: '',
    status: undefined,
    addChildAssertion: undefined,
    addChildAssertionLabel: undefined
}

export default AssertionEntry
