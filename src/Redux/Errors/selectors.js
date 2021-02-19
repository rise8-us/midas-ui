export const selectRequestErrors = (state, action) => {
    const errors = state.errors[action]
    if (errors) return errors
    else return []
}
