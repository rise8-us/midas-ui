import { requestFetchInit } from '../Init/actions'
import reducer, * as setters from './reducer'

const mockStore = {
    assertionCommentId: null,
    assertionCommentType: null,
    assertionStatus: {},
    classification: {},
    epicSyncProgress: {},
    issueSyncProgress: {},
    releaseSyncProgress: {},
    pageScrollY: 0,
    projectJourneyMap: {},
    roadmapStatus: {},
    roadmapTypes: {},
    completionType: {},
    feedbackRating: {},
    roles: {},
    sonarqubeMaintainability: {},
    sonarqubeReliability: {},
    sonarqubeSecurity: {},
    tagTypes: [],
    initialized: false,
    portfolioPage: {}
}

test('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual(mockStore)
})

test('should handle setAssertionComment', () => {
    const payload = { type: 'foo', assertionId: 1, deletedAssertionId: null }

    expect(
        reducer(mockStore, { type: setters.setAssertionComment.type, payload: payload })
    ).toEqual({
        ...mockStore,
        assertionCommentId: 1,
        assertionCommentType: 'foo'
    })
})

test('should set setAssertionComment to null', () => {
    const payload = { assertionId: 2, deletedAssertionId: null }

    expect(
        reducer({ ...mockStore, assertionCommentId: 2 }, { type: setters.setAssertionComment.type, payload: payload })
    ).toEqual({
        ...mockStore,
        assertionCommentId: null,
        assertionCommentType: undefined
    })
})

test('should set setAssertionComment to null on deletedAssertionId', () => {
    const payload = { assertionId: null, deletedAssertionId: 2 }

    expect(
        reducer(mockStore, { type: setters.setAssertionComment.type, payload: payload })
    ).toEqual({
        ...mockStore,
        assertionCommentId: null,
        assertionCommentType: undefined
    })
})

test('should setEpicSyncProgress', () => {
    const payload = { id: 1, value: .5 }

    expect(
        reducer(mockStore, { type: setters.setEpicSyncProgress.type, payload: payload })
    ).toEqual({
        ...mockStore,
        epicSyncProgress: { 1: { id: 1, value: .5 } }
    })
})

test('should setIssueSyncProgress', () => {
    const payload = { id: 2, value: .6 }

    expect(
        reducer(mockStore, { type: setters.setIssueSyncProgress.type, payload: payload })
    ).toEqual({
        ...mockStore,
        issueSyncProgress: { 2: { id: 2, value: .6 } }
    })
})

test('should setReleaseSyncProgress', () => {
    const payload = { id: 3, value: .7 }

    expect(
        reducer(mockStore, { type: setters.setReleaseSyncProgress.type, payload: payload })
    ).toEqual({
        ...mockStore,
        releaseSyncProgress: { 3: { id: 3, value: .7 } }
    })
})

test('should handle pageScrollY', () => {
    expect(
        reducer(mockStore, { type: setters.setPageScrollY.type, payload: 42 })
    ).toEqual({
        ...mockStore,
        pageScrollY: 42
    })
})

test('should handle setInitialized', () => {
    expect(
        reducer(mockStore, { type: setters.setInitialized.type, payload: true })
    ).toEqual({
        ...mockStore,
        initialized: true
    })
})

describe('should handle setPortfolioPageSettings', () => {
    const payload = { id: 1, selectedDeliverableId: 2 }

    test('should set selectedDeliverableId to null', () => {
        const mockState = { ...mockStore, portfolioPage: { 1: { selectedDeliverableId: 2 } } }

        expect(reducer(mockState, { type: setters.setPortfolioPageSettings.type, payload: payload }))
            .toEqual({ ...mockStore, portfolioPage: { 1: { selectedDeliverableId: null } } })
    })

    test('should set selectedDeliverableId to 2', () => {
        expect(reducer(mockStore, { type: setters.setPortfolioPageSettings.type, payload: payload }))
            .toEqual({ ...mockStore, portfolioPage: { 1: { selectedDeliverableId: 2 } } })
    })
})

test('should handle setPortfolioPageSetting (singular) - with existing state', () => {
    const payload = { id: 1, settingName: 'isExpanded', settingValue: false }
    const mockState = { ...mockStore, portfolioPage: { 1: { selectedDeliverableId: 2 } } }

    expect(reducer(mockState, { type: setters.setPortfolioPageSetting.type, payload: payload }))
        .toEqual({ ...mockStore, portfolioPage: { 1: { selectedDeliverableId: 2, isExpanded: false } } })
})

test('should handle setPortfolioPageSetting (singular) - with no state', () => {
    const payload = { id: 1, settingName: 'foo', settingValue: 'bar' }
    const mockState = { ...mockStore, portfolioPage: { 10: { selectedDeliverableId: 2 } } }

    expect(reducer(mockState, { type: setters.setPortfolioPageSetting.type, payload: payload }))
        .toEqual({ ...mockStore,
            portfolioPage: {
                1: { foo: 'bar' },
                10: { selectedDeliverableId: 2 }
            }
        })
})

describe('should handle setPortfolioSettingExpandAll', () => {
    const payload = { portfolioId: 1, isExpanded: true }

    test('should set allExpanded to true', () => {
        const mockState = { ...mockStore, portfolioPage: { 1: { expanded: { allExpanded: false, 2: false } } } }

        expect(reducer(mockState, { type: setters.setPortfolioPageSettingExpandAll.type, payload: payload }))
            .toEqual({ ...mockStore, portfolioPage: { 1: { expanded: { allExpanded: true, 2: true } } } })
    })

    test('should set allExpanded to false', () => {
        expect(reducer(mockStore, {
            type: setters.setPortfolioPageSettingExpandAll.type,
            payload: { portfolioId: 1, isExpanded: false }
        }))
            .toEqual({ ...mockStore, portfolioPage: { 1: { expanded: { allExpanded: false } } } })
    })
})

describe('should handle setPortfolioSettingTargetIdExpand', () => {
    const mockState = {
        ...mockStore,
        portfolioPage: { 1: { expanded: { allExpanded: false, 2: false, 3: true } } }
    }

    test('should set target id expanded to false', () => {
        expect(reducer(mockState, {
            type: setters.setPortfolioPageSettingTargetIdExpand.type,
            payload: { portfolioId: 1, id: 3, isExpanded: false }
        }))
            .toEqual({ ...mockState, portfolioPage: { 1: { expanded: { allExpanded: false, 2: false, 3: false } } } })
    })

    test('should set everything to true', () => {
        expect(reducer(mockState, {
            type: setters.setPortfolioPageSettingTargetIdExpand.type,
            payload: { portfolioId: 1, id: 2, isExpanded: true }
        }))
            .toEqual({ ...mockState, portfolioPage: { 1: { expanded: { allExpanded: true, 2: true, 3: true } } } })
    })
})

test('sets init info', () => {
    const initResponse = {
        roles: [{
            name: 'ADMIN'
        }],
        classification: {
            backgroundColor: 'purple',
            textColor: 'white',
            label: 'UNCLASSIFIED',
            caveats: 'IL2'
        },
        projectJourneyMap: [{
            name: 'foo'
        }],
        assertionStatus: [{ name: 'foo0' }],
        sonarqubeReliability: [{ name: 'foo1' }],
        sonarqubeMaintainability: [{ name: 'foo2' }],
        sonarqubeSecurity: [{ name: 'foo3' }],
        tagTypes: ['foo', 'bar'],
        roadmapStatus: [{ name: 'food' }],
        roadmapType: [{ name: 'bard' }],
        completionType: [{ name: 'rogue' }],
        feedbackRating: [{ name: 'monk' }]
    }

    const actions = [{ type: requestFetchInit.fulfilled, payload: initResponse }]
    const state = actions.reduce(reducer, mockStore)

    expect(state.classification).toEqual(initResponse.classification)
    expect(state.roles.ADMIN).toEqual(initResponse.roles[0])
    expect(state.projectJourneyMap.foo).toEqual(initResponse.projectJourneyMap[0])
    expect(state.assertionStatus.foo0).toEqual(initResponse.assertionStatus[0])
    expect(state.sonarqubeReliability.foo1).toEqual(initResponse.sonarqubeReliability[0])
    expect(state.sonarqubeMaintainability.foo2).toEqual(initResponse.sonarqubeMaintainability[0])
    expect(state.sonarqubeSecurity.foo3).toEqual(initResponse.sonarqubeSecurity[0])
    expect(state.tagTypes).toEqual(['foo', 'bar'])
    expect(state.roadmapStatus.food).toEqual(initResponse.roadmapStatus[0])
    expect(state.roadmapTypes.bard).toEqual(initResponse.roadmapType[0])
    expect(state.completionType.rogue).toEqual(initResponse.completionType[0])
    expect(state.feedbackRating.monk).toEqual(initResponse.feedbackRating[0])
})
