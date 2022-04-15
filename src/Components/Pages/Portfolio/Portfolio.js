import { LockOpenOutlined, LockOutlined } from '@mui/icons-material'
import { Box, Divider, Grid, IconButton, Skeleton, Tab, Tabs, Typography } from '@mui/material'
import EntriesContainer from 'Components/EntriesContainer/EntriesContainer'
import { Page } from 'Components/Page'
import { PortfolioCapabilities } from 'Components/Portfolio/PortfolioCapabilities'
import { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { selectUserLoggedIn } from 'Redux/Auth/selectors'
import { setCapability } from 'Redux/Capabilities/reducer'
import { setPortfolioPagePermission } from 'Redux/PageAccess/reducer'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'

const isOwnerOrAdmin = (userId, personnel) => personnel?.ownerId === userId || personnel?.adminIds?.includes(userId)

export default function Portfolio() {
    const dispatch = useDispatch()
    const { portfolioId } = useParams()
    const id = parseInt(portfolioId)

    const [value, setValue] = useState('objectives')

    const userLoggedIn = useSelector(selectUserLoggedIn)
    const portfolio = useSelector(state => selectPortfolioById(state, id))
    const pagePermissions = useSelector(state => selectPortfolioPagePermission(state, id))
    const isAuthorized = isOwnerOrAdmin(userLoggedIn.id, portfolio?.personnel) || userLoggedIn.isAdmin

    const handleChange = (_e, newValue) => {
        setValue(newValue)
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
    }, [portfolio])

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
                    <Grid item alignSelf = 'center'>
                        {portfolio.name && isAuthorized &&
                            <IconButton
                                onClick = {updatePageEdit}
                                data-testid = 'Portfolio__button-edit'
                                size = 'large'
                            >
                                {pagePermissions.edit
                                    ? <LockOpenOutlined fontSize = 'small' title = 'unlocked'/>
                                    : <LockOutlined fontSize = 'small' title = 'locked' color = 'secondary'/>
                                }
                            </IconButton>
                        }
                    </Grid>
                </Grid>
                <Grid container item direction = 'column'>
                    <Grid item>
                        <Tabs value = {value} onChange = {handleChange}>
                            <Tab
                                label = 'objectives'
                                value = 'objectives'
                                data-testid = 'Portfolio__objectives'
                            />
                            <Tab
                                label = 'requirements'
                                value = 'requirements'
                                data-testid = 'Portfolio__requirements'
                            />
                        </Tabs>
                        <Divider variant = 'fullWidth' />
                    </Grid>
                    <Grid item>
                        <Box paddingY = {3}>
                            { value === 'objectives' &&
                                <Suspense fallback = {<div data-testid = 'Portfolio__fallback'/>}>
                                    <EntriesContainer portfolioId = {id}/>
                                </Suspense>
                            }
                            { value === 'requirements' &&
                                <Suspense fallback = {<div data-testid = 'Portfolio__fallback'/>}>
                                    <PortfolioCapabilities portfolioId = {id}/>
                                </Suspense>
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Page>
    )
}

