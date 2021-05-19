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

const selectRolesAsArrayMock = useModuleMock('Redux/AppSettings/selectors', 'selectRolesAsArray')

test('should return object', () => {
    selectRolesAsArrayMock.mockReturnValue(allRolesMock)

    const output = bitwise.convertRolesLongToRolesMap(roleLongInput)

    expect(output).toBeInstanceOf(Object)
})

test('should return empty object', () => {
    selectRolesAsArrayMock.mockReturnValue([])

    const output = bitwise.convertRolesLongToRolesMap(roleLongInput, { })

    expect(output).toBeInstanceOf(Object)
})

test('should return data', () => {
    selectRolesAsArrayMock.mockReturnValue(allRolesMock)

    const output = bitwise.convertRolesLongToRolesMap(roleLongInput)

    expect(output).toEqual({ ROLE1: false, ROLE2: true, ROLE3: false, ROLE4: false })
})

test('no App roles should return 0', () => {
    selectRolesAsArrayMock.mockReturnValue([])

    const output = bitwise.convertRolesMapToLong(roleMapInput)

    expect(output).toEqual(0)
})

test('no assignedRoles should return 0', () => {
    selectRolesAsArrayMock.mockReturnValue(allRolesMock)

    const output = bitwise.convertRolesMapToLong({ })

    expect(output).toEqual(0)
})

test('should return 10', () => {
    selectRolesAsArrayMock.mockReturnValue(allRolesMock)

    const output = bitwise.convertRolesMapToLong(roleMapInput)

    expect(output).toEqual(10)
})