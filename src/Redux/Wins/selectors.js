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
            row: 1,
            style: { width: 0 }
        }))
}