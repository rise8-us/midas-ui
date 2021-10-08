import { AppBar, Tab, Tabs, useTheme } from '@material-ui/core'
import { Page } from 'Components/Page'
import React, { Suspense, useState } from 'react'

const UserTab = React.lazy(() => import('Components/Admin/UserTab/UserTab'))
const TeamsTab = React.lazy(() => import('Components/Admin/TeamsTab/TeamsTab'))
const ProjectsTab = React.lazy(() => import('Components/Admin/ProjectsTab/ProjectsTab'))
const ProductsTab = React.lazy(() => import('Components/Admin/ProductsTab/ProductsTab'))
const PortfoliosTab = React.lazy(() => import('Components/Admin/PortfoliosTab/PortfoliosTab'))
const SourceControlTab = React.lazy(() => import('Components/Admin/SourceControlTab/SourceControlTab'))
const DatabaseTab = React.lazy(() => import('Components/Admin/DatabaseTab/DatabaseTab'))

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
                        <Tab
                            label = 'source Controls'
                            value = 'source Controls'
                            disableRipple
                            data-testid = 'Admin__sourceControls'
                        />
                        <Tab
                            label = 'Database Backup & Recovery'
                            value = 'database'
                            disableRipple
                            data-testid = 'Admin__database'
                        />
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
                { value === 'source Controls' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><SourceControlTab/></Suspense>
                }
                { value === 'database' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><DatabaseTab/></Suspense>
                }
            </>
        </Page>
    )
}

export default Admin
