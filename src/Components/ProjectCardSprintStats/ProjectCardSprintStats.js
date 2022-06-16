
import { Card, Grid, Stack, Typography } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { IssueSyncRequest } from 'Components/IssueSyncRequest'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSearchIssues, requestSyncIssuesByProjectId } from 'Redux/Issues/actions'
import { selectProjectById } from 'Redux/Projects/selectors'
import { requestSearchReleases, requestSyncReleasesByProjectId } from 'Redux/Releases/actions'
import { getDateInDatabaseOrder } from 'Utilities/dateHelpers'

export default function ProjectCardSprintStats({ projectId, dateRange, hasEdit }) {
    const dispatch = useDispatch()

    const project = useSelector(state => selectProjectById(state, projectId))

    const [closedIssuesThisSprint, setClosedIssuesThisSprint] = useState([])
    const [releasesThisSprint, setReleasesThisSprint] = useState([])

    const syncIssues = async() => {
        return Promise.all(
            [
                dispatch(requestSyncIssuesByProjectId(projectId)),
                dispatch(requestSyncReleasesByProjectId(projectId))
            ]
        )
    }

    const projectSearchString = (field) => {
        let searchString = ['project.id:' + projectId]
        searchString.push(' AND ')
        searchString.push(`${field}>=` + getDateInDatabaseOrder((new Date(dateRange[0])).toISOString()))
        searchString.push(' AND ')
        searchString.push(`${field}<=` + getDateInDatabaseOrder((new Date(dateRange[1])).toISOString()))
        return searchString.join('')
    }

    const fetchSprintIssues = () => {
        dispatch(requestSearchIssues(projectSearchString('completedAt')))
            .then(unwrapResult).then(setClosedIssuesThisSprint)
    }

    const fetchSprintReleases = () => {
        dispatch(requestSearchReleases(projectSearchString('releasedAt')))
            .then(unwrapResult).then(setReleasesThisSprint)
    }

    useEffect(() => {
        fetchSprintIssues()
        fetchSprintReleases()
    }, [dateRange])

    return (
        <Card style = {{ padding: '8px' }}>
            <Stack>
                <Stack
                    height = '36px'
                    marginLeft = {1}
                    justifyContent = 'space-between'
                    direction = 'row'
                    spacing = {1}
                >
                    <Typography variant = 'h6'>{project.name}</Typography>
                    <div style = {{ visibility: hasEdit ? 'visible' : 'hidden' }} >
                        <IssueSyncRequest request = {syncIssues} tooltip = ''/>
                    </div>
                </Stack>
                <Grid container margin = {1}>
                    <Grid item xs = {12} lg = {3}>
                        <div>
                            <Typography variant = 'subtitle1' color = 'secondary'>
                                Production Deployments:
                            </Typography>
                            <Stack paddingX = {1}>
                                {releasesThisSprint.map((release, index) =>
                                    <Stack
                                        display = 'list-item'
                                        direction = 'row'
                                        spacing = {1}
                                        key = {index}
                                        marginLeft = {2}
                                    >
                                        <Typography display = 'inline' variant = 'body2'>
                                            {release.name}
                                        </Typography>
                                        <Typography display = 'inline' color = 'secondary'>
                                            -
                                        </Typography>
                                        <Typography display = 'inline' variant = 'body2'>
                                            {format(new Date(release.releasedAt), 'dd MMM yy')}
                                        </Typography>
                                    </Stack>
                                )}
                                {releasesThisSprint?.length === 0 &&
                                    <Typography>
                                        <i>No deployments this sprint.</i>
                                    </Typography>
                                }
                            </Stack>
                        </div>
                    </Grid>
                    <Grid item xs = {12} lg = {4} display = 'none'>
                        <Typography>issues deployed to prod go here</Typography>
                    </Grid>
                    <Grid item xs = {12} lg = {4}>
                        <div>
                            <Typography variant = 'subtitle1' color = 'secondary'>
                                Issues Deployed to Staging:
                            </Typography>
                            <Stack paddingX = {1}>
                                {closedIssuesThisSprint.map((issue, index) =>
                                    <Stack
                                        display = 'list-item'
                                        direction = 'row'
                                        spacing = {1}
                                        key = {index}
                                        marginLeft = {2}
                                    >
                                        <Typography display = 'inline' variant = 'body2'>
                                            {issue.title}
                                        </Typography>
                                    </Stack>
                                )}
                                {closedIssuesThisSprint?.length === 0 &&
                                    <Typography>
                                        <i>No issues closed this sprint.</i>
                                    </Typography>
                                }
                            </Stack>
                        </div>
                    </Grid>
                </Grid>
            </Stack>
        </Card>
    )
}

ProjectCardSprintStats.propTypes = {
    dateRange: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number])).isRequired,
    projectId: PropTypes.number.isRequired,
    hasEdit: PropTypes.bool
}

ProjectCardSprintStats.defaultProps = {
    hasEdit: false
}