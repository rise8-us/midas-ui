import { useModuleMock } from 'Utilities/test-utils'
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

let localMockState = {}

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

describe('Validate user Roles', () => {

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
})

describe('User Access selectors', () => {

    beforeEach(() => {
        localMockState = JSON.parse(JSON.stringify(mockState))
    })

    test('should return product access false if id is null', () => {
        expect(selectors.hasProductAccess(mockState)).toBeFalsy()
    })

    test('should return product access false if user does not has access', () => {
        const mockProduct = {
            id: 9,
            ownerId: 4,
            parentId: null
        }

        selectProductByIdMock.mockReturnValue(mockProduct)

        expect(selectors.hasProductAccess(localMockState, 9)).toEqual(false)
    })

    test('should return product access true if user is product owner, (ownerId)', () => {
        localMockState = {
            ...localMockState,
            products: {
                9: {
                    id: 9,
                    personnel: {
                        ownerId: 42,
                    }
                }
            }
        }

        expect(selectors.hasProductAccess(localMockState, 9)).toEqual(true)
    })

    test('should return product access true if user is admin', () => {
        localMockState = {
            auth: {
                ...localMockState.auth,
                isAdmin: true
            },
            products: {
                9: {}
            }
        }

        expect(selectors.hasProductAccess(localMockState, 9)).toEqual(true)
    })

    test('should return true if user is portfolio lead for product', () => {
        localMockState = {
            ...localMockState,
            products: {
                9: {
                    id: 9,
                    personnel: {
                        ownerId: 4
                    },
                    portfolioId: 10
                }
            },
            portfolios: {
                10: {
                    id: 10,
                    personnel: {
                        ownerId: 42
                    }
                }
            }
        }

        expect(selectors.hasProductAccess(localMockState, 9)).toEqual(true)
    })

    test('should return team access true if user is in team', () => {
        localMockState.auth.user.teamIds = [9, 42]

        expect(selectors.hasTeamAccess(localMockState, 42)).toEqual(true)
    })

    test('should return team access false if user is in team', () => {
        localMockState.auth.user.teamIds = [9, 11]

        expect(selectors.hasTeamAccess(localMockState, 42)).toEqual(false)
    })


    test('should return product or team access false if id is null', () => {
        expect(selectors.hasProductOrTeamAccess(mockState)).toBeFalsy()
    })

    test('should return product or team true if user is on team', () => {
        localMockState.auth.user.teamIds = [9, 42]

        const mockProduct = {
            id: 10,
            personnel: {
                ownerId: 142,
                teamIds: [9]
            }
        }

        selectProductByIdMock.mockReturnValue(mockProduct)

        expect(selectors.hasProductOrTeamAccess(localMockState, 10)).toEqual(true)
    })

    test('should return product or team false if not on product or team', () => {
        localMockState.auth.user.teamIds = [17]

        const mockProduct = {
            id: 10,
            personnel: {
                ownerId: 142,
                teamIds: [9]
            }
        }

        selectProductByIdMock.mockReturnValue(mockProduct)

        expect(selectors.hasProductOrTeamAccess(localMockState, 10)).toEqual(false)
    })

})