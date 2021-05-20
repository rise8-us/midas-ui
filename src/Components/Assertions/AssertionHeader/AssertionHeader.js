import { Badge, Box, IconButton, makeStyles, TextField, Typography } from '@material-ui/core'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import { Chat, Edit, ExpandMore, Restore, Save } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import useAssertionStatuses from '../../../Hooks/useAssertionStatuses'
import { setAssertionComment } from '../../../Redux/AppSettings/reducer'
import { requestSearchComments } from '../../../Redux/Comments/actions'
import { Tag } from '../../Tag'

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
    const { onClick, onSave, onChange, onEditClick } = actions

    const classes = useStyles()
    const dispatch = useDispatch()

    const statuses = useAssertionStatuses()

    const canEdit = typeof onChange === 'function' && defaultEditable
    const canPerformChange = typeof onChange === 'function'
    const canPerformSave = typeof onSave === 'function'

    const defaultTag = statuses.filter(t => t.name === status)[0]

    const [value, setValue] = useState(detail)
    const [changeable, setChangeable] = useState(canEdit)

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

    const onCommentClick = (event) => {
        event.stopPropagation()
        dispatch(requestSearchComments(`assertion.id:${id}`))

        dispatch(setAssertionComment(id))
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
            <Box display = 'flex' justifyContent = 'space-between' flexGrow = {1}>
                {changeable ?
                    <TextField
                        autoFocus = {autoFocus}
                        fullWidth
                        InputProps = {{
                            disableUnderline: !changeable,
                            readOnly: !changeable,
                            className: classes.creatableDetail,
                        }}
                        value = {value}
                        onChange = {onValueChange}
                        onClick = {event => event.stopPropagation()}
                        onFocus = {onFocus}
                    >
                        {detail}
                    </TextField>
                    :
                    <Typography variant = 'h6' className = {classes.detail}>
                        {value}
                    </Typography>
                }
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
                    {id &&
                        <Badge
                            badgeContent = {commentCount}
                            overlap = 'circle'
                            color = 'primary'
                            style = {{ marginRight: '8px' }}
                            onClick = {onCommentClick}
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
                        <div style = {{ margin: 'auto' }}>
                            <Tag
                                label = {`status::${defaultTag?.label}`}
                                color = {defaultTag?.color}
                            />
                        </div>

                    }
                </Box>
            </Box>
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
    onEditClick: undefined,
    defaultEditable: false,
    exitEditOnSave: false
}

export default AssertionHeader