export const selectRoles = (state) => {
    return state.app.roles
}

export const selectRolesAsArray = (state) => {
    const allRoles = selectRoles(state)
    return Object.keys(allRoles).map(role => ({ ...allRoles[role] }))
}

export const selectTagTypes = (state) => {
    return Object.values(state.app.tagTypes).filter(t => t !== 'GITLAB')
}
