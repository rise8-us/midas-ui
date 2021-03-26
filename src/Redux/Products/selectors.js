export const getProductById = (state, key) => {
    return state.products[key] ?? {}
}

export const getProducts = (state) => {
    const allProducts = state.products
    if (!allProducts) return []

    return Object.values(state.products)
}