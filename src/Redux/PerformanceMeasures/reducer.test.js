import * as reduxActions from './actions'
import reducer from './reducer'

const allPerformanceMeasuresResponse = [
    { id: 1 },
    {
        id: 2,
        title: 'original'
    }
]

const updatedPerformanceMeasure = { id: 2, title: 'updated' }
const deletedPerformanceMeasure = { id: 1 }

describe('PerformanceMeasures Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('fetches search PerformanceMeasures', () => {
        const actions = [{ type: reduxActions.requestSearchPerformanceMeasures.fulfilled,
            payload: allPerformanceMeasuresResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allPerformanceMeasuresResponse[0])
        expect(state[2]).toEqual(allPerformanceMeasuresResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('Updates PerformanceMeasures Bulk', () => {
        const actions = [{ type: reduxActions.requestUpdatePerformanceMeasuresBulk.fulfilled,
            payload: allPerformanceMeasuresResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allPerformanceMeasuresResponse[0])
        expect(state[2]).toEqual(allPerformanceMeasuresResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('Create PerformanceMeasure', () => {
        const actions = [{ type: reduxActions.requestCreatePerformanceMeasure.fulfilled,
            payload: allPerformanceMeasuresResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allPerformanceMeasuresResponse[0] })
    })

    test('Update PerformanceMeasure', () => {
        const actions = [{ type: reduxActions.requestUpdatePerformanceMeasure.fulfilled,
            payload: updatedPerformanceMeasure }]
        const state = actions.reduce(reducer, { 2: allPerformanceMeasuresResponse[1] })
        expect(state).toEqual({ 2: updatedPerformanceMeasure })
    })

    test('Delete PerformanceMeasure', () => {
        const actions = [{ type: reduxActions.requestDeletePerformanceMeasure.fulfilled,
            payload: deletedPerformanceMeasure }]
        const state = actions.reduce(reducer, { 1: allPerformanceMeasuresResponse[0] })
        expect(state).toEqual({})
    })
})