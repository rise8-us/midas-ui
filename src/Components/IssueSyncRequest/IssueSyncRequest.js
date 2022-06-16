import { Sync } from '@mui/icons-material'
import { CircularProgress, IconButton, Tooltip } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIssueSyncProgress } from 'Redux/AppSettings/reducer'
import { selectIssueSyncProgress } from 'Redux/AppSettings/selectors'

export default function IssueSyncRequest({ request, tooltip }) {
    const dispatch = useDispatch()

    const syncProgress = useSelector(state => selectIssueSyncProgress(state)) ?? 1

    const [isLoading, setIsLoading] = useState(false)

    const syncIssues = async() => {
        dispatch(setIssueSyncProgress({ value: 0 }))
        setIsLoading(true)
        await request()
        setIsLoading(false)
    }

    const getIcon = (processing) => processing ?
        <Tooltip title = {`${(syncProgress * 100).toFixed(1)}%`} placement = 'top' arrow>
            <div style = {{ position: 'relative' }}>
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
                onClick = {syncIssues}
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
        syncProgress === 1 && setTimeout(() => setIsLoading(false), 500)
    }, [syncProgress])

    return (
        getIcon(isLoading)
    )
}

IssueSyncRequest.propTypes = {
    request: PropTypes.func.isRequired,
    tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

IssueSyncRequest.defaultProps = {
    tooltip: null
}