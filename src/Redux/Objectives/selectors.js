export const selectObjectiveById = (state, id) => {
    const objective = state.objectives[id]
    if (objective === undefined) return {}

    return objective
}

export const selectObjectivesByProductId = (state, productId) => {
    const allObjectives = Object.values(state.objectives)
        .filter(v => v.assertionIds !== undefined)

    if (allObjectives.length === 0) return []

    return allObjectives.filter(o => o.productId === productId)
}