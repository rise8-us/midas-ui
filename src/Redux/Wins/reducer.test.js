import * as reduxActions from './actions'
import reducer from './reducer'

const allWinsResponse = [
    {
        id: 4,
        title: 'Midas Win',
        description: null,
        dueDate: '2022-04-30',
        portfolioId: 1
    },
    {
        id: 5,
        title: 'Something Win',
        description: 'Something Win',
        dueDate: '2022-03-31',
        portfolioId: 1
    },
    {
        id: 6,
        title: 'Something Win 2',
        description: 'Something Win 2',
        dueDate: '2022-03-31',
        portfolioId: 2
    },
]

const updatedWin = { id: 4, title: 'updated' }
const deletedWin = { id: 6 }

describe('Wins Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('fetches all Wins by Search', () => {
        const actions = [{ type: reduxActions.requestSearchWins.fulfilled, payload: allWinsResponse }]
        const state = actions.reduce(reducer, {})

        expect(Object.keys(state)).toHaveLength(3)
    })

    test('Create Win', () => {
        const actions = [{ type: reduxActions.requestCreateWin.fulfilled,
            payload: allWinsResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 4: allWinsResponse[0] })
    })

    test('Update Win', () => {
        const actions = [{ type: reduxActions.requestUpdateWin.fulfilled,
            payload: updatedWin }]
        const state = actions.reduce(reducer, { 4: allWinsResponse[1] })
        expect(state).toEqual({ 4: updatedWin })
    })

    test('Delete Win', () => {
        const actions = [{ type: reduxActions.requestDeleteWin.fulfilled,
            payload: deletedWin }]
        const state = actions.reduce(reducer, { 6: allWinsResponse[2] })
        expect(state).toEqual({})
    })
})