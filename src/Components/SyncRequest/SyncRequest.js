import { Sync, WarningAmberRounded } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import FormatErrors from 'Utilities/FormatErrors'

function WarningIcon({ errors }) {
    return (
        <Tooltip title = {<FormatErrors errors = {errors} />}>
            <WarningAmberRounded
                color = 'warning'
                style = {{ cursor: 'help', margin: '5px' }}
                data-testid = 'SyncRequest__warning-icon'
            />
        </Tooltip>
    )
}

WarningIcon.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default function SyncRequest({ id, request, tooltip }) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [fetchErrors, setFetchErrors] = useState([])

    const syncEpics = () => {
        setIsLoading(true)
        dispatch(request(id))
            .then(() => setIsLoading(false))
            .catch(error => {
                setFetchErrors(error)
                setIsLoading(false)
            })
    }

    const getIcon = (processing) => processing ?
        <Sync
            color = 'primary'
            sx = {{
                margin: '5px',
                animation: 'spin 2s linear infinite',
                '@keyframes spin': {
                    '0%': {
                        transform: 'rotate(360deg)',
                    },
                    '100%': {
                        transform: 'rotate(0deg)',
                    },
                },
            }}
        />
        :
        <Tooltip title = {tooltip} placement = 'top' arrow>
            <IconButton
                size = 'small'
                data-testid = 'SyncRequest__button-sync'
                onClick = {syncEpics}
            >
                <Sync
                    color = 'secondary'
                />
            </IconButton>
        </Tooltip>

    return (
        fetchErrors.length > 0 ? <WarningIcon errors = {fetchErrors} /> : getIcon(isLoading)
    )
}

SyncRequest.propTypes = {
    id: PropTypes.number.isRequired,
    request: PropTypes.func.isRequired,
    tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

SyncRequest.defaultProps = {
    tooltip: null
}
