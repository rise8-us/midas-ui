export const selectTeamById = (state, id) => {

    const team = state.teams[id]

    if (!team) return {
        name: '',
        gitlabGroupId: '',
        description: '',
        userIds: []
    }
    return team
}

export const selectAllTeams = (state) => {
    const allTeams = state.teams

    return Object.keys(allTeams).map(id => selectTeamById(state, id))
}

export const selectTeamByProductId = (state, productId) => {
    return Object.values(selectAllTeams(state)).filter(team => team.productIds.includes(productId))[0] ?? {}
}