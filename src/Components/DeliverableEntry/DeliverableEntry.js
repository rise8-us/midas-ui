import { DraggableRow } from 'Components/Draggable'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCapabilityPage } from 'Redux/AppSettings/reducer'
import { selectCapabilityPageSettings } from 'Redux/AppSettings/selectors'
import { selectCapabilitiesPagePermission } from 'Redux/PageAccess/selectors'
import { styled } from 'Styles/materialThemes'

const StyledDiv = styled('div')(({ theme, selected, cursor }) => ({
    '& .MuiInput-root': {
        color: selected ? theme.palette.text.primary : theme.palette.text.secondary
    },
    '&:hover': {
        '& *': {
            color: theme.palette.text.primary,
            cursor: cursor
        },
        backgroundColor: theme.palette.grey[800],
        borderRadius: 8
    },
    cursor: 'pointer'
}))

function DeliverableEntry({ id, title, onUpdate, onDelete }) {
    const dispatch = useDispatch()

    const hasEdit = useSelector(state => selectCapabilitiesPagePermission(state, 'edit'))
    const capabilityPageSettings = useSelector(selectCapabilityPageSettings)

    const onClick = () => dispatch(setCapabilityPage({ selectedDeliverableId: id }))

    return (
        <StyledDiv
            onClick = {onClick}
            selected = {capabilityPageSettings.selectedDeliverableId === id}
            data-testid = 'DeliverableEntry__wrap'
            cursor = {hasEdit ? 'text' : 'pointer'}
        >
            <DraggableRow
                title = {title}
                hasEdit = {hasEdit}
                multiLine = {true}
                onUpdate = {onUpdate}
                onDelete = {onDelete}
                startIcon = {
                    <div data-testid = 'DeliverableEntry__empty-div' style = {{ height: 1, width: 24 }}/>
                }
            />
        </StyledDiv>
    )
}

DeliverableEntry.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default DeliverableEntry