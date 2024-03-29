import { ExpandMore } from '@mui/icons-material'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    Skeleton,
    Stack,
    Typography
} from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { IssueSyncRequest } from 'Components/IssueSyncRequest'
import { TextSkeleton } from 'Components/Skeletons'
import { SprintIssues } from 'Components/SprintIssues'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPortfolioPageSettingProjectIdExpand } from 'Redux/AppSettings/reducer'
import { selectPortfolioPageSettingProjectIdExpanded } from 'Redux/AppSettings/selectors'
import {
    requestSearchIssues,
    requestSyncIssuesByProjectId
} from 'Redux/Issues/actions'
import { selectProjectById } from 'Redux/Projects/selectors'
import { requestSyncReleasesByProjectId } from 'Redux/Releases/actions'
import {
    selectReleaseClosestTo,
    selectReleaseInRangeAndProjectId
} from 'Redux/Releases/selectors'
import { getDateInDatabaseOrder } from 'Utilities/dateHelpers'
import { isLoading } from 'Utilities/requests'

export default function ProjectCardSprintStats({ portfolioId, projectId, dateRange, hasEdit, loading }) {
    const dispatch = useDispatch()

    const project = useSelector(state => selectProjectById(state, projectId))

    const [closedIssuesThisSprint, setClosedIssuesThisSprint] = useState([])
    const [releasedIssuesThisSprint, setReleasedIssuesThisSprint] = useState([])
    const releasesThisSprint = useSelector(state => selectReleaseInRangeAndProjectId(state, dateRange, projectId))
    const previousRelease = useSelector(state => selectReleaseClosestTo(state, dateRange[0], projectId))
    const isExpanded = useSelector(state => selectPortfolioPageSettingProjectIdExpanded(state, portfolioId, projectId))

    const setExpanded = () => {
        dispatch(setPortfolioPageSettingProjectIdExpand({ portfolioId, projectId, isExpanded: !isExpanded }))
    }


    const syncIssues = async() => {
        return Promise.all(
            [
                dispatch(requestSyncIssuesByProjectId(projectId)),
                dispatch(requestSyncReleasesByProjectId(projectId))
            ]
        )
    }

    const projectSearchString = (field, rangeStart, rangeEnd) => {
        let searchString = ['project.id:' + projectId]
        searchString.push(' AND ')
        searchString.push(`${field}>=` + rangeStart)
        searchString.push(' AND ')
        searchString.push(`${field}<=` + rangeEnd)
        return searchString.join('')
    }

    const fetchSprintStagingIssues = () => {
        const startInDatabaseOrder = getDateInDatabaseOrder(new Date(dateRange[0]).toISOString())
        const endInDatabaseOrder = getDateInDatabaseOrder(new Date(dateRange[1]).toISOString())
        dispatch(requestSearchIssues(projectSearchString('completedAt', startInDatabaseOrder, endInDatabaseOrder)))
            .then(unwrapResult).then(setClosedIssuesThisSprint)
    }

    useEffect(() => {
        fetchSprintStagingIssues()
    }, [dateRange])

    useEffect(() => {
        if (releasesThisSprint.length > 0) {
            const max = Math.max(...releasesThisSprint.map(release => { return new Date(release.releasedAt) }))
            const rangeStartDateTime = new Date(previousRelease.releasedAt ?? 0).toISOString().split('T')
            const rangeEndDateTime = new Date(max).toISOString().split('T')
            const startInDatabaseOrder = getDateInDatabaseOrder(rangeStartDateTime.join('T'))
            const endInDatabaseOrder = getDateInDatabaseOrder(rangeEndDateTime.join('T'))
            const startString = `"${startInDatabaseOrder}'T'${rangeStartDateTime[1].split('.')[0]}"`
            const endString = `"${endInDatabaseOrder}'T'${rangeEndDateTime[1].split('.')[0]}"`

            dispatch(requestSearchIssues(projectSearchString('completedAt', startString, endString)))
                .then(unwrapResult).then(setReleasedIssuesThisSprint)
        } else { setReleasedIssuesThisSprint([]) }
    }, [JSON.stringify(releasesThisSprint)])

    return (
        <Accordion onChange = {setExpanded} expanded = {isExpanded}>
            <AccordionSummary
                expandIcon = {<ExpandMore />}
            >
                <Stack
                    height = '36px'
                    marginLeft = {1}
                    justifyContent = 'space-between'
                    direction = 'row'
                    spacing = {1}
                >
                    <Typography variant = 'h6'>
                        <TextSkeleton loading = {!project.name} text = {project.name} />
                    </Typography>
                    <div style = {{ visibility: hasEdit ? 'visible' : 'hidden' }} >
                        <IssueSyncRequest projectId = {projectId} request = {syncIssues} tooltip = ''/>
                    </div>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container margin = {1} columns = {13}>
                    <Grid item xs = {12} lg = {3}>
                        <div>
                            <Typography variant = 'subtitle1'>
                                Release Deployments:
                            </Typography>
                            <Stack paddingX = {1}>
                                {isLoading(loading, releasesThisSprint.length === 0) ?
                                    <Skeleton
                                        width = '80%'
                                        height = '22px'
                                        data-testid = 'ProjectCardSprintStats__skeleton-releases'
                                    />
                                    :
                                    <>
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
                                    </>
                                }
                            </Stack>

                        </div>
                    </Grid>
                    <Grid item xs = {12} lg = {5}>
                        <div>
                            <Typography variant = 'subtitle1'>
                                Issues Deployed to Production (CUI):
                            </Typography>
                            <Stack paddingX = {1}>
                                {isLoading(loading, releasedIssuesThisSprint.length === 0) ?
                                    <Skeleton
                                        width = '80%'
                                        height = '22px'
                                        data-testid = 'ProjectCardSprintStats__skeleton-prod'
                                    />
                                    :
                                    <SprintIssues
                                        issues = {releasedIssuesThisSprint}
                                        noOptionsText = 'No issues released this sprint.'
                                    />
                                }
                            </Stack>
                        </div>
                    </Grid>
                    <Grid item xs = {12} lg = {5}>
                        <div>
                            <Typography variant = 'subtitle1'>
                                Issues Deployed to Staging:
                            </Typography>
                            <Stack paddingX = {1}>
                                {isLoading(loading, closedIssuesThisSprint.length === 0) ?
                                    <Skeleton
                                        width = '80%'
                                        height = '22px'
                                        data-testid = 'ProjectCardSprintStats__skeleton-staging'
                                    />
                                    :
                                    <SprintIssues
                                        issues = {closedIssuesThisSprint}
                                        noOptionsText = 'No issues closed this sprint.'
                                    />
                                }
                            </Stack>
                        </div>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

ProjectCardSprintStats.propTypes = {
    dateRange: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number])).isRequired,
    hasEdit: PropTypes.bool,
    loading: PropTypes.bool,
    portfolioId: PropTypes.number.isRequired,
    projectId: PropTypes.number.isRequired,
}

ProjectCardSprintStats.defaultProps = {
    hasEdit: false,
    loading: false,
}
