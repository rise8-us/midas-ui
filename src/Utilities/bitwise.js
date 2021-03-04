import { getRolesAsArray } from '../Redux/Info/selectors'
import store from '../Redux/store'

export const convertRolesLongToRolesMap = (userRolesLong) => {
    const allRoles = getRolesAsArray(store.getState())

    if (Object.keys(allRoles).length === 0) return { }
    const longAsBit = userRolesLong.toString(2)
    return allRoles.map(role => {
        const permissionBit = Math.pow(2, role.offset).toString(2)
        return { [role.name]: Boolean(permissionBit & longAsBit) }
    }).reduce((roles, role) => {
        return { ...roles, ...role }
    })
}

export const convertRolesMapToLong = (userRolesMap) => {
    const allRoles = getRolesAsArray(store.getState())

    if (Object.keys(allRoles).length === 0 || Object.keys(userRolesMap).length === 0) return 0

    return Object.entries(userRolesMap).map(userRole => {
        const role = userRole[0]
        const roleAssigned = userRole[1]
        if (roleAssigned) return Math.pow(2, allRoles.filter(r => r.name === role)[0].offset)
        else return 0
    }).reduce((accumulator, item) => accumulator + item)
}