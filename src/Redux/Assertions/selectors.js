export const selectAssertionById = (state, id) => {
    const assertion = state.assertions[id]
    if (assertion === undefined) return {}

    return assertion
}

export const selectAssertionsByObjectiveIdAndType = (state, objectiveId, type) => {
    const allAssertions = state.assertions
    if (allAssertions.length === 0) return []

    return Object.values(allAssertions).filter(a =>
        a.objectiveId === objectiveId &&
        a.type === type.toUpperCase())
}

export const selectAssertionsByParentId = (state, parentId) => {
    const allAssertions = state.assertions
    if (allAssertions.length === 0) return []

    return Object.values(allAssertions).filter(a => a.parentId === parentId)
}