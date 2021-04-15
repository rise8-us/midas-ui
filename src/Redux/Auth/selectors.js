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