import { Grid, makeStyles, Paper } from '@material-ui/core'
import { EventNoteOutlined } from '@material-ui/icons'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestCreateCapability, requestUpdateCapability } from 'Redux/Capabilities/actions'
import CapabilityConstants from 'Redux/Capabilities/constants'
import { selectCapabilityById } from 'Redux/Capabilities/selectors'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 8,
        backgroundColor: 'inherit',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: theme.palette.secondary.main,
        '&:hover': {
            borderColor: theme.palette.text.primary
        }
    },
    description: {
        lineHeight: '21px',
        letterSpacing: '0.25px',
        fontSize: '11px',
        color: theme.palette.secondary.main
    },
    iconUnsaved: {
        color: theme.palette.text.primary
    },
    iconSaved: {
        color: theme.palette.primary.main
    }
}))

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Capability' : 'Update Capability',
        constant: create ? CapabilityConstants.CREATE_CAPABILITY : CapabilityConstants.UPDATE_CAPABILITY,
        request: (data) => create ? requestCreateCapability(data) : requestUpdateCapability(data)
    }
}

function Capability({ id, hasEdit }) {
    const dispatch = useDispatch()
    const classes = useStyles()

    const capability = useSelector(state => selectCapabilityById(state, id))
    const context = initDetails(capability.id === undefined)

    const updateCapability = (key, value) => {
        if (key !== 'description' && value.trim().length === 0)
            return

        dispatch(context.request({
            ...capability,
            [key]: value,
            referenceId: 0
        }))
    }

    return (
        <Paper variant = 'outlined' className = {classes.paper}>
            <Grid container spacing = {1}>
                <Grid item className = {context.isCreate ? classes.iconUnsaved : classes.iconSaved}>
                    <EventNoteOutlined fontSize = 'small'/>
                </Grid>
                <Grid container item direction = 'column' xs = {10} s = {10}>
                    <Grid item style = {{ paddingTop: 1 }}>
                        <AutoSaveTextField
                            canEdit = {hasEdit}
                            initialValue = {capability.title}
                            onSave = {(value) => updateCapability('title', value)}
                            placeholder = 'NEW CAPABILITY NEEDS STATEMENT'
                            inputProps = {{
                                style: {
                                    paddingTop: 0,
                                    paddingBottom: 0
                                }
                            }}
                            fullWidth
                            clearAfterSave
                        />
                    </Grid>
                    {!context.isCreate &&
                        <Grid item>
                            <AutoSaveTextField
                                canEdit = {hasEdit}
                                className = {classes.description}
                                initialValue = {capability.description}
                                onSave = {(value) => updateCapability('description', value)}
                                placeholder = 'Enter Operational Context'
                                InputProps = {{
                                    style: {
                                        paddingTop: 0
                                    }
                                }}
                                fullWidth
                                multiline
                            />
                        </Grid>
                    }
                </Grid>
            </Grid>
        </Paper>
    )
}

Capability.propTypes = {
    id: PropTypes.number,
    hasEdit: PropTypes.bool
}

Capability.defaultProps = {
    id: undefined,
    hasEdit: false
}

export default Capability