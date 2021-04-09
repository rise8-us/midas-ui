import { AppBar, Tab, Tabs, useTheme } from '@material-ui/core'
import React, { Suspense, useState } from 'react'
import { Page } from '../../Page'

const UserTab = React.lazy(() => import('../../Admin/UserTab/UserTab'))
const TagsTab = React.lazy(() => import('../../Admin/TagsTab/TagsTab'))
const ProjectsTab = React.lazy(() => import('../../Admin/ProjectsTab/ProjectsTab'))

function Admin() {
    const theme = useTheme()
    const [value, setValue] = useState(false)

    const handleChange = (_e, newValue) => setValue(newValue)

    return (
        <Page>
            <>
                <AppBar
                    position = 'static'
                    style = {{
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.getContrastText(theme.palette.background.default),
                        margin: 'auto'
                    }}
                >
                    <Tabs value = {value} onChange = {handleChange} style = {{ margin: 'auto' }}>
                        <Tab label = 'users' value = 'users' disableRipple/>
                        <Tab label = 'tags' value = 'tags' disableRipple/>
                        <Tab label = 'projects' value = 'projects' disableRipple/>
                    </Tabs>
                </AppBar>
                { value === 'users' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><UserTab/></Suspense>
                }
                { value === 'tags' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><TagsTab/></Suspense>
                }
                { value === 'projects' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><ProjectsTab/></Suspense>
                }
            </>
        </Page>
    )
}

export default Admin
