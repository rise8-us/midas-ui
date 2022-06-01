import { LockOpenOutlined, LockOutlined } from '@mui/icons-material'
import { Box, Divider, Grid, IconButton, Skeleton, Tab, Tabs, Tooltip, Typography } from '@mui/material'
import EntriesContainer from 'Components/EntriesContainer/EntriesContainer'
import { Page } from 'Components/Page'
import { PortfolioCapabilities } from 'Components/Portfolio/PortfolioCapabilities'
import { PageMetrics } from 'Components/Tabs/PageMetrics/'
import { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { selectUserLoggedIn } from 'Redux/Auth/selectors'
import { setCapability } from 'Redux/Capabilities/reducer'
import { setPortfolioPagePermission } from 'Redux/PageAccess/reducer'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'

const isOwnerOrAdmin = (userId, personnel) => personnel?.ownerId === userId || personnel?.adminIds?.includes(userId)

export default function Portfolio() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { portfolioId, portfolioTab } = useParams()
    const id = parseInt(portfolioId)

    const userLoggedIn = useSelector(selectUserLoggedIn)
    const portfolio = useSelector(state => selectPortfolioById(state, id))
    const pagePermissions = useSelector(state => selectPortfolioPagePermission(state, id))
    const isAuthorized = isOwnerOrAdmin(userLoggedIn.id, portfolio?.personnel) || userLoggedIn.isAdmin

    const handleChange = (_e, newValue) => {
        history.push(`/portfolios/${id}/${newValue}`)
    }

    const updatePageEdit = () => {
        dispatch(setPortfolioPagePermission({
            id,
            permissions: {
                edit: pagePermissions.edit ? false : true
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
            <Grid container direction = 'column' paddingX = {3}>
                <Grid container item>
                    <Grid item xs = 'auto'>
                        <Typography variant = 'h3'>
                            {
                                portfolio?.name ??
                                <Skeleton
                                    height = '56px'
                                    width = '300px'
                                    data-testid = 'Portfolio__name-loading'
                                />
                            }
                        </Typography>
                    </Grid>
                    <Grid item alignSelf = 'end'>
                        {portfolio.name && isAuthorized &&
                            <IconButton
                                onClick = {updatePageEdit}
                                data-testid = 'Portfolio__button-edit'
                            >
                                <Tooltip title = {pagePermissions.edit ? 'Click to stop editing' : 'Click to edit'}>
                                    {pagePermissions.edit
                                        ? <LockOpenOutlined fontSize = 'medium' color = 'primary'/>
                                        : <LockOutlined fontSize = 'medium' color = 'primary'/>
                                    }
                                </Tooltip>
                            </IconButton>
                        }
                    </Grid>
                </Grid>
                <Grid container item direction = 'column'>
                    <Grid item>
                        <Tabs value = {portfolioTab ?? 'roadmap'} onChange = {handleChange}>
                            <Tab
                                label = 'roadmap'
                                value = 'roadmap'
                                data-testid = 'Portfolio__roadmap'
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
                    </Grid>
                    <Grid item>
                        <Box paddingY = {3}>
                            {(portfolioTab === 'roadmap' || portfolioTab === undefined) &&
                                <Suspense fallback = {<div data-testid = 'Portfolio__fallback'/>}>
                                    <EntriesContainer portfolioId = {id}/>
                                </Suspense>
                            }
                            {portfolioTab === 'requirements' &&
                                <Suspense fallback = {<div data-testid = 'Portfolio__fallback'/>}>
                                    <PortfolioCapabilities portfolioId = {id}/>
                                </Suspense>
                            }
                            {portfolioTab === 'metrics' &&
                                <Suspense fallback = {<div data-testid = 'Portfolio__fallback'/>}>
                                    <PageMetrics id = {id} type = 'portfolio'/>
                                </Suspense>
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Page>
    )
}

