export const selectCapabilitiesPagePermission = (state, permission) => state.pageAccess.capabilities[permission]

export const selectPortfolioPagePermission = (state, portfolioId) => {
    return state.pageAccess.portfolios[portfolioId] ?? {}
}