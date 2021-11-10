import { CardContent, Divider, Grid } from '@mui/material'
import AbmsLogo from 'Assets/ABMSAppsLogo.svg'
import { AutoSaveTextField } from 'Components/AutoSaveTextField'
import { BlockerList } from 'Components/BlockerList'
import { DashboardCard } from 'Components/Cards'
import { CtfStatistics } from 'Components/CtfStatistics'
import { LegendItem } from 'Components/LegendItem'
import { Page } from 'Components/Page'
import { PieChart } from 'Components/PieChart'
import { ProductList } from 'Components/ProductList'
import Statics from 'Constants/Statics'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hasProductAccess } from 'Redux/Auth/selectors'
import { requestUpdatePortfolio } from 'Redux/Portfolios/actions'
import {
    selectAllActivePortfoliosNameAndIds,
    selectAllPortfolios,
    selectPortfolioById
} from 'Redux/Portfolios/selectors'
import { selectTagsByScope } from 'Redux/Tags/selectors'
import { styled } from 'Styles/materialThemes'
import { getNumberOrZero } from 'Utilities/getNumberOrZero'

const AutoSaveTextFieldStyled = styled(AutoSaveTextField)(() => ({
    fontWeight: 'bold'
}))

const CardContentStyled = styled(CardContent)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    height: 'calc(100% - 70px)',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
        width: '12px'
    },
    '&::-webkit-scrollbar-thumb': {
        height: '15%',
        border: '3px solid transparent',
        backgroundClip: 'padding-box',
        backgroundColor: theme.palette.divider,
        WebkitBorderRadius: '12px'
    }
}))

export const combinePortfolios = (portfolios) => {
    return portfolios.reduce(
        (acc, curr) => ({
            description: '',
            products: acc.products.concat(curr.products)
        }),
        { description: '', products: [] }
    )
}

export const combineProducts = (products) => products.reduce((acc, curr) => acc.concat(curr.projects), [])

export const buildCtfData = (projects, ctfSteps) => {
    const projectsCount = projects.length

    return Object.values(ctfSteps)
        .filter((s) => ['COT', 'GIT_PIPELINE', 'CTF'].includes(s.name))
        .reverse()
        .map((step) => {
            const stepBit = Math.pow(2, step.offset)
            const projectsWithStep = projects.filter((p) => stepBit & p.projectJourneyMap)
            const val = (projectsWithStep.length / projectsCount) * 100

            return {
                name: step.name,
                value: getNumberOrZero(val),
                count: projectsWithStep.length,
                total: projectsCount
            }
        })
        .reverse()
}

export const buildScopedData = (products, scopedTags) => {
    const totalProductsCount = products.length
    let accountedValue = 100
    let unaccountedProducts = totalProductsCount

    const data = scopedTags.map((t) => {
        const productsWithTag = products.filter((p) => p.tagIds.includes(t.id))
        const val = (productsWithTag.length / totalProductsCount) * 100

        accountedValue -= getNumberOrZero(val)
        unaccountedProducts -= productsWithTag.length

        return {
            title: `${t.label} - ${productsWithTag.length} (${Number(val.toFixed(2))}%)`,
            color: t.color,
            value: getNumberOrZero(val)
        }
    })

    data.push({
        title: `missing tags for ${unaccountedProducts} products`,
        value: accountedValue,
        color: 'transparent'
    })

    return data
}

function Dashboard() {
    const dispatch = useDispatch()

    const portfolios = useSelector(selectAllActivePortfoliosNameAndIds)
    const scopedTags = useSelector((state) => selectTagsByScope(state, 'Ownership'))
    const ctfSteps = useSelector((state) => state.app.projectJourneyMap) ?? {}

    const [selectedPortfolioId, setSelectedPortfolioId] = useState(0)
    const hasEdit = useSelector((state) => hasProductAccess(state, selectedPortfolioId))

    const selectedPortfolio = useSelector((state) =>
        selectedPortfolioId === 0
            ? combinePortfolios(selectAllPortfolios(state))
            : selectPortfolioById(state, selectedPortfolioId)
    )

    const options = portfolios.map((p) => {
        return { id: p.id, label: p.name }
    })
    options.unshift({ id: 0, label: 'ALL' })

    const scopedData = buildScopedData(selectedPortfolio?.products ?? [], scopedTags)

    const ctfData = buildCtfData(combineProducts(selectedPortfolio?.products ?? []), ctfSteps)

    const getPortfolioDescription = (description) => {
        if (selectedPortfolioId === 0) {
            return Statics.DASHBOARD_ALL_PORTFOLIOS_TEXT
        } else {
            return description ? description : Statics.DESCRIPTION_EMPTY
        }
    }

    const updatePortfolioDescription = (description) => {
        dispatch(
            requestUpdatePortfolio({
                ...selectedPortfolio,
                description,
                childIds: selectedPortfolio.children,
                tagIds: selectedPortfolio.tags.map((t) => t.id)
            })
        )
    }

    return (
        <Page>
            <Grid container spacing = {3} style = {{ padding: '24px' }}>
                <Grid container item flexGrow = {1} flexBasis = {1}>
                    <DashboardCard
                        title = 'Portfolio'
                        options = {options}
                        defaultOptionId = {selectedPortfolioId}
                        onChange = {setSelectedPortfolioId}
                        maxWidth = '100%'
                        minWidth = '375px'
                        width = '965px'
                        flexGrow = {1}
                    >
                        <CardContent style = {{ paddingTop: 0 }}>
                            <Grid container rowSpacing = {2} columnSpacing = {3} style = {{ paddingTop: 0 }}>
                                <Grid container item columnSpacing = {2} zeroMinWidth xs = {12} md wrap = 'nowrap'>
                                    <Grid item alignSelf = 'center'>
                                        <PieChart
                                            data = {scopedData}
                                            label = {<img src = {AbmsLogo} style = {{ width: '100px' }} />}
                                        />
                                    </Grid>
                                    <Grid container item direction = 'column' paddingY = '12px'>
                                        <Grid item marginY = 'auto'>
                                            <AutoSaveTextFieldStyled
                                                initialValue = {getPortfolioDescription(
                                                    selectedPortfolio?.description
                                                )}
                                                canEdit = {hasEdit}
                                                multiline
                                                fullWidth
                                                onSave = {updatePortfolioDescription}
                                            />
                                        </Grid>
                                        <Grid container item columnSpacing = {2} rowSpacing = {1}>
                                            {scopedTags.map((tag) => (
                                                <Grid item key = {tag.id}>
                                                    <LegendItem
                                                        color = {tag.color}
                                                        text = {tag.label.split('::')[1]}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    zeroMinWidth
                                    marginRight = '-8px'
                                    sx = {{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
                                >
                                    <Divider orientation = 'vertical' />
                                </Grid>
                                <Grid item xs alignSelf = 'center'>
                                    <CtfStatistics data = {ctfData} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </DashboardCard>
                </Grid>
                <Grid container item flexGrow = {1} flexBasis = {1}>
                    <DashboardCard
                        title = 'Blockers'
                        maxWidth = '100%'
                        minWidth = '375px'
                        width = '600px'
                        flexGrow = {1}
                    >
                        <CardContentStyled>
                            <BlockerList portfolioId = {selectedPortfolioId} />
                        </CardContentStyled>
                    </DashboardCard>
                </Grid>
                <Grid container item flexGrow = {1} flexBasis = {1}>
                    <DashboardCard
                        title = 'Products'
                        maxWidth = '100%'
                        minWidth = '375px'
                        flexGrow = {1}
                    >
                        <CardContentStyled>
                            <ProductList products = {selectedPortfolio.products} tagScope = 'Ownership' />
                        </CardContentStyled>
                    </DashboardCard>
                </Grid>
            </Grid>
        </Page>
    )
}

export default Dashboard
