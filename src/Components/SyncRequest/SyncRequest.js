import { Sync, WarningAmberRounded } from '@mui/icons-material'
import { CircularProgress, IconButton, Tooltip } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEpicSyncProgress } from 'Redux/AppSettings/reducer'
import { selectEpicSyncProgress } from 'Redux/AppSettings/selectors'
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

    const syncProgress = useSelector(state => selectEpicSyncProgress(state)) ?? 1

    const [isLoading, setIsLoading] = useState(false)
    const [fetchErrors, setFetchErrors] = useState([])

    const syncEpics = () => {
        dispatch(setEpicSyncProgress({ value: 0 }))
        setIsLoading(true)
        dispatch(request(id))
            .catch(error => {
                setFetchErrors(error)
            })
    }

    const getIcon = (processing) => processing ?
        <Tooltip title = {`${(syncProgress * 100).toFixed(1)}%`} placement = 'top' arrow>
            <div>
                <CircularProgress
                    value = {syncProgress * 100}
                    variant = 'determinate'
                    data-testid = 'SyncRequest__CircularProgress'
                    style = {{
                        position: 'absolute',
                        right: '2px',
                        top: '2px'
                    }}
                    size = '30px'
                />
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
            </div>
        </Tooltip>
        :
        <Tooltip title = {tooltip} placement = 'top' arrow>
            <IconButton
                size = 'small'
                data-testid = 'SyncRequest__button-sync'
                onClick = {syncEpics}
                sx = {{
                    marginBottom: '6px'
                }}
            >
                <Sync
                    color = 'secondary'
                />
            </IconButton>
        </Tooltip>

    useEffect(() => {
        if (syncProgress === 1) {
            setTimeout(() => setIsLoading(false), 500)
        } else {
            setIsLoading(true)
        }
    }, [syncProgress])

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