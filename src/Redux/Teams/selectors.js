export const getTeamById = (state, key) => {
    return state.teams[key] ?? {}
}