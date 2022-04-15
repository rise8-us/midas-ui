import * as reduxActions from './actions'
import reducer from './reducer'

const allTargetsResponse = [
    {
        id: 4,
        title: 'Midas Target',
        description: null,
        startDate: '2022-04-01',
        dueDate: '2022-04-30',
        portfolioId: 1
    },
    {
        id: 5,
        title: 'Something Target',
        description: 'Something Target',
        startDate: '2022-03-01',
        dueDate: '2022-03-31',
        portfolioId: 1
    },
    {
        id: 6,
        title: 'Something Target 2',
        description: 'Something Target 2',
        startDate: '2022-03-01',
        dueDate: '2022-03-31',
        portfolioId: 2
    },
]

const updatedTarget = { id: 4, title: 'updated' }
const deletedTarget = { id: 6 }

describe('Targets Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('fetches all Targets by Search', () => {
        const actions = [{ type: reduxActions.requestSearchTargets.fulfilled, payload: allTargetsResponse }]
        const state = actions.reduce(reducer, {})

        expect(Object.keys(state)).toHaveLength(3)
    })

    test('Create Target', () => {
        const actions = [{ type: reduxActions.requestCreateTarget.fulfilled,
            payload: allTargetsResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 4: allTargetsResponse[0] })
    })

    test('Update Target', () => {
        const actions = [{ type: reduxActions.requestUpdateTarget.fulfilled,
            payload: updatedTarget }]
        const state = actions.reduce(reducer, { 4: allTargetsResponse[1] })
        expect(state).toEqual({ 4: updatedTarget })
    })

    test('Delete Target', () => {
        const actions = [{ type: reduxActions.requestDeleteTarget.fulfilled,
            payload: deletedTarget }]
        const state = actions.reduce(reducer, { 6: allTargetsResponse[2] })
        expect(state).toEqual({})
    })
})