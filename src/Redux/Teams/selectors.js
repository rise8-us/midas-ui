export const selectTeamById = (state, key) => {
    return state.teams[key] ?? {}
}