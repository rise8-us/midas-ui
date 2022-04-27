import * as selectors from './selectors'

const mockState = {
    events: {
        4: { portfolioId: 1 },
        5: { portfolioId: 1 },
        6: { portfolioId: 2 },
    }
}

const newEvent = {
    title: '',
    description: '',
    startDate: '',
    dueDate: '',
    location: '',
    organizerIds: [],
    portfolioId: null
}

describe('Event selectors', () => {
    test('selectEventById - returns found object', () => {
        expect(selectors.selectEventById(mockState, 4)).toEqual(mockState.events[4])
    })

    test('selectEventById - return empty Event when Event not in state', () => {
        expect(selectors.selectEventById(mockState, 40)).toEqual(newEvent)
    })

    test('selectEventsByPortfolioId - returns array of items', () => {
        expect(selectors.selectEventsByPortfolioId(mockState, 1)).toHaveLength(2)
    })

    test('selectEventsByPortfolioId - returns empty array', () => {
        expect(selectors.selectEventsByPortfolioId(mockState, 'foo')).toHaveLength(0)
    })

    test('selectEventsByPortfolioId - maps properly', () => {
        expect(selectors.selectEventsByPortfolioId(mockState, 2)).toEqual([{
            ...mockState.events[6],
            type: 'event',
            row: 1,
            style: { width: 0 }
        }])
    })
})



