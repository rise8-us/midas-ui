import { Grid, IconButton, makeStyles, Tooltip } from '@material-ui/core'
import { Close, DragIndicator } from '@material-ui/icons'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => ({
    row: {
        '&:hover': {
            backgroundColor: '#FFFFFF06',
            borderRadius: 3
        }
    },
    title: {
        color: theme.palette.text.secondary
    }
}))

function DraggableRow({ title, hasEdit, onUpdate, onDelete, startIcon, additionalOptions }) {
    const classes = useStyles()
    const [hovered, setHovered] = useState(false)

    return (
        <Grid
            container
            alignItems = 'center'
            onMouseEnter = {() => setHovered(true)}
            onMouseLeave = {() => setHovered(false)}
            className = {hasEdit ? classes.row : ''}
            data-testid = 'DraggableRow__container'
        >
            <Grid item style = {{ minWidth: '24px', height: '32px', marginRight: '8px' }}>
                {hasEdit && hovered
                    ? <DragIndicator
                        color = 'secondary'
                        style = {{ height: '32px' }}
                        data-testid = 'DraggableRow__icon-drag'
                    />
                    : <>{startIcon}</>
                }
            </Grid>
            <Grid item style = {{ flexGrow: 1 }}>
                <AutoSaveTextField
                    fullWidth
                    initialValue = {title}
                    canEdit = {hasEdit}
                    onSave = {onUpdate}
                    className = {classes.title}
                />
            </Grid>
            <Grid item>
                {hasEdit && hovered &&
                    <>
                        {additionalOptions}
                        <Tooltip title = 'Delete'>
                            <IconButton
                                size = 'small'
                                data-testid = 'DraggableRow__button-delete'
                                onClick = {onDelete}
                            >
                                <Close color = 'secondary'/>
                            </IconButton>
                        </Tooltip>
                    </>
                }
            </Grid>
        </Grid>
    )
}

DraggableRow.propTypes = {
    title: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    startIcon: PropTypes.node,
    additionalOptions: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    hasEdit: PropTypes.bool,
}

DraggableRow.defaultProps = {
    startIcon: null,
    additionalOptions: null,
    hasEdit: false
}

export default DraggableRow