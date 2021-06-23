import { AppBar, Tab, Tabs, useTheme } from '@material-ui/core'
import React, { Suspense, useState } from 'react'
import { Page } from '../../Page'

const UserTab = React.lazy(() => import('../../Admin/UserTab/UserTab'))
const ProjectsTab = React.lazy(() => import('../../Admin/ProjectsTab/ProjectsTab'))
const ProductsTab = React.lazy(() => import('../../Admin/ProductsTab/ProductsTab'))
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
                        <Tab label = 'users' value = 'users' disableRipple/>
                        <Tab label = 'projects' value = 'projects' disableRipple/>
                        <Tab label = 'products' value = 'products' disableRipple/>
                        <Tab label = 'configs' value = 'configs' disableRipple/>
                    </Tabs>
                </AppBar>
                { value === 'users' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><UserTab/></Suspense>
                }
                { value === 'projects' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><ProjectsTab/></Suspense>
                }
                { value === 'products' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><ProductsTab/></Suspense>
                }
                { value === 'configs' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><ConfigsTab/></Suspense>
                }
            </>
        </Page>
    )
}

export default Admin
