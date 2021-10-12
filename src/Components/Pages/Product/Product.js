import { Divider, Grid, IconButton, Tab, Tabs } from '@material-ui/core'
import { Edit, LockOpenOutlined, LockOutlined } from '@material-ui/icons'
import { Page } from 'Components/Page'
import { ProductDetails, ProductFeatures, ProductHeader, ProductTeam } from 'Components/ProductOnePager'
import { ProductPageOverview } from 'Components/ProductPageOverview'
import { AssertionsTab, ProjectsTab } from 'Components/Tabs'
import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { hasProductOrTeamAccess } from 'Redux/Auth/selectors'
import { requestFetchFeaturesByProductId } from 'Redux/Features/actions'
import { requestFetchPersonasByProductId } from 'Redux/Personas/actions'
import { openPopup } from 'Redux/Popups/actions'
import ProductConstants from 'Redux/Products/constants'
import { requestFetchRoadmapsByProductId } from 'Redux/Roadmaps/actions'

const knownTabs = ['overview', 'ogsms', 'projects']
const validTab = (potentialTab) => knownTabs.includes(potentialTab)
const allowInLineEdits = (canEdit, readOnly) => canEdit && (!readOnly)

function Product() {
    const history = useHistory()
    const dispatch = useDispatch()

    const { productId, productTab, assertionId } = useParams()
    const id = parseInt(productId)

    const hasEdit = useSelector(state => hasProductOrTeamAccess(state, id))

    const [value, setValue] = useState(false)
    const [pageLock, setPageLock] = useState(true)

    const handleChange = (_e, newValue) => {
        setValue(newValue)
        if (newValue === 'ogsms') history.push(`/products/${id}/${newValue}/${assertionId ?? ''}`)
        else history.push(`/products/${id}/${newValue}`)
    }

    const openUpdateProductPopup = () =>
        dispatch(openPopup(ProductConstants.UPDATE_PRODUCT, 'ProductPopup', { id }))

    useEffect(() => {
        (productTab !== null && validTab(productTab)) && setValue(productTab)
    }, [productTab])

    useEffect(() => {
        dispatch(requestFetchPersonasByProductId(id))
        dispatch(requestFetchRoadmapsByProductId(id))
        dispatch(requestFetchFeaturesByProductId(id))
    }, [])

    return (
        <Page>
            <Grid container style = {{ padding: '0px 4px 0px 24px' }} spacing = {3}>
                <Grid container item direction = 'column' xl = {3} lg = {4} md = {4} spacing = {2}>
                    <Grid item>
                        <ProductHeader id = {id} hasEdit = {allowInLineEdits(hasEdit, pageLock)}/>
                    </Grid>
                    <Grid item>
                        <ProductTeam productId = {id} hasEdit = {allowInLineEdits(hasEdit, pageLock)}/>
                    </Grid>
                    <Grid item>
                        <ProductDetails productId = {id} hasEdit = {allowInLineEdits(hasEdit, pageLock)}/>
                    </Grid>
                    <Grid item>
                        <ProductFeatures productId = {id} hasEdit = {allowInLineEdits(hasEdit, pageLock)}/>
                    </Grid>
                </Grid>
                <Grid container item direction = 'column' xl = {9} lg = {8} md = {8}>
                    <Grid container item direction = 'column'>
                        <Grid container item style = {{ height: '48px' }} direction = 'row-reverse'>
                            <Grid item>
                                {hasEdit &&
                                    <IconButton
                                        data-testid = 'ProductPage__icon-inline-edit'
                                        onClick = {() => setPageLock(prev => !prev)}
                                        color = 'secondary'
                                    >
                                        {pageLock ?
                                            <LockOutlined title = 'locked'/> : <LockOpenOutlined title = 'unlocked'/>
                                        }
                                    </IconButton>
                                }
                            </Grid>
                            <Grid item>
                                {hasEdit && !pageLock &&
                                    <IconButton
                                        data-testid = 'ProductPage__icon-popup-edit'
                                        onClick = {openUpdateProductPopup}
                                        color = 'secondary'
                                    >
                                        <Edit />
                                    </IconButton>
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Tabs value = {value} onChange = {handleChange}>
                                <Tab
                                    label = 'overview'
                                    value = 'overview'
                                    disableRipple
                                    data-testid = 'Product__overview'
                                />
                                <Tab
                                    label = 'measures'
                                    value = 'ogsms'
                                    disableRipple
                                    data-testid = 'Product__ogsms'
                                />
                                <Tab
                                    label = 'Projects'
                                    value = 'projects'
                                    disableRipple
                                    data-testid = 'Product__projects'
                                />
                            </Tabs>
                            <Divider variant = 'fullWidth' />
                        </Grid>
                        <Grid item>
                            <div style = {{ padding: '24px 0' }}>
                                { value === 'overview' &&
                                    <Suspense fallback = {<div data-testid = 'Product__fallback'/>}>
                                        <ProductPageOverview
                                            id = {id}
                                            hasEdit = {allowInLineEdits(hasEdit, pageLock)}
                                        />
                                    </Suspense>
                                }
                                { value === 'ogsms' &&
                                    <Suspense fallback = {<div data-testid = 'Product__fallback'/>}>
                                        <AssertionsTab
                                            productId = {id}
                                            hasEdit = {allowInLineEdits(hasEdit, pageLock)}
                                        />
                                    </Suspense>
                                }
                                { value === 'projects' &&
                                    <Suspense fallback = {<div data-testid = 'Product__fallback'/>}>
                                        <ProjectsTab id = {id} />
                                    </Suspense>
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Page>
    )
}

export default Product