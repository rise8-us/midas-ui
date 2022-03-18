import {
    CheckCircleOutlined, InfoOutlined, Person, PersonOutlined, RadioButtonUncheckedOutlined
} from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { DraggableRow } from 'Components/Draggable'
import Tooltips from 'Constants/Tooltips'
import PropTypes from 'prop-types'

export default function PersonaEntry({
    title,
    description,
    isSupported,
    hasEdit,
    onUpdate,
    onDelete,
    onInfoClick,
    onToggleIsSupported
}) {

    const defaultIconProps = {
        'data-testid': 'PersonaEntry__icon-person'
    }

    return (
        <DraggableRow
            title = {title}
            tooltipText = {description}
            placement = 'left'
            hasEdit = {hasEdit}
            onUpdate = {onUpdate}
            onDelete = {onDelete}
            startIcon = { isSupported
                ? <Person color = 'primary' {...defaultIconProps}/>
                : <PersonOutlined color = 'secondary' {...defaultIconProps}/>
            }
            additionalOptions = {
                <>
                    <IconButton
                        size = 'small'
                        data-testid = 'PersonaEntry__button-info'
                        onClick = {onInfoClick}
                    >
                        <InfoOutlined color = 'secondary'/>
                    </IconButton>
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
                </>
            }
        />
    )
}

PersonaEntry.propTypes = {
    description: PropTypes.string.isRequired,
    hasEdit: PropTypes.bool,
    isSupported: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onInfoClick: PropTypes.func.isRequired,
    onToggleIsSupported: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
}

PersonaEntry.defaultProps = {
    hasEdit: false
}
