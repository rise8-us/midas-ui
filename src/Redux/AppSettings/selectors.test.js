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
                    view: 'foo',
                    targets: {
                        2: true,
                        allExpanded: true
                    }
                }
            },
            epicSyncProgress: {
                1: {
                    foo: 'bar'
                }
            },
            issueSyncProgress: {
                2: {
                    foo2: 'bar2'
                }
            },
            releaseSyncProgress: {
                3: {
                    foo3: 'bar3'
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
            view: 'foo',
            targets: {
                2: true,
                allExpanded: true
            }
        })
    })

    test('should return portfolioPage view setting', () => {
        expect(selectors.selectPortfolioPageSettingView(mockState, 1))
            .toEqual('foo')
    })

    test('should return portfolioPage view setting - default', () => {
        expect(selectors.selectPortfolioPageSettingView(mockState, 2)).toEqual({
            title: '6M',
            viewBy: 'month',
            scope: 6,
            leadingColumns: 2
        })
    })

    test('should return portfolioPage all targets setting - when null', () => {
        expect(selectors.selectPortfolioPageGanttAllExpanded(mockState, 2))
            .toEqual(false)
    })

    test('should return portfolioPage all targets setting', () => {
        expect(selectors.selectPortfolioPageGanttAllExpanded(mockState, 1))
            .toEqual(true)
    })

    test('should return portfolioPage target id targets setting - when null', () => {
        expect(selectors.selectPortfolioPageSettingTargetIdExpanded(mockState, 1, 3))
            .toEqual(false)
    })

    test('should return portfolioPage target id targets setting', () => {
        expect(selectors.selectPortfolioPageSettingTargetIdExpanded(mockState, 1, 2))
            .toEqual(true)
    })

    test('should return epic sync progress', () => {
        expect(selectors.selectEpicSyncProgress(mockState, 1)).toEqual({ foo: 'bar' })
    })

    test('should return issue sync progress', () => {
        expect(selectors.selectIssueSyncProgress(mockState, 2)).toEqual({ foo2: 'bar2' })
    })

    test('should return release sync progress', () => {
        expect(selectors.selectReleaseSyncProgress(mockState, 3)).toEqual({ foo3: 'bar3' })
    })

    test('should return default values for progress', () => {
        expect(selectors.selectEpicSyncProgress(mockState, -1)).toEqual({ value: 0, status: 'SYNCED' })
    })
})
