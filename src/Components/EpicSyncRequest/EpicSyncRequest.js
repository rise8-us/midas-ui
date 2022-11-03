import { Sync } from '@mui/icons-material'
import { CircularProgress, IconButton, Tooltip } from '@mui/material'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setEpicSyncProgress } from 'Redux/AppSettings/reducer'
import { selectEpicSyncProgress } from 'Redux/AppSettings/selectors'

export default function EpicSyncRequest({ id, request, tooltip }) {
    const dispatch = useDispatch()

    const syncProgress = useSelector(state => selectEpicSyncProgress(state, id))
    const { value, status } = syncProgress
    const loading = status !== 'SYNCED'

    const syncEpics = () => {
        dispatch(setEpicSyncProgress({ id: id, value: .01 }))
        dispatch(request(id))
    }

    return loading ?
        <Tooltip title = {`${(value * 100).toFixed(1)}%`} placement = 'top' arrow>
            <div style = {{ display: 'flex' }}>
                <CircularProgress
                    value = {value * 100}
                    variant = 'determinate'
                    data-testid = 'SyncRequest__CircularProgress'
                    style = {{
                        width: 'unset',
                        height: 'unset'
                    }}
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
            >
                <Sync
                    color = 'secondary'
                />
            </IconButton>
        </Tooltip>
}

EpicSyncRequest.propTypes = {
    id: PropTypes.number.isRequired,
    request: PropTypes.func.isRequired,
    tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

EpicSyncRequest.defaultProps = {
    tooltip: null
}
