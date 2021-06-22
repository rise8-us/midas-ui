import { selectProductById } from '../Products/selectors'

export const selectPortfolioById = (state, id) => {
    const portfolio = state.portfolios[id]
    if (!portfolio) return {
        name: '',
        description: '',
        tags: [],
        products: []
    }

    const products = portfolio.children.map(pId => selectProductById(state, pId))

    return {
        ...portfolio,
        products,
        description: portfolio.description ?? '',
    }
}

export const selectPortfolios = (state) => {
    const allPortfolios = state.portfolios
    if (!allPortfolios) return []

    return Object.keys(allPortfolios).map(id => selectPortfolioById(state, id))
}

export const selectUnarchivedPortfolioIds = (state) => {
    return Object.values(state.portfolios).filter(a => !a.isArchived).map(a => a.id)
}

export const selectUnarchivedPortfolios = (state) => {
    return selectPortfolios(state).filter(a => !a.isArchived)
}