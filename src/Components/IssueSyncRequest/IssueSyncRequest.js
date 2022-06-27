import { Sync } from '@mui/icons-material'
import { CircularProgress, IconButton, Tooltip } from '@mui/material'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setIssueSyncProgress } from 'Redux/AppSettings/reducer'
import { selectIssueSyncProgress, selectReleaseSyncProgress } from 'Redux/AppSettings/selectors'

export default function IssueSyncRequest({ projectId, request, tooltip }) {
    const dispatch = useDispatch()

    const issueSyncProgress = useSelector(state => selectIssueSyncProgress(state, projectId))
    const releaseSyncProgress = useSelector(state => selectReleaseSyncProgress(state, projectId))
    const { value: issueValue, status: issueStatus } = issueSyncProgress
    const { status: releaseStatus } = releaseSyncProgress
    const loading = issueStatus !== 'SYNCED' || releaseStatus !== 'SYNCED'

    const syncIssues = async() => {
        dispatch(setIssueSyncProgress({ id: projectId, value: .01 }))
        await request()
    }

    return loading ?
        <Tooltip title = {`${(issueValue * 100).toFixed(1)}%`} placement = 'top' arrow>
            <div style = {{ position: 'relative' }}>
                <CircularProgress
                    value = {issueValue * 100}
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
}

IssueSyncRequest.propTypes = {
    projectId: PropTypes.number.isRequired,
    request: PropTypes.func.isRequired,
    tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

IssueSyncRequest.defaultProps = {
    tooltip: null
}