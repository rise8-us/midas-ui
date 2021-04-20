export const selectTeamById = (state, id) => {

    const team = state.teams[id]

    if (!team) return {
        name: '',
        gitlabGroupId: '',
        description: '',
    }
    return team
}