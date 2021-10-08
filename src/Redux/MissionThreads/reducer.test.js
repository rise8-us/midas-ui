import * as reduxActions from './actions'
import reducer from './reducer'

const allMissionThreadsResponse = [
    { id: 1 },
    {
        id: 2,
        title: 'original'
    }
]

const updatedMissionThread = { id: 2, title: 'updated' }
const deletedMissionThread = { id: 1 }

describe('MissionThreads Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('fetches search MissionThreads', () => {
        const actions = [{ type: reduxActions.requestSearchMissionThreads.fulfilled,
            payload: allMissionThreadsResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allMissionThreadsResponse[0])
        expect(state[2]).toEqual(allMissionThreadsResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('Create MissionThread', () => {
        const actions = [{ type: reduxActions.requestCreateMissionThread.fulfilled,
            payload: allMissionThreadsResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allMissionThreadsResponse[0] })
    })

    test('Update MissionThread', () => {
        const actions = [{ type: reduxActions.requestUpdateMissionThread.fulfilled,
            payload: updatedMissionThread }]
        const state = actions.reduce(reducer, { 2: allMissionThreadsResponse[1] })
        expect(state).toEqual({ 2: updatedMissionThread })
    })

    test('Delete MissionThread', () => {
        const actions = [{ type: reduxActions.requestDeleteMissionThread.fulfilled,
            payload: deletedMissionThread }]
        const state = actions.reduce(reducer, { 1: allMissionThreadsResponse[0] })
        expect(state).toEqual({})
    })
})