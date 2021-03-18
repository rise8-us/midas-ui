import * as bitwise from './bitwise'
import { useModuleMock } from './test-utils'

const allRolesMock = [
    {
        name: 'ROLE1',
        offset: 0
    }, {
        name: 'ROLE2',
        offset: 1
    }, {
        name: 'ROLE3',
        offset: 2
    }, {
        name: 'ROLE4',
        offset: 3
    }
]

const roleLongInput = 2

const roleMapInput = {
    ROLE1: false,
    ROLE2: true,
    ROLE3: false,
    ROLE4: true
}

const getRolesAsArrayMock = useModuleMock('Redux/AppSettings/selectors', 'getRolesAsArray')

test('should return object', () => {
    getRolesAsArrayMock.mockReturnValue(allRolesMock)

    const output = bitwise.convertRolesLongToRolesMap(roleLongInput)

    expect(output).toBeInstanceOf(Object)
})

test('should return empty object', () => {
    getRolesAsArrayMock.mockReturnValue([])

    const output = bitwise.convertRolesLongToRolesMap(roleLongInput, { })

    expect(output).toBeInstanceOf(Object)
})

test('should return data', () => {
    getRolesAsArrayMock.mockReturnValue(allRolesMock)

    const output = bitwise.convertRolesLongToRolesMap(roleLongInput)

    expect(output).toEqual({ ROLE1: false, ROLE2: true, ROLE3: false, ROLE4: true })
})

test('no App roles should return 0', () => {
    getRolesAsArrayMock.mockReturnValue([])

    const output = bitwise.convertRolesMapToLong(roleMapInput)

    expect(output).toEqual(0)
})

test('no assignedRoles should return 0', () => {
    getRolesAsArrayMock.mockReturnValue(allRolesMock)

    const output = bitwise.convertRolesMapToLong({ })

    expect(output).toEqual(0)
})

test('should return 10', () => {
    getRolesAsArrayMock.mockReturnValue(allRolesMock)

    const output = bitwise.convertRolesMapToLong(roleMapInput)

    expect(output).toEqual(10)
})