import { Close, DragIndicator } from '@mui/icons-material'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { alpha } from '@mui/system'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { styled } from 'Styles/materialThemes'

const AutoSaveTextFieldTitle = styled(AutoSaveTextField)(({ theme }) => ({
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
    title,
    hasEdit,
    onUpdate,
    onDelete,
    startIcon,
    additionalOptions,
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
            <Grid item maxWidth = '28px' minWidth = '28' height = '34px'>
                {hasEdit && hovered ? (
                    <DragIndicator
                        color = 'secondary'
                        style = {{ height: '90%' }}
                        data-testid = 'DraggableRow__icon-drag'
                    />
                ) : (
                    <>{startIcon}</>
                )}
            </Grid>
            <Grid item style = {{ flexGrow: 1 }}>
                <AutoSaveTextFieldTitle
                    fullWidth
                    initialValue = {title}
                    canEdit = {hasEdit}
                    onSave = {onUpdate}
                />
            </Grid>
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