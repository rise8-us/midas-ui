import { CardContent, Divider, Grid, makeStyles } from '@material-ui/core'
import { ProductList } from 'Components/ProductList'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AbmsLogo from '../../../Assets/ABMSAppsLogo.svg'
import { hasProductAccess } from '../../../Redux/Auth/selectors'
import { requestUpdatePortfolio } from '../../../Redux/Portfolios/actions'
import {
    selectAllActivePortfoliosNameAndIds, selectAllPortfolios, selectPortfolioById
} from '../../../Redux/Portfolios/selectors'
import { selectTagsByScope } from '../../../Redux/Tags/selectors'
import { getNumberOrZero } from '../../../Utilities/getNumberOrZero'
import { AutoSaveTextField } from '../../AutoSaveTextField'
import { BlockerList } from '../../BlockerList'
import { DashboardCard } from '../../Cards'
import { CtfStatistics } from '../../CtfStatistics'
import { LegendItem } from '../../LegendItem'
import { Page } from '../../Page'
import { PieChart } from '../../PieChart'

const useStyles = makeStyles((theme) => ({
    portfolioInfoContainer: {
        margin: '0 25px',
        minWidth: '250px',
        paddingTop: theme.spacing(2)
    },
    portfolioDescription: {
        fontWeight: 'bold'
    },
    container: {
        overflowY: 'overlay',
        marginBottom: theme.spacing(2),
        '&::-webkit-scrollbar': {
            width: '12px'
        },
        '&::-webkit-scrollbar-thumb': {
            height: '15%',
            border: '3px solid rgba(0, 0, 0, 0)',
            backgroundClip: 'padding-box',
            backgroundColor: theme.palette.divider,
            '-webkit-border-radius': '12px'
        }
    },
    ctfStatistics: {
        [theme.breakpoints.up(1500)]: {
            maxWidth: '600px',
            flexBasis: 0
        },
        [theme.breakpoints.down(1500)]: {
            maxWidth: '100%'
        },
    },
}))

export const combinePortfolios = (portfolios) => {
    return portfolios.reduce((acc, curr) => ({
        description: '',
        products: acc.products.concat(curr.products)
    }), { description: '', products: [] })
}

export const combineProducts = (products) => products.reduce((acc, curr) => acc.concat(curr.projects), [])

export const buildCtfData = (projects, ctfSteps) => {
    const projectsCount = projects.length

    return Object.values(ctfSteps)
        .filter(s => ['COT', 'GIT_PIPELINE', 'CTF'].includes(s.name))
        .reverse()
        .map(step => {
            const stepBit = Math.pow(2, step.offset)
            const projectsWithStep = projects.filter(p => stepBit & p.projectJourneyMap)
            const val = projectsWithStep.length / projectsCount * 100

            return ({
                name: step.name,
                value: getNumberOrZero(val),
                count: projectsWithStep.length,
                total: projectsCount
            })
        })
        .reverse()
}

export const buildScopedData = (products, scopedTags) => {
    const totalProductsCount = products.length
    let accountedValue = 100
    let unaccountedProducts = totalProductsCount

    const data = scopedTags.map(t => {
        const productsWithTag = products.filter(p => p.tagIds.includes(t.id))
        const val = productsWithTag.length / totalProductsCount * 100

        accountedValue -= getNumberOrZero(val)
        unaccountedProducts -= productsWithTag.length

        return ({
            title: `${t.label} - ${productsWithTag.length} (${Number(val.toFixed(2))}%)`,
            color: t.color,
            value: getNumberOrZero(val),
        })
    })

    data.push({
        title: `missing tags for ${unaccountedProducts} products`,
        value: accountedValue,
        color: 'transparent'
    })

    return data
}

function Dashboard() {
    const classes = useStyles()
    const dispatch = useDispatch()

    const portfolios = useSelector(selectAllActivePortfoliosNameAndIds)
    const scopedTags = useSelector(state => selectTagsByScope(state, 'Ownership'))
    const ctfSteps = useSelector(state => state.app.projectJourneyMap) ?? {}

    const [selectedPortfolioId, setSelectedPortfolioId] = useState(0)
    const hasEdit = useSelector(state => hasProductAccess(state, selectedPortfolioId))

    const selectedPortfolio = useSelector(state => (selectedPortfolioId === 0) ?
        combinePortfolios(selectAllPortfolios(state)) : selectPortfolioById(state, selectedPortfolioId))

    const options = portfolios.map(p => { return { id: p.id, label: p.name } })
    options.unshift({ id: 0, label: 'ALL' })

    const scopedData = buildScopedData(selectedPortfolio?.products ?? [], scopedTags)

    const ctfData = buildCtfData(combineProducts(selectedPortfolio?.products ?? []), ctfSteps)

    const getPortfolioDescription = (description) => {
        if (selectedPortfolioId === 0) {
            return 'Currently view all portfolio data. ' +
            'To view a specific portfolio select it from the list above.'
        } else {
            return description ? description : 'No description available'
        }
    }

    const updatePortfolioDescription = (description) => {
        dispatch(requestUpdatePortfolio({
            ...selectedPortfolio,
            description,
            childIds: selectedPortfolio.children,
            tagIds: selectedPortfolio.tags.map(t => t.id)
        }))
    }

    return (
        <Page>
            <Grid container spacing = {3} style = {{ padding: '24px' }} >
                <Grid item sm>
                    <DashboardCard
                        title = 'Portfolio'
                        options = {options}
                        defaultOptionId = {selectedPortfolioId}
                        onChange = {setSelectedPortfolioId}
                        minWidth = '960px'
                    >
                        <CardContent style = {{ paddingTop: 0, display: 'flex' }}>
                            <Grid container wrap = 'nowrap'>
                                <Grid item>
                                    <PieChart
                                        data = {scopedData}
                                        label = {<img src = {AbmsLogo} style = {{ width: '100px' }}/>}
                                    />
                                </Grid>
                                <Grid
                                    container
                                    item
                                    direction = 'column'
                                    className = {classes.portfolioInfoContainer}
                                >
                                    <Grid item style = {{ margin: 'auto 0' }}>
                                        <AutoSaveTextField
                                            className = {classes.portfolioDescription}
                                            initialValue = {getPortfolioDescription(selectedPortfolio?.description)}
                                            canEdit = {hasEdit}
                                            multiline
                                            fullWidth
                                            onSave = {updatePortfolioDescription}
                                        />
                                    </Grid>
                                    <Grid container item spacing = {2} style = {{ margin: '0 -8px' }}>
                                        {scopedTags.map(tag => (
                                            <Grid item key = {tag.id} >
                                                <LegendItem color = {tag.color} text = {tag.label.split('::')[1]}/>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider orientation = 'vertical' style = {{ height: 'auto', margin: '0 16px' }}/>
                            <CtfStatistics data = {ctfData} />
                        </CardContent>
                    </DashboardCard>
                </Grid>
                <Grid item xs className = {classes.ctfStatistics}>
                    <DashboardCard
                        title = 'Blockers'
                        minWidth = '475px'
                    >
                        <CardContent className = {classes.container}>
                            <BlockerList portfolioId = {selectedPortfolioId}/>
                        </CardContent>
                    </DashboardCard>
                </Grid>
                <Grid item xs className = {classes.products}>
                    <DashboardCard
                        title = 'Products'
                        minWidth = '600px'
                    >
                        <CardContent className = {classes.container}>
                            <ProductList products = {selectedPortfolio.products} tagScope = 'Ownership' />
                        </CardContent>
                    </DashboardCard>
                </Grid>
            </Grid>
        </Page>
    )
}

export default Dashboard