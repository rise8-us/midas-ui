import { Divider, makeStyles } from '@material-ui/core'
import React, { Suspense } from 'react'
import { getUrlParam } from '../../../Utilities/queryParams'
import { OGSMTab } from '../../OGSM'
import { Page } from '../../Page'
import { ProductHeader } from '../../ProductHeader'

const useStyles = makeStyles(() => ({
    root: {
        margin: 15
    }
}))

// TODO: re-enable tabs once works begins on kata improvement

function Product() {
    const classes = useStyles()

    const id = parseInt(getUrlParam('products'))

    // const [value, setValue] = useState('ogsm')
    const value = 'ogsm'

    // const handleChange = (_e, newValue) => setValue(newValue)

    return (
        <Page>
            <div className = {classes.root}>
                <ProductHeader id = {id} />
                <>
                    {/*
                    <Tabs value = {value} onChange = {handleChange} >
                        <Tab label = 'OGSM(s)' value = 'ogsm' disableRipple/>
                    </Tabs>
                    */}
                    <Divider variant = 'fullWidth' />
                    { value === 'ogsm' &&
                    <Suspense fallback = {<div data-testid = 'Admin__fallback'/>}><OGSMTab productId = {id}/></Suspense>
                    }
                </>
            </div>
        </Page>
    )
}

export default Product