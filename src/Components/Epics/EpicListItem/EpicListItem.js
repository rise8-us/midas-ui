import { Checkbox, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { ClosedLabel } from '../ClosedLabel'

export default function EpicListItem({ epic, isEpicSelected, handleOnSelect, handleOnDeselect }) {
    const onClick = () => {
        if (!isEpicSelected) {
            handleOnSelect(epic.id)
        } else {
            handleOnDeselect(epic.id)
        }
    }

    const checkboxState = isEpicSelected ? 'checked' : 'unchecked'
    const isClosed = epic.state === 'closed'

    return (
        <Stack
            direction = 'row'
            justifyContent = 'flex-start'
            alignItems = 'center'
        >
            <Checkbox
                checked = {isEpicSelected}
                onChange = {onClick}
                data-testid = {'EpicListItem__checkbox-' + checkboxState}
            />

            <Typography
                color = {isEpicSelected ? 'text.secondary' : 'text.primary'}
                onClick = {onClick}
                sx = {{
                    '&:hover': {
                        cursor: 'pointer',
                    }
                }}
                data-testid = {'EpicListItem__label'}
            >
                {epic.title}
            </Typography>

            {isClosed &&
                <div style = {{ marginLeft: 'auto', paddingRight: '10px' }}>
                    <ClosedLabel/>
                </div>
            }
        </Stack>
    )
}

EpicListItem.propTypes = {
    epic: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        state: PropTypes.oneOf(['opened', 'closed']),
    }).isRequired,
    isEpicSelected: PropTypes.bool.isRequired,
    handleOnSelect: PropTypes.func.isRequired,
    handleOnDeselect: PropTypes.func.isRequired,
}
