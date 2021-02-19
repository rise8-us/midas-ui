import { useModuleMock } from '../../Utilities/test-utils'
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
const getRolesAsArrayMock = useModuleMock('Redux/Info/selectors', 'getRolesAsArray')

describe('Info Selector', () => {

    it('should return object', () => {
        convertRolesLongToRolesMapMock.mockReturnValue({})
        getRolesAsArrayMock.mockResolvedValue({})

        const user = selectors.getUserById(mockState, 42)
        expect(user).toBeInstanceOf(Object)
    })

    it('should return empty object', () => {
        convertRolesLongToRolesMapMock.mockReturnValue({})
        getRolesAsArrayMock.mockResolvedValue({})

        const user = selectors.getUserById(mockState, 43)
        expect(user).toBeInstanceOf(Object)
    })

    it('should have data', () => {
        convertRolesLongToRolesMapMock.mockReturnValue({ ROLE1: true, ROLE2: true })
        getRolesAsArrayMock.mockResolvedValue({})

        const user = selectors.getUserById(mockState, 42)
        expect(user).toEqual(expectedUser)
    })

})