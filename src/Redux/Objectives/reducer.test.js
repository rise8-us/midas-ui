import * as reduxActions from './actions'
import reducer from './reducer'

const allObjectivesResponse = [
    {
        id: 1,
        name: 'Objective1'
    }, {
        id: 2,
        name: 'Objective2',
    }
]

const updatedObjective = { id: 1, name: 'foo' }

describe('Objectives Reducer', () => {

    test('fetches Assertions', () => {
        const actions = [{ type: reduxActions.requestFetchObjectives.fulfilled, payload: allObjectivesResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allObjectivesResponse[0])
        expect(state[2]).toEqual(allObjectivesResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            creation: {
                text: '',
                productId: null,
                assertionDTOs: {}
            }
        })
    })

    test('Create Objective', () => {
        const actions = [{ type: reduxActions.requestCreateObjective.fulfilled, payload: allObjectivesResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allObjectivesResponse[0] })
    })

    test('Update Objective', () => {
        const actions = [{ type: reduxActions.requestUpdateObjective.fulfilled, payload: updatedObjective }]
        const state = actions.reduce(reducer, { 1: allObjectivesResponse[0] })
        expect(state).toEqual({ 1: updatedObjective })
    })

})