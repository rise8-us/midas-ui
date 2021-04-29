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
