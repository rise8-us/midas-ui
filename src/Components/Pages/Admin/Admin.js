import { Tab, Tabs } from '@mui/material'
import { Page } from 'Components/Page'
import React, { Suspense, useState } from 'react'
import { styled } from 'Styles/materialThemes'

const UserTab = React.lazy(() => import('Components/Admin/UserTab/UserTab'))
const TeamsTab = React.lazy(() => import('Components/Admin/TeamsTab/TeamsTab'))
const ProjectsTab = React.lazy(() => import('Components/Admin/ProjectsTab/ProjectsTab'))
const ProductsTab = React.lazy(() => import('Components/Admin/ProductsTab/ProductsTab'))
const PortfoliosTab = React.lazy(() => import('Components/Admin/PortfoliosTab/PortfoliosTab'))
const SourceControlTab = React.lazy(() => import('Components/Admin/SourceControlTab/SourceControlTab'))
const DatabaseTab = React.lazy(() => import('Components/Admin/DatabaseTab/DatabaseTab'))

const TabsStyled = styled(Tabs)(({ theme }) => ({
    position: 'absolute',
    top: '68px',
    zIndex: 100,
    width: '100%',
    boxShadow: '0 0 6px 0 #000',
    backgroundColor: theme.palette.background.default
}))

function Admin() {
    const [value, setValue] = useState('users')

    const handleChange = (_e, newValue) => setValue(newValue)

    return (
        <>
            <TabsStyled
                value = {value}
                onChange = {handleChange}
                variant = 'fullWidth'
            >
                <Tab label = 'users' value = 'users' data-testid = 'Admin__users'/>
                <Tab label = 'teams' value = 'teams' data-testid = 'Admin__teams'/>
                <Tab label = 'projects' value = 'projects' data-testid = 'Admin__projects'/>
                <Tab label = 'products' value = 'products' data-testid = 'Admin__products'/>
                <Tab label = 'portfolios' value = 'portfolios' data-testid = 'Admin__portfolios'/>
                <Tab
                    label = 'source Controls'
                    value = 'source Controls'
                    data-testid = 'Admin__sourceControls'
                />
                <Tab
                    label = 'Database Backup & Recovery'
                    value = 'database'
                    data-testid = 'Admin__database'
                />
            </TabsStyled>
            <Page>
                <div style = {{ marginTop: '48px' }}>
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
                </div>
            </Page>
        </>
    )
}

export default Admin
