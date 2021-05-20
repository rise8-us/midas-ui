import { requestFetchInit } from '../Init/actions'
import reducer, { setAssertionComment, toggleNavBar } from './reducer'

const mockStore = {
    navBarOpen: false,
    assertionCommentsOpen: 2,
    roles: {},
    classification: {},
    projectJourneyMap: {},
    assertionStatus: {}
}

test('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        navBarOpen: true,
        assertionCommentsOpen: null,
        classification: {},
        roles: {},
        projectJourneyMap: {},
        assertionStatus: {}
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
        assertionStatus: [{ name: 'foo' }],
    }

    const actions = [{ type: requestFetchInit.fulfilled, payload: initResponse }]
    const state = actions.reduce(reducer, mockStore)

    expect(state.classification).toEqual(initResponse.classification)
    expect(state.roles.ADMIN).toEqual(initResponse.roles[0])
    expect(state.projectJourneyMap.foo).toEqual(initResponse.projectJourneyMap[0])
    expect(state.assertionStatus.foo).toEqual(initResponse.assertionStatus[0])
})
