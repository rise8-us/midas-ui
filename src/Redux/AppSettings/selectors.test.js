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

it('should return object', () => {
    const roles = selectors.selectRoles(mockState)
    expect(roles).toBeInstanceOf(Object)
})

it('should return array', () => {
    const roles = selectors.selectRolesAsArray(mockState)
    expect(roles).toBeInstanceOf(Array)
})

it('should return empty array', () => {
    const roles = selectors.selectRolesAsArray({ app: { roles: { } } })
    expect(roles).toBeInstanceOf(Array)
})