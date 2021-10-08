import * as reduxActions from './actions'
import reducer from './reducer'

const allReleasesResponse = [
    { id: 1 },
    {
        id: 2,
        title: 'original',
        isArchived: false
    }
]

const updatedRelease = { id: 2, title: 'updated', isArchived: false }
const deletedRelease = { id: 1 }

describe('Releases Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('fetches search Releases', () => {
        const actions = [{ type: reduxActions.requestSearchReleases.fulfilled,
            payload: allReleasesResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allReleasesResponse[0])
        expect(state[2]).toEqual(allReleasesResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('Create Release', () => {
        const actions = [{ type: reduxActions.requestCreateRelease.fulfilled,
            payload: allReleasesResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allReleasesResponse[0] })
    })

    test('Update Release', () => {
        const actions = [{ type: reduxActions.requestUpdateRelease.fulfilled,
            payload: updatedRelease }]
        const state = actions.reduce(reducer, { 2: allReleasesResponse[1] })
        expect(state).toEqual({ 2: updatedRelease })
    })

    test('Delete Release', () => {
        const actions = [{ type: reduxActions.requestDeleteRelease.fulfilled,
            payload: deletedRelease }]
        const state = actions.reduce(reducer, { 1: allReleasesResponse[0] })
        expect(state).toEqual({})
    })
})