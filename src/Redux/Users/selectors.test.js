import { useModuleMock } from 'Utilities/test-utils'
import * as selectors from './selectors'

const mockState = {
    users: {
        42: {
            id: 42,
            username: 'yoda',
            roles: 2
        }
    }
}

const expectedUser = {
    id: 42,
    username: 'yoda',
    roles: { ROLE1: true, ROLE2: true }
}

const convertRolesLongToRolesMapMock = useModuleMock('Utilities/bitwise', 'convertRolesLongToRolesMap')
const selectRolesAsArrayMock = useModuleMock('Redux/AppSettings/selectors', 'selectRolesAsArray')

test('selectUserById - should return object', () => {
    convertRolesLongToRolesMapMock.mockReturnValue({})
    selectRolesAsArrayMock.mockResolvedValue({})

    const user = selectors.selectUserById(mockState, 42)
    expect(user).toBeInstanceOf(Object)
})

test('selectUserById - should return empty object', () => {
    convertRolesLongToRolesMapMock.mockReturnValue({})
    selectRolesAsArrayMock.mockResolvedValue({})

    const user = selectors.selectUserById(mockState, 43)
    expect(user).toBeInstanceOf(Object)
})

test('selectUserById - should have data', () => {
    convertRolesLongToRolesMapMock.mockReturnValue({ ROLE1: true, ROLE2: true })
    selectRolesAsArrayMock.mockResolvedValue({})

    const user = selectors.selectUserById(mockState, 42)
    expect(user).toEqual(expectedUser)
})