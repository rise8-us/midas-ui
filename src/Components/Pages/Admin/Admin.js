import { AppBar, Tab, Tabs, useTheme } from '@material-ui/core'
import React, { Suspense, useState } from 'react'
import Page from '../../Page/Page'

const UserTab = React.lazy(() => import('../../Admin/UserTab/UserTab'))

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
                        color: theme.palette.getContrastText(theme.palette.background.default)
                    }}
                >
                    <Tabs value = {value} onChange = {handleChange} >
                        <Tab label = 'users' value = 'users' disableRipple/>
                        <Tab label = 'tags' value = 'tags' disableRipple/>
                        <Tab label = 'products' value = 'products' disableRipple/>
                    </Tabs>
                </AppBar>
                { value === 'users' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><UserTab/></Suspense>
                }
            </>
        </Page>
    )
}

export default Admin
