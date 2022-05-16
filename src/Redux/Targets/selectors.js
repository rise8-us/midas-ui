export const selectTargetById = (state, id) => {
    return state.targets[id] ?? {
        title: '',
        description: '',
        startDate: '',
        dueDate: '',
        portfolioId: null,
        deliverableIds: [],
        epicIds: []
    }
}

export const selectTargetsByPortfolioId = (state, portfolioId) => {
    const targets = state.targets

    return Object.values(targets)
        .filter(target => target.portfolioId === portfolioId)
        .map(target => ({ ...target, type: 'target' }))
}

export const selectTargetsByIds = (state, ids) => {
    const targets = state.targets

    return Object.values(targets)
        .filter(target => ids.includes(target.id))
}

export const selectEpicIdsByTargetIds = (state, ids) => {
    const targets = selectTargetsByIds(state, ids)

    return targets.reduce((accumulator, target) => [...accumulator, ...target.epicIds], [])
}