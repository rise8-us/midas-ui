import { selectProductById } from '../Products/selectors'

const selectPortfolios = (state) => {
    if (!state.portfolios) return {}
    return state.portfolios
}

const buildPortfolioData = (state, portfolio) => {
    const products = portfolio.productIds.map(pId => selectProductById(state, pId))
    return {
        ...portfolio,
        products,
        description: portfolio.description ?? '',
    }
}

export const selectPortfolioById = (state, id) => {
    const portfolio = state.portfolios[id]
    if (!portfolio) return {
        name: '',
        description: '',
        products: [],
    }

    return buildPortfolioData(state, portfolio)
}

export const selectAllPortfolios = (state) => {
    const allPortfolios = selectPortfolios(state)

    return Object.keys(allPortfolios).map(id => selectPortfolioById(state, id))
}

export const selectUnarchivedPortfolioIds = (state) => {
    return Object.values(state.portfolios).filter(p => !p.isArchived).map(p => p.id)
}

export const selectUnarchivedPortfolios = (state) => {
    return selectAllPortfolios(state).filter(p => !p.isArchived)
}

export const selectAllActivePortfoliosNameAndIds = (state) => {
    const allPortfolios = selectPortfolios(state)

    return Object.values(allPortfolios).filter(p => !p.isArchived).map(portfolio => {
        return {
            id: portfolio.id,
            name: portfolio.name
        }
    })
}