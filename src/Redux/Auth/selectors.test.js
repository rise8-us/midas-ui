import { useModuleMock } from '../../Utilities/test-utils'
import * as selectors from './selectors'

const mockState = {
    auth: {
        user: {
            id: 42,
            username: 'yoda',
            roles: 2
        },
        isAdmin: false
    }
}

const expectedUser = {
    id: 42,
    username: 'yoda',
    roles: { ROLE1: true, ROLE2: true },
    isAdmin: false
}

const convertRolesLongToRolesMapMock = useModuleMock('Utilities/bitwise', 'convertRolesLongToRolesMap')
const selectRolesAsArrayMock = useModuleMock('Redux/AppSettings/selectors', 'selectRolesAsArray')

const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
const selectProjectByIdMock = useModuleMock('Redux/Projects/selectors', 'selectProjectById')

describe('Logged In User selectors', () => {
    beforeEach(() => {
        convertRolesLongToRolesMapMock.mockReturnValue({})
        selectRolesAsArrayMock.mockResolvedValue({})
    })

    test('should return object', () => {
        const user = selectors.selectUserLoggedIn(mockState)
        expect(user).toBeInstanceOf(Object)
    })

    test('should have data', () => {
        convertRolesLongToRolesMapMock.mockReturnValue({ ROLE1: true, ROLE2: true })

        const user = selectors.selectUserLoggedIn(mockState)
        expect(user).toEqual(expectedUser)
    })

    test('should format roles', () => {
        convertRolesLongToRolesMapMock.mockReturnValue({ ROLE: true, R2_D2: true })

        expect(selectors.selectUserPermissions(mockState)).toEqual({ isRole: true, isR2D2: true })
    })
})

describe('User Access selectors', () => {

    test('should return product access false if id is null', () => {
        expect(selectors.hasProductAccess(mockState)).toBeFalsy()
    })

    test('should return product access false if user does not has access', () => {
        const localMockState = { ...mockState }
        const mockProduct = {
            id: 9,
            productManagerId: 4,
            parentId: null
        }

        selectProductByIdMock.mockReturnValue(mockProduct)

        expect(selectors.hasProductAccess(localMockState, 9)).toEqual(false)
    })

    test('should return product access true if user has access', () => {
        const localMockState = {
            ...mockState,
            products: {
                9: {
                    id: 9,
                    productManagerId: 42,
                    parentId: null
                }
            }
        }

        expect(selectors.hasProductAccess(localMockState, 9)).toEqual(true)
    })

    test('should return product access true if user is admin', () => {
        const localMockState = {
            ...mockState,
            products: {
                9: {
                    id: 9,
                    productManagerId: 4,
                    parentId: null
                }
            }
        }
        localMockState.auth.isAdmin = true

        expect(selectors.hasProductAccess(localMockState, 9)).toEqual(true)
    })

    test('should return true if user is portfolio lead for product', () => {
        const localMockState = {
            ...mockState,
            products: {
                9: {
                    id: 9,
                    productManagerId: 4,
                    parentId: 10
                }
            },
            portfolios: {
                10: {
                    id: 10,
                    productManagerId: 42,
                    parentId: null
                }
            }
        }

        expect(selectors.hasProductAccess(localMockState, 9)).toEqual(true)
    })

    test('should return team access true if user is in team', () => {
        const localMockState = { ...mockState }
        localMockState.auth.user.teamIds = [9, 42]

        expect(selectors.hasTeamAccess(localMockState, 42)).toEqual(true)
    })

    test('should return team access false if user is in team', () => {
        const localMockState = { ...mockState }
        localMockState.auth.user.teamIds = [9, 11]

        expect(selectors.hasTeamAccess(localMockState, 42)).toEqual(false)
    })

    test('should return project access true if user is in project team', () => {
        const localMockState = { ...mockState }
        localMockState.auth.isAdmin = false
        localMockState.auth.user.teamIds = [9, 42]

        const mockProject = {
            id: 66,
            teamId: 42
        }
        const mockProduct = {
            id: 9,
            productManagerId: 4,
            parentId: null
        }

        selectProjectByIdMock.mockReturnValue(mockProject)
        selectProductByIdMock.mockReturnValue(mockProduct)

        expect(selectors.hasProjectAccess(localMockState, 66)).toEqual(true)
    })

    test('should return project access true if user is in product manager', () => {
        const localMockState = {
            ...mockState,
            products: {
                9: {
                    id: 9,
                    productManagerId: 42,
                    parentId: null
                }
            }
        }
        localMockState.auth.isAdmin = false
        localMockState.auth.user.teamIds = [9]

        const mockProject = {
            id: 66,
            teamId: 42,
            productId: 9
        }

        selectProjectByIdMock.mockReturnValue(mockProject)

        expect(selectors.hasProjectAccess(localMockState, 66)).toEqual(true)
    })

    test('should return project access true if user is admin', () => {
        const localMockState = { ...mockState }
        localMockState.auth.isAdmin = true
        localMockState.auth.user.teamIds = [9]

        const mockProject = {
            id: 66,
            teamId: 42,
            productId: 9
        }
        const mockProduct = {
            id: 9,
            productManagerId: 4,
            parentId: null
        }

        selectProjectByIdMock.mockReturnValue(mockProject)
        selectProductByIdMock.mockReturnValue(mockProduct)

        expect(selectors.hasProjectAccess(localMockState, 66)).toEqual(true)
    })

    test('should return project access false if user has no access', () => {
        const localMockState = { ...mockState }
        localMockState.auth.isAdmin = false
        localMockState.auth.user.teamIds = [9]

        const mockProject = {
            id: 66,
            teamId: 42,
            productId: 9
        }
        const mockProduct = {
            id: 9,
            productManagerId: 4,
            parentId: null
        }

        selectProjectByIdMock.mockReturnValue(mockProject)
        selectProductByIdMock.mockReturnValue(mockProduct)

        expect(selectors.hasProjectAccess(localMockState, 66)).toEqual(false)
    })

    test('should return portfolio creator false if user has no access', () => {
        convertRolesLongToRolesMapMock.mockReturnValue({ PORTFOLIO_LEAD: false })

        expect(selectors.isPortfolioCreator(mockState)).toEqual(false)
    })

    test('should return portfolio creator true if user has access', () => {
        convertRolesLongToRolesMapMock.mockReturnValue({ PORTFOLIO_LEAD: true })

        expect(selectors.isPortfolioCreator(mockState)).toEqual(true)
    })

    test('should return portfolio creator true if user is admin', () => {
        convertRolesLongToRolesMapMock.mockReturnValue({ ADMIN: true, PORTFOLIO_LEAD: false })

        expect(selectors.isPortfolioCreator(mockState)).toEqual(true)
    })

    test('should return product creator false if user has no access', () => {
        convertRolesLongToRolesMapMock.mockReturnValue({ PORTFOLIO_LEAD: false, PRODUCT_MANAGER: false })

        expect(selectors.isProductCreator(mockState)).toEqual(false)
    })

    test('should return product creator true if user has portfolio lead', () => {
        convertRolesLongToRolesMapMock.mockReturnValue({ PORTFOLIO_LEAD: true, PRODUCT_MANAGER: false })

        expect(selectors.isProductCreator(mockState)).toEqual(true)
    })

    test('should return product creator true if user has product manager', () => {
        convertRolesLongToRolesMapMock.mockReturnValue({ PORTFOLIO_LEAD: false, PRODUCT_MANAGER: true })

        expect(selectors.isProductCreator(mockState)).toEqual(true)
    })

    test('should return product creator true if user is admin', () => {
        convertRolesLongToRolesMapMock.mockReturnValue({ ADMIN: true, PORTFOLIO_LEAD: false, PRODUCT_MANAGER: false })

        expect(selectors.isProductCreator(mockState)).toEqual(true)
    })

    test('should return product or team access false if id is null', () => {
        expect(selectors.hasProductOrTeamAccess(mockState)).toBeFalsy()
    })

    test('should return product or team true if user is admin', () => {
        const localMockState = {
            ...mockState,
            products: {
                10: {
                    id: 10,
                    productManagerId: null,
                    parentId: null
                }
            }
        }
        localMockState.auth.isAdmin = true

        expect(selectors.hasProductOrTeamAccess(localMockState, 10)).toEqual(true)
    })

    test('should return product or team true if user is on team', () => {
        const localMockState = { ...mockState }
        localMockState.auth.user.teamIds = [9, 42]

        const mockProduct = {
            id: 10,
            productManagerId: 142,
            parentId: null,
            teamIds: [9]
        }

        selectProductByIdMock.mockReturnValue(mockProduct)

        expect(selectors.hasProductOrTeamAccess(localMockState, 10)).toEqual(true)
    })

    test('should return product or team false if not on product or team', () => {
        const localMockState = { ...mockState }
        localMockState.auth.isAdmin = false
        localMockState.auth.user.teamIds = [17]

        const mockProduct = {
            id: 10,
            productManagerId: 142,
            parentId: null,
            teamIds: [9]
        }

        selectProductByIdMock.mockReturnValue(mockProduct)

        expect(selectors.hasProductOrTeamAccess(localMockState, 10)).toEqual(false)
    })

})