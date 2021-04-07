import { AppBar, Tab, Tabs, useTheme } from '@material-ui/core'
import React, { Suspense, useState } from 'react'
import Page from '../../Page/Page'

const UserTab = React.lazy(() => import('../../Admin/UserTab/UserTab'))

const TagsTab = React.lazy(() => import('../../Admin/TagsTab/TagsTab'))

function Admin() {
    const theme = useTheme()
    const [value, setValue] = useState('tags')

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
                        <Tab label = 'products' value = 'products' disableRipple/>
                    </Tabs>
                </AppBar>
                { value === 'users' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><UserTab/></Suspense>
                }
                { value === 'tags' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><TagsTab/></Suspense>
                }
            </>
        </Page>
    )
}

export default Admin
