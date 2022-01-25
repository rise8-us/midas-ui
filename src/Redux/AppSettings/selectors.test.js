import * as selectors from './selectors'

describe('AppSettings selectors', () => {
    const emptyState = { app: { capabilityPage: { selectedDeliverableId: null } } }
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
            },
            roadmapTypes: {
                rType: {
                    name: 'rType'
                }
            },
            assertionStatus: {
                aStatus: {
                    name: 'aStatus'
                }
            },
            completionType: {
                cType: {
                    name: 'cType'
                }
            },
            capabilityPage: {
                selectedDeliverableId: 2
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

    test('should return roadmap type', () => {
        expect(selectors.selectRoadmapTypes(mockState)).toEqual({ rType: { name: 'rType' } })
    })

    test('should return assertionStatuses', () => {
        expect(selectors.selectAssertionStatuses(mockState)).toEqual({ aStatus: { name: 'aStatus' } })
    })

    test('should return object with assertion comment info', () => {
        expect(selectors.selectAssertionCommentInfo(mockState)).toEqual({ id: undefined, type: undefined })
    })

    test('should return empty object', () => {
        expect(selectors.selectCompletionTypes(emptyState)).toEqual({})
    })

    test('should return object', () => {
        expect(selectors.selectCompletionTypes(mockState)).toEqual({ cType: { name: 'cType' } })
    })

    test('should return capabiltyPage settings', () => {
        expect(selectors.selectCapabilityPageSettings(mockState)).toEqual({ selectedDeliverableId: 2 })
    })
})