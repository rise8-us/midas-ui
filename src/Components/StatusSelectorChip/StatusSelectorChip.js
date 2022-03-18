import { Create } from '@mui/icons-material'
import { Chip } from '@mui/material'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectAssertionStatuses } from 'Redux/AppSettings/selectors'
import { openPopup } from 'Redux/Popups/actions'

function StatusSelectorChip({ statusName, onEditProps, hasEdit, ...chipProps }) {
    const dispatch = useDispatch()

    const allStatuses = useSelector(selectAssertionStatuses)

    const status = allStatuses[statusName] ?? { label: 'Not Started', color: '#c3c3c3' }

    const onClick = () => {
        dispatch(openPopup('UpdateStatusPopup', 'UpdateStatusPopup', onEditProps))
    }

    return (
        <Chip
            {...chipProps}
            label = {status.label}
            style = {{
                color: status.color,
                margin: '2px',
                borderColor: 'inherit',
                height: '20px'
            }}
            variant = 'outlined'
            size = 'small'
            onClick = {hasEdit ? onClick : undefined}
            avatar = {hasEdit ?
                <Create
                    data-testid = 'StatusSelectorChip__pencil'
                    style = {{
                        paddingLeft: '2px',
                        width: '16px',
                        height: '16px',
                        color: status.color
                    }}
                /> : undefined
            }
        />
    )
}

StatusSelectorChip.propTypes = {
    statusName: PropTypes.oneOf([
        'NOT_STARTED',
        'ON_TRACK',
        'COMPLETED',
        'AT_RISK',
        'BLOCKED'
    ]),
    onEditProps: PropTypes.shape({
        id: PropTypes.number,
        type: PropTypes.oneOf([
            'assertion',
            'measure'
        ])
    }),
    hasEdit: PropTypes.bool
}

StatusSelectorChip.defaultProps = {
    onEditProps: {
        id: null,
        type: null
    },
    statusName: null,
    hasEdit: false
}

export default StatusSelectorChip