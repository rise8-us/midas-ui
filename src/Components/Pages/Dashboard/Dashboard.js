import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllActivePortfoliosNameAndIds } from '../../../Redux/Portfolios/selectors'
import { DashboardCard } from '../../Cards'
import { Page } from '../../Page'

function Dashboard() {

    const portfolios = useSelector(selectAllActivePortfoliosNameAndIds)
    const [selectedPortfolioId, setSelectedPortfolioId] = useState(0)

    const options = portfolios.map(p => { return { id: p.id, label: p.name } })
    options.unshift({ id: 0, label: 'ALL' })

    return (
        <Page>
            <DashboardCard
                title = 'Portfolio'
                options = {options}
                defaultOptionId = {selectedPortfolioId}
                onChange = {setSelectedPortfolioId}
            >
            </DashboardCard>
        </Page>
    )
}

export default Dashboard