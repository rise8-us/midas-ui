import { LockOpenOutlined, LockOutlined } from '@mui/icons-material'
import {
    Box,
    CircularProgress,
    Divider,
    IconButton,
    Skeleton,
    Stack,
    Tab,
    Tabs,
    Tooltip,
    Typography
} from '@mui/material'
import { GanttPortfolioNote } from 'Components/Gantt/GanttPortfolioNote'
import { Page } from 'Components/Page'
import { PageMetrics } from 'Components/Tabs/PageMetrics'
import * as PortfolioTab from 'Components/Tabs/PortfolioPage'
import { SprintReport } from 'Components/Tabs/SprintReport'
import useHistory from 'Hooks/useHistory'
import { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { selectUserLoggedIn } from 'Redux/Auth/selectors'
import { setCapability } from 'Redux/Capabilities/reducer'
import { setPortfolioPagePermission } from 'Redux/PageAccess/reducer'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'
import { parseStringToDate } from 'Utilities/dateHelpers'
import { requestSyncEpicsByPortfolioId } from '../../../Redux/Epics/actions'
import Tooltips from '../../../Constants/Tooltips'
import { EpicSyncRequest } from '../../EpicSyncRequest'

const isPortfolioOwnerOrPortfolioAdmin =
    (userId, personnel) => personnel?.ownerId === userId || personnel?.adminIds?.includes(userId)
const isPortfolioMemberOrSiteAdmin = (portfolioMember, siteAdmin) => portfolioMember || siteAdmin
const togglePageEdit = (isInEditMode) => !isInEditMode
const pageEditTooltipTitle = (isInEditMode) => isInEditMode ? 'Click to stop editing' : 'Click to edit'

const loadPortfolioName = (portfolioName) => portfolioName
    ? <Typography variant = 'h3'>{portfolioName}</Typography>
    : <Skeleton height = '64px' width = '60vw' data-testid = 'Portfolio__skeleton-name'/>
const pageEditIcon = (editPermissions) => editPermissions
    ? <LockOpenOutlined fontSize = 'medium' color = 'primary'/>
    : <LockOutlined fontSize = 'medium' color = 'primary'/>

export default function Portfolio() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { portfolioId, portfolioTab, capabilityId } = useParams()
    const id = parseInt(portfolioId)

    const userLoggedIn = useSelector(selectUserLoggedIn)
    const portfolio = useSelector(state => selectPortfolioById(state, id))
    const isInEditMode = useSelector(state => selectPortfolioPagePermission(state, id).edit)
    const isAuthorized = isPortfolioMemberOrSiteAdmin(
        isPortfolioOwnerOrPortfolioAdmin(userLoggedIn.id, portfolio?.personnel), userLoggedIn.isAdmin
    )
    const showLock = isAuthorized && portfolio.name
    const showSync = isAuthorized && portfolio.sourceControlId !== null && portfolio.gitlabGroupId !== null

    const handleChange = (_e, newValue) => {
        let url = `/portfolios/${id}/${newValue}`
        if (newValue === 'requirements') url += `/${capabilityId ?? ''}`

        history.push(url)
    }

    const updatePageEdit = () => {
        dispatch(setPortfolioPagePermission({
            id,
            permissions: {
                edit: togglePageEdit(isInEditMode)
            }
        }))
    }

    useEffect(() => {
        portfolio?.capabilities?.forEach(capability => dispatch(setCapability(capability)))
    }, [JSON.stringify(portfolio)])

    return (
        <Page>
            <Stack paddingX = {2}>
                <Stack direction = 'row' spacing = {1} alignItems = 'center'>
                    { loadPortfolioName(portfolio?.name) }
                    { showLock && <Tooltip title = {pageEditTooltipTitle(isInEditMode)}>
                        <IconButton onClick = {updatePageEdit} data-testid = 'Portfolio__button-edit'>
                            { pageEditIcon(isInEditMode) }
                        </IconButton>
                    </Tooltip> }
                    { showSync && <EpicSyncRequest
                        id = {id}
                        request = {requestSyncEpicsByPortfolioId}
                        tooltip = {Tooltips.EPICS_ROADMAP_SYNC}
                    /> }
                </Stack>
                <Tabs value = {portfolioTab ?? 'roadmap'} onChange = {handleChange}>
                    <Tab
                        label = 'roadmap'
                        value = 'roadmap'
                        data-testid = 'Portfolio__roadmap'
                    />
                    <Tab
                        label = 'sprint report'
                        value = 'sprint-report'
                        data-testid = 'Portfolio__sprint-report'
                        disabled = {!portfolio.sprintStartDate}
                    />
                    <Tab
                        label = 'requirements'
                        value = 'requirements'
                        data-testid = 'Portfolio__requirements'
                    />
                    <Tab
                        label = 'metrics'
                        value = 'metrics'
                        data-testid = 'Portfolio__metrics'
                    />
                </Tabs>
                <Divider variant = 'fullWidth' />
                <Box paddingY = {3}>
                    {(portfolioTab === 'roadmap' || portfolioTab === undefined) &&
                        <Suspense fallback = {<div data-testid = 'Portfolio__fallback'/>}>
                            <GanttPortfolioNote id = {id}/>
                            <PortfolioTab.PortfolioRoadmap portfolioId = {id}/>
                        </Suspense>
                    }
                    {portfolioTab === 'requirements' &&
                        <Suspense fallback = {<div data-testid = 'Portfolio__fallback'/>}>
                            <PortfolioTab.PortfolioCapabilities
                                portfolioId = {id}
                                capabilityId = {parseInt(capabilityId)}
                            />
                        </Suspense>
                    }
                    {portfolioTab === 'sprint-report' &&
                        <Suspense fallback = {<div data-testid = 'Portfolio__fallback'/>}>
                            {portfolio.sprintStartDate
                                ? <SprintReport
                                    portfolioId = {id}
                                    productIds = {portfolio.productIds}
                                    sprintDuration = {portfolio.sprintDurationInDays}
                                    sprintStart = {parseStringToDate(portfolio.sprintStartDate)}
                                />
                                : <div
                                    style = {{
                                        height: 'calc(100vh - 165px)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <CircularProgress/>
                                </div>
                            }
                        </Suspense>
                    }
                    {portfolioTab === 'metrics' &&
                        <Suspense fallback = {<div data-testid = 'Portfolio__fallback'/>}>
                            <PageMetrics id = {id} type = 'portfolio'/>
                        </Suspense>
                    }
                </Box>
            </Stack>
        </Page>
    )
}

