import * as reduxActions from './actions'
import reducer from './reducer'

const allReleasesResponse = [
    {
        id: 1,
        name: 'release',
    }
]

describe('Releases Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('handle requestSearchReleases', () => {
        const actions = [{ type: reduxActions.requestSearchReleases.fulfilled, payload: allReleasesResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allReleasesResponse[0])
        expect(Object.keys(state)).toHaveLength(1)
    })

    test('handle fetchReleasesByProductId', () => {
        const actions = [{ type: reduxActions.fetchReleasesByProductId.fulfilled, payload: allReleasesResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allReleasesResponse[0])
        expect(Object.keys(state)).toHaveLength(1)
    })

})