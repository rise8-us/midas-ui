import { selectRolesAsArray } from 'Redux/AppSettings/selectors'
import store from 'Redux/store'

export const convertRolesLongToRolesMap = (userRolesLong) => {
    const allRoles = selectRolesAsArray(store.getState())

    if (Object.keys(allRoles).length === 0) return { }
    return allRoles.map(role => {
        return { [role.name]: Boolean(Math.pow(2, role.offset) & userRolesLong) }
    }).reduce((roles, role) => {
        return { ...roles, ...role }
    })
}

export const convertRolesMapToLong = (userRolesMap) => {
    const allRoles = selectRolesAsArray(store.getState())

    if (Object.keys(allRoles).length === 0 || Object.keys(userRolesMap).length === 0) return 0

    return Object.entries(userRolesMap).map(userRole => {
        const role = userRole[0]
        const roleAssigned = userRole[1]
        if (roleAssigned) return Math.pow(2, allRoles.filter(r => r.name === role)[0].offset)
        else return 0
    }).reduce((accumulator, item) => accumulator + item)
}
