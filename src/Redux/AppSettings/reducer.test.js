import { requestFetchInit } from '../Init/actions'
import reducer, { setAssertionComment, setInitialized, setPageScrollY, setPortfolioPageSettings } from './reducer'

const mockStore = {
    assertionCommentId: null,
    assertionCommentType: null,
    assertionStatus: {},
    classification: {},
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
        reducer(mockStore, { type: setAssertionComment.type, payload: payload })
    ).toEqual({
        ...mockStore,
        assertionCommentId: 1,
        assertionCommentType: 'foo'
    })
})

test('should set setAssertionComment to null', () => {
    const payload = { assertionId: 2, deletedAssertionId: null }

    expect(
        reducer({ ...mockStore, assertionCommentId: 2 }, { type: setAssertionComment.type, payload: payload })
    ).toEqual({
        ...mockStore,
        assertionCommentId: null,
        assertionCommentType: undefined
    })
})

test('should set setAssertionComment to null on deletedAssertionId', () => {
    const payload = { assertionId: null, deletedAssertionId: 2 }

    expect(
        reducer(mockStore, { type: setAssertionComment.type, payload: payload })
    ).toEqual({
        ...mockStore,
        assertionCommentId: null,
        assertionCommentType: undefined
    })
})

test('should handle pageScrollY', () => {
    expect(
        reducer(mockStore, { type: setPageScrollY.type, payload: 42 })
    ).toEqual({
        ...mockStore,
        pageScrollY: 42
    })
})

test('should handle setInitialized', () => {
    expect(
        reducer(mockStore, { type: setInitialized.type, payload: true })
    ).toEqual({
        ...mockStore,
        initialized: true
    })
})

describe('should handle setPortfolioPageSetting', () => {
    const payload = { id: 1, selectedDeliverableId: 2 }

    test('should set selectedDeliverableId to null', () => {
        const mockState = { ...mockStore, portfolioPage: { 1: { selectedDeliverableId: 2 } } }

        expect(reducer(mockState, { type: setPortfolioPageSettings.type, payload: payload }))
            .toEqual({ ...mockStore, portfolioPage: { 1: { selectedDeliverableId: null } } })
    })

    test('should set selectedDeliverableId to 2', () => {
        expect(reducer(mockStore, { type: setPortfolioPageSettings.type, payload: payload }))
            .toEqual({ ...mockStore, portfolioPage: { 1: { selectedDeliverableId: 2 } } })
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
