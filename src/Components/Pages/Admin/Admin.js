import { Tab, Tabs } from '@mui/material'
import { Page } from 'Components/Page'
import { lazy, Suspense, useRef, useState } from 'react'
import { styled } from 'Styles/materialThemes'

const UserTab = lazy(() => import('Components/Admin/UserTab/UserTab'))
const TeamsTab = lazy(() => import('Components/Admin/TeamsTab/TeamsTab'))
const ProjectsTab = lazy(() => import('Components/Admin/ProjectsTab/ProjectsTab'))
const ProductsTab = lazy(() => import('Components/Admin/ProductsTab/ProductsTab'))
const PortfoliosTab = lazy(() => import('Components/Admin/PortfoliosTab/PortfoliosTab'))
const SourceControlTab = lazy(() => import('Components/Admin/SourceControlTab/SourceControlTab'))
const DatabaseTab = lazy(() => import('Components/Admin/DatabaseTab/DatabaseTab'))

const TabsStyled = styled(Tabs)(({ theme }) => ({
    position: 'sticky',
    top: '0px',
    zIndex: 100,
    boxShadow: '0 0 6px 0 #000',
    backgroundColor: theme.palette.background.default
}))

function Admin() {
    const [value, setValue] = useState('users')
    const tabRef = useRef()

    const handleChange = (_e, newValue) => setValue(newValue)

    return (
        <Page>
            <TabsStyled
                value = {value}
                onChange = {handleChange}
                variant = 'fullWidth'
                ref = {tabRef}
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
            { value === 'users' &&
                <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}>
                    <UserTab offsetTop = {tabRef?.current?.offsetHeight + 16}/>
                </Suspense>
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
        </Page>
    )
}

export default Admin
