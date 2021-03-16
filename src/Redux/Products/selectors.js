export const getProductById = (state, key) => {
    return state.products[key] ?? {}
}