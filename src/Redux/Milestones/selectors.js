export const selectMilestoneById = (state, id) => {
    return state.milestones[id] ?? {
        title: '',
        description: '',
        dueDate: '',
        portfolioId: null
    }
}

export const selectMilestonesByPortfolioId = (state, portfolioId) => {
    const milestones = state.milestones

    return Object.values(milestones)
        .filter(milestone => milestone.portfolioId === portfolioId)
        .map(milestone => ({ ...milestone, type: 'milestone' }))
}