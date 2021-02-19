export const getRoles = (state) => {
    return state.info.roles
}

export const getRolesAsArray = (state) => {
    const allRoles = getRoles(state)
    return Object.keys(allRoles).map(role => ({ ...allRoles[role] }))
}