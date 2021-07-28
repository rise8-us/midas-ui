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