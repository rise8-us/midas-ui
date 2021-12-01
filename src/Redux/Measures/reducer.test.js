import * as reduxActions from './actions'
import reducer from './reducer'

const allMeasuresResponse = [
    {
        description: 'description1',
        id: 1,
        index: 0,
        assertionId: 3,
        title: 'Measure1',
    }, {
        description: 'description2',
        id: 2,
        index: 1,
        assertionId: 3,
        title: 'Measure2',
    }
]

const updatedMeasure = {
    description: 'description2',
    id: 2,
    index: 2,
    assertionId: 3,
    title: 'Measure2',
}

const deleteMeasure = { id: 1 }

describe('Measures Reducer', () => {

    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('Searches Measure', () => {
        const actions = [{ type: reduxActions.requestSearchMeasures.fulfilled, payload: [allMeasuresResponse[0]] }]
        const state = actions.reduce(reducer, {})
        expect(state[1]).toEqual(allMeasuresResponse[0])
    })

    test('Create Measure', () => {
        const actions = [{ type: reduxActions.requestCreateMeasure.fulfilled, payload: allMeasuresResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allMeasuresResponse[0] })
    })

    test('Update Measure', () => {
        const actions = [{ type: reduxActions.requestUpdateMeasure.fulfilled, payload: updatedMeasure }]
        const state = actions.reduce(reducer, { 2: allMeasuresResponse[1] })
        expect(state).toEqual({ 2: updatedMeasure })
    })

    test('Delete Measure', () => {
        const actions = [{ type: reduxActions.requestDeleteMeasure.fulfilled, payload: deleteMeasure }]
        const state = actions.reduce(reducer, { 1: allMeasuresResponse[0] })
        expect(state).toEqual({})
    })

})