export const selectMeasureById = (state, id) => {
    const measure = state.measures[id]
    if (measure === undefined) return {}

    return measure
}

export const selectMeasuresByAssertionId = (state, assertionId) => {
    const measures = state.measures

    return Object.values(measures).filter(measure => measure.assertionId === assertionId)
}

export const selectMeasureIdsByAssertionId = (state, assertionId) => {
    return selectMeasuresByAssertionId(state, assertionId).map(m => m.id)
}