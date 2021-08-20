import { requestFetchInit } from '../Init/actions'
import reducer, { setAssertionComment, setPageScrollY, toggleNavBar } from './reducer'

const mockStore = {
    assertionCommentsOpen: 2,
    assertionStatus: {},
    classification: {},
    navBarOpen: false,
    pageScrollY: 0,
    projectJourneyMap: {},
    roadmapStatus: {},
    roles: {},
    sonarqubeMaintainability: {},
    sonarqubeReliability: {},
    sonarqubeSecurity: {},
    tagTypes: [],
}

test('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        assertionCommentsOpen: null,
        assertionStatus: {},
        classification: {},
        navBarOpen: true,
        projectJourneyMap: {},
        roadmapStatus: {},
        roles: {},
        sonarqubeMaintainability: {},
        sonarqubeReliability: {},
        sonarqubeSecurity: {},
        tagTypes: [],
        pageScrollY: 0,
    })
})

test('should handle setAssertionComment', () => {
    expect(
        reducer(mockStore, { type: setAssertionComment.type, payload: 1 })
    ).toEqual({
        ...mockStore,
        assertionCommentsOpen: 1
    })
})

test('should set setAssertionComment to null', () => {
    expect(
        reducer(mockStore, { type: setAssertionComment.type, payload: 2 })
    ).toEqual({
        ...mockStore,
        assertionCommentsOpen: null
    })
})

test('should handle toggleNavBar', () => {
    expect(
        reducer(mockStore, { type: toggleNavBar.type, payload: {} })
    ).toEqual({
        ...mockStore,
        navBarOpen: true
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
        roadmapStatus: [{ name: 'food' }]
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
})
