import * as reduxActions from './actions'
import reducer from './reducer'

const allEpicsResponse = [
    { id: 1 },
    {
        id: 2,
        title: 'original',
        isHidden: false
    }
]

const syncedEpic = { id: 1, title: 'synced' }
const hiddenEpic = { id: 2, isHidden: true }

describe('Epics Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('fetches all Epics', () => {
        const actions = [{ type: reduxActions.requestFetchEpicsByProductId.fulfilled, payload: allEpicsResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allEpicsResponse[0])
        expect(state[2]).toEqual(allEpicsResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('Sync Epics', () => {
        const actions = [{ type: reduxActions.requestSyncEpicsByProductId.fulfilled, payload: [syncedEpic] }]
        const state = actions.reduce(reducer, { 1: allEpicsResponse[0] })
        expect(state).toEqual({ 1: { id: 1, title: 'synced' } })
    })

    test('Hide Epic', () => {
        const actions = [{ type: reduxActions.requestHideEpic.fulfilled, payload: hiddenEpic }]
        const state = actions.reduce(reducer, { 2: allEpicsResponse[1] })
        expect(state).toEqual({ 2: hiddenEpic })
    })
})