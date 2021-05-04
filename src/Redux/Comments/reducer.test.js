import * as reduxActions from './actions'
import reducer from './reducer'

const comments = [
    {
        id: 2,
        text: 'string',
        parentId: 1,
        assertionId: 34
    }, {
        id: 2,
        text: 'new string',
        parentId: 1,
        assertionId: 34
    }
]

describe('Comments Reducer', () => {
    it('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    it('Searchs Comment', () => {
        const actions = [{ type: reduxActions.requestSearchComments.fulfilled, payload: [comments[0]] }]
        const state = actions.reduce(reducer, {})
        expect(state[2]).toEqual(comments[0])
    })

    it('Create Comment', () => {
        const actions = [{ type: reduxActions.requestCreateComment.fulfilled, payload: comments[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 2: comments[0] })
    })

    it('Update Comment', () => {
        const actions = [{ type: reduxActions.requestUpdateComment.fulfilled, payload: comments[1] }]
        const state = actions.reduce(reducer, { 2: comments[0] })
        expect(state).toEqual({ 2: comments[1] })
    })

    it('Delete Comment', () => {
        const actions = [{ type: reduxActions.requestDeleteComment.fulfilled, payload: comments[1] }]
        const state = actions.reduce(reducer, { 2: comments[0] })
        expect(state).toEqual({ })
    })

})