import { DraggableRow } from 'Components/Draggable'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectPortfolioPageSettings } from 'Redux/AppSettings/selectors'
import { styled } from 'Styles/materialThemes'

const StyledDiv = styled('div')(({ theme, selected, cursor }) => ({
    '& .MuiInput-root': {
        color: selected ? theme.palette.text.primary : theme.palette.grey[500]
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

export default function DeliverableEntry({ hasEdit, id, title, onUpdate, onDelete, onClick }) {
    const pageSettings = useSelector(state => selectPortfolioPageSettings(state, null))

    return (
        <StyledDiv
            onClick = {onClick}
            selected = {pageSettings.selectedDeliverableId === id}
            data-testid = 'DeliverableEntry__wrap'
            cursor = {hasEdit ? 'text' : 'pointer'}
        >
            <DraggableRow
                title = {title}
                hasEdit = {hasEdit}
                multiLine
                onUpdate = {onUpdate}
                onDelete = {onDelete}
                startIcon = {
                    <div
                        data-testid = 'DeliverableEntry__empty-div'
                        style = {{ height: '1px', width: '24px' }}
                    />
                }
            />
        </StyledDiv>
    )
}

DeliverableEntry.propTypes = {
    hasEdit: PropTypes.bool,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onClick: PropTypes.func
}

DeliverableEntry.defaultProps = {
    hasEdit: false,
    onClick: e => e
}