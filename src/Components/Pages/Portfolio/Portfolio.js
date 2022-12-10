import SettingsIcon from '@mui/icons-material/Settings'
import {
    Box,
    Button,
    CircularProgress,
    Divider, Skeleton,
    Stack,
    styled,
    Tab,
    Tabs, Typography
} from '@mui/material'
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
import { openPopup } from 'Redux/Popups/actions'
import PortfolioConstants from 'Redux/Portfolios/constants'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'
import { parseStringToDate } from 'Utilities/dateHelpers'
import Tooltips from '../../../Constants/Tooltips'
import { requestSyncEpicsByPortfolioId } from '../../../Redux/Epics/actions'
import { EpicSyncRequest } from '../../EpicSyncRequest'

const isPortfolioOwnerOrPortfolioAdmin =
    (userId, personnel) => personnel?.ownerId === userId || personnel?.adminIds?.includes(userId)
const isPortfolioMemberOrSiteAdmin = (portfolioMember, siteAdmin) => portfolioMember || siteAdmin

const loadPortfolioName = (portfolioName) => portfolioName
    ? <Typography variant = 'h4'>{portfolioName}</Typography>
    : <Skeleton height = '64px' width = '60vw' data-testid = 'Portfolio__skeleton-name'/>

const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.grey[600],
    size: 'large'
}))

export default function Portfolio() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { portfolioId, portfolioTab, capabilityId } = useParams()
    const id = parseInt(portfolioId)

    const userLoggedIn = useSelector(selectUserLoggedIn)
    const portfolio = useSelector(state => selectPortfolioById(state, id))
    const isAuthorized = isPortfolioMemberOrSiteAdmin(
        isPortfolioOwnerOrPortfolioAdmin(userLoggedIn.id, portfolio?.personnel), userLoggedIn.isAdmin
    )
    const showSync = isAuthorized && portfolio.sourceControlId !== null && portfolio.gitlabGroupId !== null
    const showSettings = isAuthorized

    const handleChange = (_e, newValue) => {
        let url = `/portfolios/${id}/${newValue}`
        if (newValue === 'requirements') url += `/${capabilityId ?? ''}`

        history.push(url)
    }

    useEffect(() => {
        isAuthorized && portfolio.name &&
            dispatch(setPortfolioPagePermission({
                id,
                permissions: {
                    edit: true
                }
            }))
    }, [portfolio.name])

    const updatePortfolioPopup = () => {
        dispatch(
            openPopup(PortfolioConstants.UPDATE_PORTFOLIO, 'PortfolioPopup', { id })
        )
    }

    useEffect(() => {
        portfolio?.capabilities?.forEach(capability => dispatch(setCapability(capability)))
    }, [JSON.stringify(portfolio)])

    return (
        <Page>
            <Stack paddingX = {2}>
                <Stack direction = 'row' spacing = {1} justifyContent = 'space-between'>
                    <Stack direction = 'row' spacing = {1} alignItems = 'center'>
                        { loadPortfolioName(portfolio?.name) }
                        { showSync && <EpicSyncRequest
                            id = {id}
                            request = {requestSyncEpicsByPortfolioId}
                            tooltip = {Tooltips.EPICS_ROADMAP_SYNC}
                        /> }
                    </Stack>
                    { showSettings &&
                        <StyledButton
                            onClick = {updatePortfolioPopup}
                            startIcon = {<SettingsIcon />}
                            data-testid = 'Portfolio__button-settings'
                        >
                        Settings
                        </StyledButton>
                    }
                </Stack>
                <Tabs
                    textColor = 'primary'
                    indicatorColor = 'primary'
                    value = {portfolioTab ?? 'roadmap'}
                    onChange = {handleChange}>
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
                            <PortfolioTab.PortfolioRoadmap portfolioId = {id} isAuthorized = {isAuthorized}/>
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
                                    centered = {true}
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

