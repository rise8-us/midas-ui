import { Divider, Grid, IconButton, Tab, Tabs } from '@material-ui/core'
import { Edit, LockOpenOutlined, LockOutlined } from '@material-ui/icons'
import { Page } from 'Components/Page'
import { ProductDetails } from 'Components/ProductOnePager/ProductDetails'
import { ProductHeader } from 'Components/ProductOnePager/ProductHeader'
import { ProductPageOverview } from 'Components/ProductPageOverview'
import { AssertionsTab, ProjectsTab } from 'Components/Tabs'
import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { hasProductOrTeamAccess } from 'Redux/Auth/selectors'
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
    }, [])

    return (
        <Page>
            <Grid container style = {{ padding: '8px 24px' }} spacing = {6}>
                <Grid container item direction = 'column' xl = {3} lg = {4} md = {4} spacing = {2}>
                    <Grid item>
                        <ProductHeader id = {id} hasEdit = {allowInLineEdits(hasEdit, pageLock)}/>
                    </Grid>
                    <Grid item style = {{ display: 'none' }}>
                        <div>Team Info</div>
                    </Grid>
                    <Grid item>
                        <ProductDetails productId = {id} hasEdit = {allowInLineEdits(hasEdit, pageLock)}/>
                    </Grid>
                </Grid>
                <Grid container item direction = 'column' xl = {9} lg = {8} md = {8}>
                    <Grid container item direction = 'column'>
                        <Grid container item style = {{ height: '48px' }} direction = 'row-reverse'>
                            <Grid item>
                                {hasEdit &&
                                    <IconButton
                                        data-testid = 'ProductPage__icon-popup-edit'
                                        onClick = {openUpdateProductPopup}
                                        color = 'secondary'
                                    >
                                        <Edit />
                                    </IconButton>
                                }
                            </Grid>
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
                        </Grid>
                        <Grid item>
                            <Tabs value = {value} onChange = {handleChange}>
                                <Tab
                                    label = 'overview'
                                    value = 'overview'
                                    disableRipple
                                    data-testid = 'Product__overview'
                                />
                                <Tab label = 'OGSMs' value = 'ogsms' disableRipple data-testid = 'Product__ogsms'/>
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
                            { value === 'overview' &&
                                <Suspense fallback = {<div data-testid = 'Product__fallback'/>}>
                                    <div style = {{ padding: '24px 0' }}>
                                        <ProductPageOverview
                                            id = {id}
                                            hasEdit = {allowInLineEdits(hasEdit, pageLock)}
                                        />
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
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Page>
    )
}

export default Product