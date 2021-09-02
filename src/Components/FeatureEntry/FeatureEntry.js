import { Grid, IconButton, makeStyles, Tooltip } from '@material-ui/core'
import { CheckCircleOutlined, Close, DragIndicator } from '@material-ui/icons'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const useStyles = makeStyles(() => ({
    feature: {
        '&:hover': {
            backgroundColor: '#FFFFFF04',
            borderRadius: 3
        }
    }
}))

function FeatureEntry({ title, hasEdit, onUpdate, onDelete }) {
    const classes = useStyles()
    const [hovered, setHovered] = useState(false)

    return (
        <Grid
            container
            alignItems = 'center'
            onMouseEnter = {() => setHovered(true)}
            onMouseLeave = {() => setHovered(false)}
            className = {hasEdit ? classes.feature : ''}
            data-testid = 'FeatureEntry__container'
        >
            <Grid item style = {{ minWidth: '24px', height: '32px', marginRight: '8px' }}>
                {hasEdit && hovered
                    ? <DragIndicator
                        color = 'secondary'
                        style = {{ height: '32px' }}
                        data-testid = 'FeatureEntry__icon-drag'
                    />
                    : <CheckCircleOutlined
                        color = 'primary'
                        style = {{ height: '32px' }}
                        data-testid = 'FeatureEntry__icon-checkmark'
                    />
                }
            </Grid>
            <Grid item style = {{ flexGrow: 1 }}>
                <AutoSaveTextField
                    fullWidth
                    initialValue = {title}
                    canEdit = {hasEdit}
                    onSave = {onUpdate}
                />
            </Grid>
            <Grid item>
                {hasEdit && hovered &&
                    <Tooltip title = 'Delete'>
                        <IconButton
                            size = 'small'
                            data-testid = 'FeatureEntry__button-delete'
                            onClick = {onDelete}
                        >
                            <Close color = 'secondary'/>
                        </IconButton>
                    </Tooltip>
                }
            </Grid>
        </Grid>
    )
}

FeatureEntry.propTypes = {
    title: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    hasEdit: PropTypes.bool
}

FeatureEntry.defaultProps = {
    hasEdit: false
}

export default FeatureEntry