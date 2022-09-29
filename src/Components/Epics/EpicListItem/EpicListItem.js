import { Checkbox, CircularProgress, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { ClosedLabel } from '../ClosedLabel'

export default function EpicListItem({ epic, epicIds, handleOnSelect, handleOnDeselect }) {
    const epicAlreadyExists = epicIds.includes(epic.id)
    const [loading, setLoading] = useState(false)

    const onClick = (e) => {
        if (!epicAlreadyExists) {
            handleOnSelect(e, epic, setLoading)
        } else {
            handleOnDeselect(e, epic, setLoading)
        }
    }

    const checkboxState = epicAlreadyExists ? 'checked' : 'unchecked'
    const isClosed = epic.state === 'closed'

    return (
        <Stack
            direction = 'row'
            justifyContent = 'flex-start'
            alignItems = 'center'
        >
            {!loading ?
                <Checkbox
                    checked = {epicAlreadyExists}
                    onChange = {onClick}
                    data-testid = {'EpicListItem__checkbox-' + checkboxState}
                />
                :
                <CircularProgress
                    size = '18px'
                    sx = {{
                        marginLeft: '11px',
                        marginRight: '13px',
                        marginTop: '12px',
                        marginBottom: '12px'
                    }}
                />
            }

            <Typography
                color = {epicAlreadyExists ? 'text.secondary' : 'text.primary'}
                onClick = {onClick}
                sx = {{
                    '&:hover': {
                        cursor: 'pointer',
                    }
                }}
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
    epicIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    handleOnSelect: PropTypes.func.isRequired,
    handleOnDeselect: PropTypes.func.isRequired,
}
