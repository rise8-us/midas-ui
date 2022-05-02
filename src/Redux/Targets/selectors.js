export const selectTargetById = (state, id) => {
    return state.targets[id] ?? {
        title: '',
        description: '',
        startDate: '',
        dueDate: '',
        portfolioId: null
    }
}

export const selectTargetsByPortfolioId = (state, portfolioId) => {
    const targets = state.targets

    return Object.values(targets)
        .filter(target => target.portfolioId === portfolioId)
        .map(target => ({ ...target, type: 'target' }))
}
