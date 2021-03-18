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
const getRolesAsArrayMock = useModuleMock('Redux/AppSettings/selectors', 'getRolesAsArray')

test('should return object', () => {
    convertRolesLongToRolesMapMock.mockReturnValue({})
    getRolesAsArrayMock.mockResolvedValue({})

    const user = selectors.getUserLoggedIn(mockState)
    expect(user).toBeInstanceOf(Object)
})

test('should have data', () => {
    convertRolesLongToRolesMapMock.mockReturnValue({ ROLE1: true, ROLE2: true })
    getRolesAsArrayMock.mockResolvedValue({})

    const user = selectors.getUserLoggedIn(mockState)
    expect(user).toEqual(expectedUser)
})
