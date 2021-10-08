import { selectProductById } from 'Redux/Products/selectors'
import { selectProjectById } from 'Redux/Projects/selectors'
import { convertRolesLongToRolesMap } from 'Utilities/bitwise'

const selectAllProductsAndPortfolios = (state) => {
    const portfolios = state.portfolios ?? {}
    const products = state.products ?? {}

    return { ...portfolios, ...products }
}

export const selectUserLoggedIn = (state) => {
    const auth = state.auth
    const assignedRoles = convertRolesLongToRolesMap(auth.user.roles)
    return {
        ...auth.user,
        roles: assignedRoles,
        isAdmin: auth.isAdmin
    }
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

export const hasProductAccess = (state, productId) => {
    if (typeof productId !== 'number') return false
    const userLoggedIn = selectUserLoggedIn(state)
    const productBeingAccessed = selectAllProductsAndPortfolios(state)[productId]

    if (typeof productBeingAccessed !== 'object') return false

    return (
        userLoggedIn.isAdmin
        || userLoggedIn.id === productBeingAccessed.ownerId
        || hasProductAccess(state, productBeingAccessed.parentId)
    )
}

export const hasProductOrTeamAccess = (state, productId) => {
    if (typeof productId !== 'number') return false

    const productBeingAccessed = selectProductById(state, productId)

    return (
        hasProductAccess(state, productId)
        || productBeingAccessed.teamIds.some(id => hasTeamAccess(state, id))
    )
}

export const hasTeamAccess = (state, teamId) => {
    const userLoggedIn = selectUserLoggedIn(state)
    return userLoggedIn.teamIds.includes(teamId)
}

export const hasProjectAccess = (state, projectId) => {
    if (typeof projectId !== 'number') return false

    const userLoggedIn = selectUserLoggedIn(state)
    const projectBeingAccessed = selectProjectById(state, projectId)

    return (
        userLoggedIn.isAdmin
        || userLoggedIn.id === projectBeingAccessed.ownerId
        || hasProductOrTeamAccess(state, projectBeingAccessed.productId)
    )
}

export const isPortfolioCreator = (state) => {
    const user = selectUserPermissions(state)

    return user.isAdmin || user.isPortfolioLead
}

export const isProductCreator = (state) => {
    const user = selectUserPermissions(state)

    return user.isAdmin || user.isPortfolioLead || user.isProductManager
}
