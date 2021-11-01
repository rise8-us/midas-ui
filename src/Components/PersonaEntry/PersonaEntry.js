import {
    CheckCircleOutlined, Person, PersonOutlined, RadioButtonUncheckedOutlined
} from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { DraggableRow } from 'Components/Draggable'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'
import React from 'react'

function PersonaEntry({ title, isSupported, hasEdit, onUpdate, onDelete, onToggleIsSupported }) {

    const defaultIconProps = {
        style: { height: '32px', marginLeft: '5px' },
        'data-testid': 'PersonaEntry__icon-person'
    }

    return (
        <DraggableRow
            title = {title}
            hasEdit = {hasEdit}
            onUpdate = {onUpdate}
            onDelete = {onDelete}
            startIcon = { isSupported
                ? <Person color = 'primary' {...defaultIconProps}/>
                : <PersonOutlined color = 'secondary' {...defaultIconProps}/>
            }
            additionalOptions = {
                <Tooltip title = {Tooltips.PERSONA_SUPPORTED}>
                    <IconButton
                        size = 'small'
                        data-testid = 'PersonaEntry__button-supported'
                        onClick = {onToggleIsSupported}
                    >
                        { isSupported
                            ? <CheckCircleOutlined color = 'primary' />
                            : <RadioButtonUncheckedOutlined color = 'secondary'/>
                        }
                    </IconButton>
                </Tooltip>
            }
        />
    )
}

PersonaEntry.propTypes = {
    title: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleIsSupported: PropTypes.func.isRequired,
    isSupported: PropTypes.bool.isRequired,
    hasEdit: PropTypes.bool,
}

PersonaEntry.defaultProps = {
    hasEdit: false
}

export default PersonaEntry