import { convertRolesLongToRolesMap } from 'Utilities/bitwise'
import { snakeToCamel } from 'Utilities/caseConversions'

export const selectUsers = (state) => {
    const allUsers = state.users
    if (!allUsers) return []

    return Object.keys(allUsers).map(id => selectUserById(state, id))
}

export const selectUserById = (state, id) => {
    const user = state.users[id]
    if (!user) return {}

    const assignedRoles = convertRolesLongToRolesMap(user.roles)

    return { ...user, roles: assignedRoles }
}

export const selectUsersByIds = (state, ids) => {
    return ids?.map(id => selectUserById(state, id))
}

export const selectTotalRoleCountByUserIds = (state, ids) => {
    return Object.values(state.users).filter(user => ids.includes(user.id)).reduce((acc, nextUser) => {
        if (nextUser.roles === 0) {
            acc.unassigned = [...acc.unassigned, nextUser.id]
            return acc
        }
        const assignedRoles = convertRolesLongToRolesMap(nextUser.roles)
        Object.entries(assignedRoles).filter(entry => entry[1] === true).forEach(([key]) => {
            const formattedKey = snakeToCamel(key)
            if (acc[formattedKey] === undefined) acc[formattedKey] = [nextUser.id]
            else acc[formattedKey] = [...acc[formattedKey], nextUser.id]
        })
        return acc
    }, { unassigned: [] })

}
