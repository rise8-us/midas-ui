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
        .filter(target => target.portfolioId === portfolioId && target.parentId === null)
        .map(target => ({ ...target, type: 'target' }))
}

export const selectTargetsByParentId = (state, parentId) => {
    const targets = state.targets

    return Object.values(targets)
        .filter(target => target.parentId === parentId)
}