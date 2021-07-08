export const selectBlockedAssertionsByParentId = (state, parentId) => {
    return state.blockedAssertions.filter(assertion => assertion.productParentId === parentId)
}

export const selectAllBlockedAssertionsWithParentId = (state) => {
    return state.blockedAssertions.filter(assertion => assertion.productParentId !== null)
}