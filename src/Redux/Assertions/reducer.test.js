import * as reduxActions from './actions'
import reducer from './reducer'

const allAssertionsResponse = [
    {
        id: 1,
        text: 'Assertion1'
    }, {
        id: 2,
        text: 'Assertion2'
    }
]

const updatedAssertion = { id: 1, name: 'foo' }

describe('Assertions Reducer', () => {

    test('fetches Assertions', () => {
        const actions = [{ type: reduxActions.requestFetchAssertions.fulfilled, payload: allAssertionsResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allAssertionsResponse[0])
        expect(state[2]).toEqual(allAssertionsResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('Create Assertion', () => {
        const actions = [{ type: reduxActions.requestCreateAssertion.fulfilled, payload: allAssertionsResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allAssertionsResponse[0] })
    })

    test('Update Assertion', () => {
        const actions = [{ type: reduxActions.requestUpdateAssertion.fulfilled, payload: updatedAssertion }]
        const state = actions.reduce(reducer, { 1: allAssertionsResponse[0] })
        expect(state).toEqual({ 1: updatedAssertion })
    })

})