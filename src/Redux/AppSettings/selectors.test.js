import * as selectors from './selectors'

const mockState = {
    app: {
        roles: {
            role1: {
                name: 'role1',
                description: 'foobar1'
            }
        }
    }
}

test('should return object', () => {
    const roles = selectors.selectRoles(mockState)
    expect(roles).toBeInstanceOf(Object)
})

test('should return array', () => {
    const roles = selectors.selectRolesAsArray(mockState)
    expect(roles).toBeInstanceOf(Array)
})

test('should return empty array', () => {
    const roles = selectors.selectRolesAsArray({ app: { roles: { } } })
    expect(roles).toBeInstanceOf(Array)
})