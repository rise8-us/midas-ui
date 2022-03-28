import { DeleteOutlineOutlined, DragIndicator } from '@mui/icons-material'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { alpha } from '@mui/system'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { styled } from 'Styles/materialThemes'

const StyledAutoSaveTextField = styled(AutoSaveTextField)(({ theme }) => ({
    color: theme.palette.text.secondary,
    minHeight: '34px',
    marginLeft: theme.spacing(1)
}))

const StyledEditableGrid = styled(Grid)(({ theme, selected })=> ({
    '&:hover': {
        backgroundColor: selected ? alpha(theme.palette.text.primary, .04) : 'inherit',
        borderRadius: selected ? 3 : 'inherit'
    }
}))

function DraggableRow({
    additionalOptions,
    hasEdit,
    multiLine,
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
            flexWrap = 'nowrap'
            alignItems = 'center'
            onMouseEnter = {() => setHovered(true)}
            onMouseLeave = {() => setHovered(false)}
            selected = {hasEdit}
            data-testid = 'DraggableRow__container'
        >
            <Grid item height = '34px' display = 'flex' alignItems = 'center'>
                {hasEdit && hovered
                    ? <DragIndicator
                        style = {{ cursor: 'grab' }}
                        color = 'secondary'
                        data-testid = 'DraggableRow__icon-drag'
                    />
                    : <>{startIcon}</>
                }
            </Grid>
            <Tooltip
                arrow
                title = {tooltipText}
                placement = {placement}
                PopperProps = {{
                    'data-testid': tooltipText,
                    style: {
                        display: !hasEdit && tooltipText.length > 0 ? 'initial' : 'none'
                    }
                }}
            >
                <Grid item style = {{ flexGrow: 1 }} paddingRight = {1}>
                    <StyledAutoSaveTextField
                        fullWidth
                        initialValue = {title}
                        canEdit = {hasEdit}
                        onSave = {onUpdate}
                        multiline = {multiLine}
                        inputProps = {{
                            'data-testid': title,
                            style: {
                                textOverflow: 'ellipsis'
                            }
                        }}
                        InputProps = {{
                            endAdornment: hasEdit && hovered && (
                                <>
                                    {additionalOptions}
                                    <IconButton
                                        size = 'small'
                                        style = {{ cursor: 'pointer' }}
                                        data-testid = 'DraggableRow__button-delete'
                                        onClick = {onDelete}
                                    >
                                        <DeleteOutlineOutlined
                                            style = {{ cursor: 'pointer' }}
                                            fontSize = 'small'
                                            color = 'secondary'
                                        />
                                    </IconButton>
                                </>
                            )
                        }}
                    />
                </Grid>
            </Tooltip>
        </StyledEditableGrid>
    )
}

DraggableRow.propTypes = {
    additionalOptions: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    hasEdit: PropTypes.bool,
    multiLine: PropTypes.bool,
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
    multiLine: false,
    placement: 'bottom',
    startIcon: null,
    tooltipText: '',
}

export default DraggableRow