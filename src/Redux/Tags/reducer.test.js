import * as reduxActions from './actions'
import reducer from './reducer'

const mockStore = {
    0: {
        id: 0,
        color: '#000000',
        description: 'This is one tag',
        label: 'tag 1'
    },
    1: {
        id: 1,
        color: '#FFFFFF',
        description: 'This is another tag',
        label: 'Tag 2'
    }
}

const newTag = {
    color: '#000000',
    description: 'This is a new one',
    label: 'tag 3'
}

test('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
})

test('fetches all tags', () => {
    const actions = [{ type: reduxActions.requestFetchAllTags.fulfilled, payload: [
        {
            id: 0,
            color: '#000000',
            description: 'This is one tag',
            label: 'tag 1'
        }, {
            id: 1,
            color: '#FFFFFF',
            description: 'This is another tag',
            label: 'Tag 2'
        }
    ] }]
    const state = actions.reduce(reducer, {})

    expect(state).toEqual(mockStore)
    expect(Object.keys(state)).toHaveLength(2)
})

test('should create tag', () => {
    const response = {
        id: 3,
        ...newTag
    }

    const actions = [{ type: reduxActions.requestCreateTag.fulfilled, payload: response }]
    const state = actions.reduce(reducer, mockStore)

    expect(state[3]).toEqual(response)
})

test('should update tag', () => {
    const response = {
        id: 0,
        ...newTag
    }

    const actions = [{ type: reduxActions.requestUpdateTag.fulfilled, payload: response }]
    const state = actions.reduce(reducer, mockStore)

    expect(state[0]).toEqual(response)
})

test('should delete tag from state', () => {

    const actions = [{ type: reduxActions.requestDeleteTag.fulfilled, payload: { id: 0 } }]
    const state = actions.reduce(reducer, mockStore)

    expect(state).toEqual({
        1: {
            id: 1,
            color: '#FFFFFF',
            description: 'This is another tag',
            label: 'Tag 2'
        }
    })
})
