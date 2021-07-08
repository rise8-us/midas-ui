import * as reduxActions from './actions'
import reducer from './reducer'

const allBlockedAssertionsResponse = [
    {
        id: 1,
        parentId: null,
        name: 'portfolio',
        assertion: {},
        comment: {}
    }, {
        id: 2,
        parentId: 1,
        name: 'product',
        assertion: {},
        comment: {}
    }
]

describe('BlockedAssertions Reducer', () => {

    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual([])
    })

    test('should put all blocked assertions in state', () => {
        const actions = [
            { type: reduxActions.requestFetchAllBlockedAssertions.fulfilled, payload: allBlockedAssertionsResponse }
        ]

        expect(actions.reduce(reducer, {})).toHaveLength(2)
    })

})