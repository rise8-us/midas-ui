import { Box, CardContent, Divider, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { useSelector } from 'react-redux'
import AbmsLogo from '../../../Assets/ABMSAppsLogo.svg'
import { selectAllActivePortfoliosNameAndIds, selectPortfolioById } from '../../../Redux/Portfolios/selectors'
import { selectTagsByScope } from '../../../Redux/Tags/selectors'
import { DashboardCard } from '../../Cards'
import { LegendItem } from '../../LegendItem'
import { Page } from '../../Page'

const useStyles = makeStyles(() => ({
    portfolioDescription: {
        fontWeight: 'bold',
        alignSelf: 'center',
        width: '100%',
        margin: 'auto 0'
    },
    container: {
        maxWidth: '500px',
        minWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
}))

function Dashboard() {
    const classes = useStyles()

    const portfolios = useSelector(selectAllActivePortfoliosNameAndIds)
    const horizonTags = useSelector(state => selectTagsByScope(state, 'Horizon'))

    const [selectedPortfolioId, setSelectedPortfolioId] = useState(0)

    const selectedPortfolio = useSelector(state => selectPortfolioById(state, selectedPortfolioId))

    const options = portfolios.map(p => { return { id: p.id, label: p.name } })
    options.unshift({ id: 0, label: 'ALL' })

    const buildData = () => {
        const data = []
        const totalProductsCount = selectedPortfolio.products.length
        let accountedValue = 100
        let unaccountedProducts = totalProductsCount

        horizonTags.map(t => {
            const productsWithTag = selectedPortfolio.products.filter(p => p.tagIds.includes(t.id))
            const val = productsWithTag.length / totalProductsCount * 100

            accountedValue -= val
            unaccountedProducts -= productsWithTag.length

            data.push({
                title: `${t.label} - ${totalProductsCount} (${val}%)`,
                color: t.color,
                value: val,
            })
        })

        data.push({
            title: `missing tags for ${unaccountedProducts} products`,
            value: accountedValue,
            color: '#93939320'
        })

        return data
    }

    const data = buildData()

    return (
        <Page>
            <DashboardCard
                title = 'Portfolio'
                options = {options}
                defaultOptionId = {selectedPortfolioId}
                onChange = {setSelectedPortfolioId}
            >
                <CardContent style = {{ paddingTop: 0, display: 'flex' }}>
                    <PieChart
                        style = {{
                            height: '175px',
                            width: '175px',
                            minWidth: '175px',
                            marginRight: '24px',
                        }}
                        radius = {43}
                        startAngle = {270}
                        lineWidth = {20}
                        data = {data}
                        segmentsStyle = {(index) => ({
                            filter: `drop-shadow(0 0 4px ${data[index].color}`
                        })}
                        background = '#93939320'
                    />
                    <img src = {AbmsLogo} style = {{ position: 'fixed', width: '100px', top: '220px', left: '72px' }}/>
                    <Box className = {classes.container}>
                        <Typography className = {classes.portfolioDescription}>
                            {selectedPortfolio.description ? selectedPortfolio.description : 'No description available'}
                        </Typography>
                        <Box display = 'flex'>
                            {horizonTags.map(tag => (
                                <div key = {tag.id} style = {{ marginRight: '24px' }}>
                                    <LegendItem color = {tag.color} text = {tag.label.replace('::', ' ')}/>
                                </div>
                            ))}
                        </Box>
                    </Box>
                    <Divider orientation = 'vertical' style = {{ height: 'auto', margin: '0 16px' }}/>
                </CardContent>
            </DashboardCard>
        </Page>
    )
}

export default Dashboard