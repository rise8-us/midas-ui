import { selectProjectById } from '../Projects/selectors'
import { selectTagsByIds } from '../Tags/selectors'

export const selectProductById = (state, id) => {
    const product = state.products[id]
    if (!product) return {
        name: '',
        description: '',
        tags: [],
        projects: []
    }

    const tags = selectTagsByIds(state, product.tagIds)
    const projects = product.projectIds.map(pId => selectProjectById(state, pId))

    const updatedProduct = {
        ...product,
        tags,
        projects,
        description: product.description ?? '',
    }

    return updatedProduct
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