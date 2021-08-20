import * as selectors from './selectors'

describe('AppSettings selectors', () => {
    const mockState = {
        app: {
            roles: {
                role1: {
                    name: 'role1',
                    description: 'foobar1'
                }
            },
            tagTypes: ['foo'],
            roadmapStatus: {
                stat1: {
                    name: 'stat1'
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

    test('should return tagTypes', () => {
        expect(selectors.selectTagTypes(mockState)).toEqual(['foo'])
    })

    test('should return roadmap status', () => {
        expect(selectors.selectRoadmapStatuses(mockState)).toEqual({ stat1: { name: 'stat1' } })
    })
})