import { Close, DragIndicator } from '@mui/icons-material'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { alpha } from '@mui/system'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { styled } from 'Styles/materialThemes'

const StyledAutoSaveTextField = styled(AutoSaveTextField)(({ theme }) => ({
    color: theme.palette.text.secondary,
    height: '34px',
    marginLeft: theme.spacing(1)
}))

const StyledEditableGrid = styled(Grid)(({ theme, selected })=> ({
    '&:hover': {
        backgroundColor: selected  ? alpha(theme.palette.text.primary, .04) : 'inherit',
        borderRadius: selected  ? 3 : 'inherit'
    }
}))

function DraggableRow({
    additionalOptions,
    hasEdit,
    onDelete,
    onUpdate,
    placement,
    startIcon,
    title,
    tooltipText,
}) {

    const [hovered, setHovered] = useState(false)

    return (
        <StyledEditableGrid
            container
            alignItems = 'center'
            onMouseEnter = {() => setHovered(true)}
            onMouseLeave = {() => setHovered(false)}
            selected = {hasEdit}
            data-testid = 'DraggableRow__container'
        >
            <Grid item height = '34px' display = 'flex' alignItems = 'center'>
                {hasEdit && hovered
                    ? <DragIndicator color = 'secondary' data-testid = 'DraggableRow__icon-drag'/>
                    : <>{startIcon}</>
                }
            </Grid>
            <Tooltip
                arrow
                title = {tooltipText}
                placement = {placement}
                PopperProps = {{
                    style: {
                        display: !hasEdit && tooltipText.length > 0 ? 'initial' : 'none'
                    }
                }}
            >
                <Grid item style = {{ flexGrow: 1 }}>
                    <StyledAutoSaveTextField
                        fullWidth
                        initialValue = {title}
                        canEdit = {hasEdit}
                        onSave = {onUpdate}
                    />
                </Grid>
            </Tooltip>
            <Grid item>
                {hasEdit && hovered && (
                    <>
                        {additionalOptions}
                        <Tooltip title = {Tooltips.DELETE}>
                            <IconButton
                                size = 'small'
                                data-testid = 'DraggableRow__button-delete'
                                onClick = {onDelete}
                            >
                                <Close color = 'secondary' />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </Grid>
        </StyledEditableGrid>
    )
}

DraggableRow.propTypes = {
    additionalOptions: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    hasEdit: PropTypes.bool,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    placement: PropTypes.string,
    startIcon: PropTypes.node,
    title: PropTypes.string.isRequired,
    tooltipText: PropTypes.string,
}

DraggableRow.defaultProps = {
    additionalOptions: null,
    hasEdit: false,
    placement: 'bottom',
    startIcon: null,
    tooltipText: '',
}

export default DraggableRow