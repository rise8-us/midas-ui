export const selectEpicById = (state, id) => {
    const newEpic = {
        title: '',
        description: ''
    }

    return state.epics[id] ?? newEpic
}

export const selectEpicsByProductId = (state, productId) => {
    const epics = state.epics
    if (!epics) return []

    return Object.values(epics).filter(epic => epic.productId === productId)
}