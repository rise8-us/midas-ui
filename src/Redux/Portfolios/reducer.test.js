import * as reduxActions from './actions'
import reducer from './reducer'

const allPortfoliosResponse = [
    {
        id: 1,
        name: 'Portfolio1',
        isArchived: false
    }, {
        id: 2,
        name: 'Portfolio2',
    }
]

const updatedPortfolio = { id: 1, name: 'foo' }
const archivePortfolio = { id: 1, isArchived: true }

describe('Portfolios Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('fetches all Portfolios', () => {
        const actions = [{ type: reduxActions.requestFetchAllPortfolios.fulfilled, payload: allPortfoliosResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allPortfoliosResponse[0])
        expect(state[2]).toEqual(allPortfoliosResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('Create Portfolio', () => {
        const actions = [{ type: reduxActions.requestCreatePortfolio.fulfilled, payload: allPortfoliosResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allPortfoliosResponse[0] })
    })

    test('Update Portfolio', () => {
        const actions = [{ type: reduxActions.requestUpdatePortfolio.fulfilled, payload: updatedPortfolio }]
        const state = actions.reduce(reducer, { 1: allPortfoliosResponse[0] })
        expect(state).toEqual({ 1: updatedPortfolio })
    })

    test('Archive Portfolio', () => {
        const actions = [{ type: reduxActions.requestArchivePortfolio.fulfilled, payload: archivePortfolio }]
        const state = actions.reduce(reducer, { 1: allPortfoliosResponse[0] })
        expect(state).toEqual({ 1: archivePortfolio })
    })

    test('searches for portfolios', () => {
        const actions = [{ type: reduxActions.requestSearchPortfolio.fulfilled, payload: allPortfoliosResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allPortfoliosResponse[0])
        expect(state[2]).toEqual(allPortfoliosResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })
})