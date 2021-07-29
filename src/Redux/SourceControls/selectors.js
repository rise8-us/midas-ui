export const selectSourceControlById = (state, id) => {
    const config = state.sourceControls[id]
    if (!config) return {
        name: '',
        description: '',
        baseUrl: ''
    }

    return config
}

export const selectSourceControls = (state) => {
    const allConfigs = state.sourceControls
    if (!allConfigs) return []

    return Object.values(allConfigs)
}
