export const selectAssertionById = (state, id) => {
    const assertion = state.assertions[id]
    if (assertion === undefined) return {}

    return assertion
}

export const selectAssertionsByParentId = (state, parentId) => {
    const allAssertions = state.assertions

    return Object.values(allAssertions).filter(a => a.parentId === parentId)
}

export const selectAssertionsByType = (state, type) => {
    if (typeof type !== 'string') return []
    const allAssertions = state.assertions

    return Object.values(allAssertions).filter(assertion => assertion.type === type.toUpperCase())
}

export const selectAssertionsByTypeAndProductId = (state, type, productId) => {
    return selectAssertionsByType(state, type).filter(assertion => assertion.productId === productId)
}