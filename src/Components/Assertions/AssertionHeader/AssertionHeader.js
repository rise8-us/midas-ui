import { Box, IconButton, makeStyles, TextField, Typography } from '@material-ui/core'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import { Edit, ExpandMore, Restore, Save } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Tag } from '../../Tag'

const statuses = [
    {
        name: 'NOT_STARTED',
        label: 'Not Started',
        color: '#969696'
    },
    {
        name: 'STARTED',
        label: 'Started',
        color: '#00FFd4'
    },
    {
        name: 'ON_TRACK',
        label: 'On Track',
        color: '#8bc34a'
    },
    {
        name: 'NEEDS_ATTENTION',
        label: 'Needs Attention',
        color: '#ff9800'
    },
    {
        name: 'AT_RISK',
        label: 'At Risk',
        color: '#e91e63'
    },
    {
        name: 'COMPLETED',
        label: 'Completed',
        color: '#0fcf50'
    }
]

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
    const { category, detail, autoFocus, defaultEditable, editable, status, ...actions } = props
    const { onClick, onSave, onChange, onEditClick } = actions

    const classes = useStyles()

    const canEdit = typeof onChange === 'function' && defaultEditable
    const canPerformChange = typeof onChange === 'function'
    const canPerformSave = typeof onSave === 'function'

    const defaultTag =  statuses.filter(t => t.name === status)

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
                                    onClick = {onSaveClicked}
                                ><Save /></IconButton>
                            }
                            <IconButton
                                color = 'secondary'
                                title = 'restore'
                                onClick = {onRestoreClicked}
                            ><Restore /></IconButton>
                        </>
                    }
                    {editable &&
                        <IconButton
                            color = 'secondary'
                            title = 'edit'
                            onClick = {onEditClicked}
                        ><Edit /></IconButton>
                    }
                    {status &&
                        <div style = {{ margin: 'auto' }}>
                            <Tag
                                label = {`status::${defaultTag[0].label}`}
                                color = {defaultTag[0].color}
                            />
                        </div>

                    }
                </Box>
            </Box>
        </AccordionSummary>
    )
}

AssertionHeader.propTypes = {
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