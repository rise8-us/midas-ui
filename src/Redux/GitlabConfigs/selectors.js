export const selectGitlabConfigById = (state, id) => {
    const config = state.gitlabConfigs[id]
    if (!config) return {
        name: '',
        description: '',
        baseUrl: ''
    }

    return config
}

export const selectGitlabConfigs = (state) => {
    const allConfigs = state.gitlabConfigs
    if (!allConfigs) return []

    return Object.values(allConfigs)
}
