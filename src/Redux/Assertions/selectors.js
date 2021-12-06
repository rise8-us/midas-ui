export const selectAssertionById = (state, id) => {
    const assertion = state.assertions[id]
    if (assertion === undefined) return {}

    return assertion
}

export const selectAssertionsByParentId = (state, parentId) => {
    const allAssertions = state.assertions

    return Object.values(allAssertions).filter(assertion => assertion.parentId === parentId)
}

export const selectChildIdsByParentId = (state, parentId) => {
    const allAssertions = state.assertions

    return allAssertions[parentId]?.children ?? []
}

export const selectAssertionsByProductId = (state, productId) => {
    const allAssertions = state.assertions

    return Object.values(allAssertions).filter(assertion => assertion.productId === productId)
}

export const selectRootAssertionId = (state, baseId) => {

    const parentId = state.assertions[baseId]?.parentId

    if (parentId === undefined) return undefined
    else if (parentId === null) return baseId
    else return selectRootAssertionId(state, parentId)
}

export const selectOnlyBlockedOrAtRiskAssertions = (state) => {
    const allAssertions = state.assertions

    return Object.values(allAssertions).filter(a => ['BLOCKED', 'AT_RISK'].includes(a.status))
}

export const selectBlockedAssertionsByPortfolioId = (state, portfolioId) => {
    return selectOnlyBlockedOrAtRiskAssertions(state).filter(assertion => {
        const product = state.products[assertion.productId]

        return product?.parentId === portfolioId
    })
}

export const selectBlockedAssertionsInAPortfolio = (state) => {
    return selectOnlyBlockedOrAtRiskAssertions(state).filter(assertion => {
        const product = state.products[assertion.productId]

        return product?.parentId !== null
    })
}