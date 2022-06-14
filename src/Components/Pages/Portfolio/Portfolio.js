import { LockOpenOutlined, LockOutlined } from '@mui/icons-material'
import {
    Box, CircularProgress, Divider, IconButton, Skeleton, Stack, Tab, Tabs, Tooltip, Typography
} from '@mui/material'
import { GanttPortfolioNote } from 'Components/Gantt/GanttPortfolioNote'
import { Page } from 'Components/Page'
import { PageMetrics } from 'Components/Tabs/PageMetrics'
import * as PortfolioTab from 'Components/Tabs/PortfolioPage'
import { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { selectUserLoggedIn } from 'Redux/Auth/selectors'
import { setCapability } from 'Redux/Capabilities/reducer'
import { setPortfolioPagePermission } from 'Redux/PageAccess/reducer'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'
import { parseStringToDate } from 'Utilities/dateHelpers'

const isOwnerOrAdmin = (userId, personnel) => personnel?.ownerId === userId || personnel?.adminIds?.includes(userId)
const isMemberOrSiteAdmin = (portfolioMember, siteAdmin) => portfolioMember || siteAdmin
const togglePageEdit = (permission) => permission ? false : true
const pageEditTooltipTitle = (permission) =>permission ? 'Click to stop editing' : 'Click to edit'

const loadPortfolioName = (portfolioName) => portfolioName
    ? <Typography variant = 'h3'>{portfolioName}</Typography>
    : <Skeleton height = '64px' width = '60vw' data-testid = 'Portfolio__skeleton-name'/>
const pageEditIcon = (editPermissions) => editPermissions
    ? <LockOpenOutlined fontSize = 'medium' color = 'primary'/>
    : <LockOutlined fontSize = 'medium' color = 'primary'/>

export default function Portfolio() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { portfolioId, portfolioTab } = useParams()
    const id = parseInt(portfolioId)

    const userLoggedIn = useSelector(selectUserLoggedIn)
    const portfolio = useSelector(state => selectPortfolioById(state, id))
    const pagePermissions = useSelector(state => selectPortfolioPagePermission(state, id))
    const isAuthorized = isMemberOrSiteAdmin(
        isOwnerOrAdmin(userLoggedIn.id, portfolio?.personnel), userLoggedIn.isAdmin
    )

    const handleChange = (_e, newValue) => {
        history.push(`/portfolios/${id}/${newValue}`)
    }

    const updatePageEdit = () => {
        dispatch(setPortfolioPagePermission({
            id,
            permissions: {
                edit: togglePageEdit(pagePermissions.edit)
            }
        }))
    }

    useEffect(() => {
        if (Array.isArray(portfolio?.capabilities)) {
            portfolio.capabilities.forEach(capability => dispatch(setCapability(capability)))
        }
    }, [JSON.stringify(portfolio)])

    return (
        <Page>
            <Stack paddingX = {2}>
                <Stack direction = 'row' spacing = {1} alignItems = 'end'>
                    {loadPortfolioName(portfolio?.name)}
                    <div>
                        {portfolio.name && isAuthorized &&
                            <Tooltip title = {pageEditTooltipTitle(pagePermissions.edit)}>
                                <IconButton onClick = {updatePageEdit} data-testid = 'Portfolio__button-edit'>
                                    {pageEditIcon(pagePermissions.edit)}
                                </IconButton>
                            </Tooltip>
                        }
                    </div>
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
                            <PortfolioTab.PortfolioCapabilities portfolioId = {id}/>
                        </Suspense>
                    }
                    {portfolioTab === 'sprint-report' &&
                        <Suspense fallback = {<div data-testid = 'Portfolio__fallback'/>}>
                            {portfolio.sprintStartDate
                                ? <PortfolioTab.PortfolioSprintReport
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

