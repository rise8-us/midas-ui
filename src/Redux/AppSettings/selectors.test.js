import * as selectors from './selectors'

describe('AppSettings selectors', () => {
    const emptyState = { app: { portfolioPage: { } } }
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
            portfolioPage: {
                1: {
                    selectedDeliverableId: 2,
                    view: 'foo'
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

    test('should return portfolioPage settings - empty ', () => {
        expect(selectors.selectPortfolioPageSettings(emptyState, 1)).toEqual({ selectedDeliverableId: null })
    })

    test('should return portfolioPage settings', () => {
        expect(selectors.selectPortfolioPageSettings(mockState, 1)).toEqual({
            selectedDeliverableId: 2,
            view: 'foo'
        })
    })

    test('should return portfolioPage view setting', () => {
        expect(selectors.selectPortfolioPageViewSetting(mockState, 1))
            .toEqual('foo')
    })

    test('should return portfolioPage view setting - default', () => {
        expect(selectors.selectPortfolioPageViewSetting(mockState, 2)).toEqual({
            title: '6M',
            viewBy: 'month',
            scope: 6,
            leadingColumns: 2
        })
    })
})