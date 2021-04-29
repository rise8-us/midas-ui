import { convertRolesLongToRolesMap } from '../../Utilities/bitwise'

export const selectUserLoggedIn = (state) => {
    const auth = state.auth
    const assignedRoles = convertRolesLongToRolesMap(auth.user.roles)
    const authenticatedUser = {
        ...auth.user,
        roles: assignedRoles,
        isAdmin: auth.isAdmin
    }

    return authenticatedUser
}

export const selectUserPermissions = (state) => {
    const userLoggedIn = selectUserLoggedIn(state)
    let roles = {}

    Object.entries(userLoggedIn.roles).map(([k, v]) => {
        const role = k.split('_')
        let newKey = 'is'
        let i
        for (i = 0; i < role.length; i++) {
            newKey = newKey + role[i][0] + role[i].substring(1).toLowerCase()
        }
        roles[newKey] = v
    })
    return roles
}
