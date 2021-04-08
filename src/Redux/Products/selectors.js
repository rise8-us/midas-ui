import { selectTagsByIds } from '../Tags/selectors'

export const getProductById = (state, id) => {
    const product = state.products[id]
    if (!product) return {}

    const tags = selectTagsByIds(state, product.tagIds)
    const updatedProduct = { ...product, tags }

    return updatedProduct
}

export const getProducts = (state) => {
    const allProducts = state.products
    if (!allProducts) return []

    return Object.values(state.products).map(product => {
        return { ...product, tags: selectTagsByIds(state, product.tagIds) }
    })
}