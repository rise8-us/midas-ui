import { convertRolesLongToRolesMap } from '../../Utilities/bitwise'

export const selectUserById = (state, id) => {
    const user = state.users[id]
    if (!user) return {}

    const assignedRoles = convertRolesLongToRolesMap(user.roles)

    return { ...user, roles: assignedRoles }
}

export const selectUsersByIds = (state, ids) => {
    return ids.map(id => selectUserById(state, id))
}