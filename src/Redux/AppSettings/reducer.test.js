import { requestFetchInit } from '../Init/actions'
import reducer, { toggleNavBarOpen } from './reducer'

const mockStore = {
    navBarOpen: false,
    roles: {},
    classification: {}
}

test('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        navBarOpen: false,
        classification: {},
        roles: {}
    })
})

test('should handle toggleNavBarOpen', () => {
    expect(
        reducer(mockStore, { type: toggleNavBarOpen.type, payload: {} })
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
        }
    }

    const actions = [{ type: requestFetchInit.fulfilled, payload: initResponse }]
    const state = actions.reduce(reducer, mockStore)

    expect(state.classification).toEqual(initResponse.classification)
    expect(state.roles.ADMIN).toEqual(initResponse.roles[0])
})
