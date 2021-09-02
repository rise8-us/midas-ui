import { IconButton, Tooltip } from '@material-ui/core'
import {
    CheckCircleOutlined, PersonOutlined, RadioButtonUncheckedOutlined
} from '@material-ui/icons'
import { DraggableRow } from 'Components/Draggable'
import PropTypes from 'prop-types'
import React from 'react'

function PersonaEntry({ title, isSupported, hasEdit, onUpdate, onDelete, onToggleIsSupported }) {

    return (
        <DraggableRow
            title = {title}
            hasEdit = {hasEdit}
            onUpdate = {onUpdate}
            onDelete = {onDelete}
            startIcon = {
                <PersonOutlined
                    color = {isSupported ? 'primary' : 'secondary'}
                    style = {{ height: '32px' }}
                    data-testid = 'PersonaEntry__icon-person'
                />
            }
            additionalOptions = {
                <Tooltip title = 'Is Supported'>
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