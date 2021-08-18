import { Divider, Tab, Tabs } from '@material-ui/core'
import { Page } from 'Components/Page'
import { ProductHeader } from 'Components/ProductHeader'
import { ProductOnePager } from 'Components/ProductOnePager'
import { AssertionsTab, ProjectsTab } from 'Components/Tabs'
import React, { Suspense, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'

const knownTabs = ['about', 'ogsms', 'projects']
const validTab = (potentialTab) => knownTabs.includes(potentialTab)

function Product() {
    const history = useHistory()

    const { productId, productTab, assertionId } = useParams()
    const id = parseInt(productId)

    const [value, setValue] = useState(false)

    const handleChange = (_e, newValue) => {
        if (validTab(newValue)) {
            setValue(newValue)
            if (newValue === 'ogsms') history.push(`/products/${id}/${newValue}/${assertionId ?? ''}`)
            else history.push(`/products/${id}/${newValue}`)
        }
    }

    useEffect(() => {
        if (productTab !== null && validTab(productTab)) setValue(productTab)
    }, [productTab])

    return (
        <Page>
            <div style = {{ margin: '16px' }}>
                <ProductHeader id = {id} />
                <Tabs value = {value} onChange = {handleChange} >
                    <Tab label = 'About' value = 'about' disableRipple data-testid = 'Product__about'/>
                    <Tab label = 'OGSMs' value = 'ogsms' disableRipple data-testid = 'Product__ogsms'/>
                    <Tab label = 'Projects' value = 'projects' disableRipple data-testid = 'Product__projects'/>
                </Tabs>
                <Divider variant = 'fullWidth' />
                { value === null && null }
                { value === 'about' &&
                    <Suspense fallback = {<div data-testid = 'Product__fallback'/>}>
                        <div style = {{ padding: '24px 0' }}>
                            <ProductOnePager id = {id} excludeHeader/>
                        </div>
                    </Suspense>
                }
                { value === 'ogsms' &&
                    <Suspense fallback = {<div data-testid = 'Product__fallback'/>}>
                        <AssertionsTab productId = {id}/>
                    </Suspense>
                }
                { value === 'projects' &&
                    <Suspense fallback = {<div data-testid = 'Product__fallback'/>}>
                        <ProjectsTab id = {id} />
                    </Suspense>
                }
            </div>
        </Page>
    )
}

export default Product