export const selectAllCapabilityIds = (state) => {
    return Object.keys(state.capabilities).map(id => parseInt(id))
}

export const selectCapabilityById = (state, id) => {
    const newCapability = {
        title: '',
        description: ''
    }

    return state.capabilities[id] ?? newCapability
}