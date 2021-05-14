import * as reduxActions from './actions'
import reducer from './reducer'

const allAssertionsResponse = [
    {
        id: 1,
        text: 'Assertion1',
        children: []
    }, {
        id: 2,
        text: 'Assertion2',
        children: [{ id: 3 }]
    }
]

const updatedAssertion = { id: 1, name: 'foo', children: [{ id: 4, children: [] }] }

describe('Assertions Reducer', () => {

    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('should searches Assertions', () => {
        const actions = [{ type: reduxActions.requestSearchAssertions.fulfilled, payload: allAssertionsResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allAssertionsResponse[0])
        expect(state[2]).toEqual({ ...allAssertionsResponse[1], children: [3] })
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('create assertions should walk children', () => {
        const actions = [{ type: reduxActions.requestCreateAssertion.fulfilled, payload: allAssertionsResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allAssertionsResponse[0] })
    })

    test('update assertion should walk children', () => {
        const actions = [{ type: reduxActions.requestUpdateAssertion.fulfilled, payload: updatedAssertion }]
        const state = actions.reduce(reducer, { 1: allAssertionsResponse[0] })
        expect(state).toEqual({
            1: { ...updatedAssertion, children: [4] },
            4: { id: 4, children: [] }
        })
    })

})