import { Divider, makeStyles, Tab, Tabs } from '@material-ui/core'
import React, { Suspense, useState } from 'react'
import { getUrlParam } from '../../../Utilities/queryParams'
import { Page } from '../../Page'
import { ProductHeader } from '../../ProductHeader'
import { AssertionsTab, ProjectsTab } from '../../Tabs'

const useStyles = makeStyles(() => ({
    root: {
        margin: 15
    }
}))


function Product() {
    const classes = useStyles()

    const id = parseInt(getUrlParam('products'))

    const [value, setValue] = useState('ogsm')

    const handleChange = (_e, newValue) => setValue(newValue)

    return (
        <Page>
            <div className = {classes.root}>
                <ProductHeader id = {id} />
                <>
                    <Tabs value = {value} onChange = {handleChange} >
                        <Tab label = 'OGSMs' value = 'ogsm' disableRipple/>
                        <Tab label = 'CtF Tracker' value = 'projects' disableRipple/>
                    </Tabs>
                    <Divider variant = 'fullWidth' />
                    { value === 'ogsm' &&
                        <Suspense fallback = {<div data-testid = 'Product__fallback'/>}>
                            <AssertionsTab productId = {id}/>
                        </Suspense>
                    }
                    { value === 'projects' &&
                        <Suspense fallback = {<div data-testid = 'Product__fallback'/>}>
                            <ProjectsTab id = {id} />
                        </Suspense>
                    }
                </>
            </div>
        </Page>
    )
}

export default Product