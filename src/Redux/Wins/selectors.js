export const selectWinById = (state, id) => {
    return state.wins[id] ?? {
        title: '',
        description: '',
        dueDate: '',
        portfolioId: null
    }
}

export const selectWinsByPortfolioId = (state, portfolioId) => {
    const wins = state.wins

    return Object.values(wins)
        .filter(win => win.portfolioId === portfolioId)
        .map(win => ({
            ...win,
            type: 'win',
            row: 2,
            style: { width: 0, marginLeft: '-12px' }
        }))
}