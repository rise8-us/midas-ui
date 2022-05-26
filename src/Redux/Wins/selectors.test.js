import * as selectors from './selectors'

const mockState = {
    wins: {
        4: { portfolioId: 1 },
        5: { portfolioId: 1 },
        6: { portfolioId: 2 },
    }
}

const newWin = {
    title: '',
    description: '',
    dueDate: '',
    portfolioId: null
}

describe('Win selectors', () => {
    test('selectWinById', () => {
        expect(selectors.selectWinById(mockState, 4)).toEqual(mockState.wins[4])
    })

    test('selectWinById - return empty Win when Win not in state', () => {
        expect(selectors.selectWinById(mockState, 40)).toEqual(newWin)
    })

    test('selectWinsByPortfolioId - returns proper array', () => {
        expect(selectors.selectWinsByPortfolioId(mockState, 1)).toHaveLength(2)
    })

    test('selectWinsByPortfolioId - returns empty array', () => {
        expect(selectors.selectWinsByPortfolioId(mockState, null)).toHaveLength(0)
    })

    test('selectWinsByPortfolioId - maps properly', () => {
        expect(selectors.selectWinsByPortfolioId(mockState, 2)).toEqual([{
            ...mockState.wins[6],
            type: 'win',
            row: 1,
            style: {
                width: 0,
            }
        }])
    })
})



