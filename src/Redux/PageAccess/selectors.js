export const selectPortfolioPagePermission = (state, portfolioId) => {
    return state.pageAccess.portfolios[portfolioId] ?? {}
}