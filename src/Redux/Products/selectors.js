import { selectProjectById } from '../Projects/selectors'

export const selectProductById = (state, id) => {
    const product = state.products[id]

    if (!product) return {
        name: '',
        description: '',
        tagIds: [],
        tags: [],
        projects: [],
        personnel: {
            ownerId: null,
            adminIds: [],
            teamIds: []
        }
    }

    const projects = product.projectIds.map(pId => selectProjectById(state, pId))
    const tagIds = product.tags.map(t => t.id)

    return {
        ...product,
        tagIds,
        projects,
        description: product.description ?? '',
    }
}

export const selectProducts = (state) => {
    const allProducts = state.products
    if (!allProducts) return []

    return Object.keys(allProducts).map(id => selectProductById(state, id))
}

export const selectUnarchivedProductIds = (state) => {
    return Object.values(state.products).filter(a => !a.isArchived).map(a => a.id)
}

export const selectUnarchivedProducts = (state) => {
    return selectProducts(state).filter(a => !a.isArchived)
}

export const selectAvailableProducts = (state) => {
    return selectUnarchivedProducts(state).filter(p => p.portfolioId === null)
}

export const selectProductOwnerByProductId = (state, productId) => {
    return state.products[productId]?.personnel?.ownerId
}

export const selectProductsByPortfolioId = (state, portfolioId) => {
    return Object.values(state.products).filter(product => product.portfolioId === portfolioId)
}