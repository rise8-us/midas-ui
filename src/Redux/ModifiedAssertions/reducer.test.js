import reducer, { deleteAssertion, modifyAssertion } from './reducer'

describe('ModifiedAssertions Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('should handle modifyAssertion', () => {
        const state = reducer(
            undefined,
            { type: modifyAssertion.type, payload: { linkKey: 'foo' } }
        )

        expect(state).toEqual({ foo: { linkKey: 'foo' } })
    })

    test('should handle deleteAssertion', () => {
        const state = reducer(
            { foo: { linkKey: 'foo' } },
            { type: deleteAssertion.type, payload: 'foo' }
        )

        expect(state).toEqual({})
    })

})