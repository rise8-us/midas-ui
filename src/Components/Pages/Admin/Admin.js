import { AppBar, Tab, Tabs, useTheme } from '@material-ui/core'
import React, { Suspense, useState } from 'react'
import { Page } from '../../Page'

const UserTab = React.lazy(() => import('../../Admin/UserTab/UserTab'))
const TeamsTab = React.lazy(() => import('../../Admin/TeamsTab/TeamsTab'))
const ProjectsTab = React.lazy(() => import('../../Admin/ProjectsTab/ProjectsTab'))
const ProductsTab = React.lazy(() => import('../../Admin/ProductsTab/ProductsTab'))
const PortfoliosTab = React.lazy(() => import('../../Admin/PortfoliosTab/PortfoliosTab'))
const ConfigsTab = React.lazy(() => import('../../Admin/ConfigsTab/ConfigsTab'))

function Admin() {
    const theme = useTheme()
    const [value, setValue] = useState('users')

    const handleChange = (_e, newValue) => setValue(newValue)

    return (
        <Page>
            <>
                <AppBar
                    position = 'sticky'
                    style = {{
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.getContrastText(theme.palette.background.default),
                        margin: 'auto'
                    }}
                >
                    <Tabs value = {value} onChange = {handleChange} style = {{ margin: 'auto' }}>
                        <Tab label = 'users' value = 'users' disableRipple data-testid = 'Admin__users'/>
                        <Tab label = 'teams' value = 'teams' disableRipple data-testid = 'Admin__teams'/>
                        <Tab label = 'projects' value = 'projects' disableRipple data-testid = 'Admin__projects'/>
                        <Tab label = 'products' value = 'products' disableRipple data-testid = 'Admin__products'/>
                        <Tab label = 'portfolios' value = 'portfolios' disableRipple data-testid = 'Admin__portfolios'/>
                        <Tab label = 'configs' value = 'configs' disableRipple data-testid = 'Admin__gitConfigs'/>
                    </Tabs>
                </AppBar>
                { value === 'users' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><UserTab/></Suspense>
                }
                { value === 'teams' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><TeamsTab/></Suspense>
                }
                { value === 'projects' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><ProjectsTab/></Suspense>
                }
                { value === 'products' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><ProductsTab/></Suspense>
                }
                { value === 'portfolios' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><PortfoliosTab/></Suspense>
                }
                { value === 'configs' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><ConfigsTab/></Suspense>
                }
            </>
        </Page>
    )
}

export default Admin
