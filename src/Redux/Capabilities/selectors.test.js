import * as selectors from './selectors'

const mockState = {
    capabilities: {
        2: {
            id: 2,
            portfolioId: 1
        },
        3: {
            id: 3,
            portfolioId: null,
        },
        4: {
            id: 4,
            portfolioId: 1
        }
    }
}

describe('capabilities selectors', () => {
    test('selectAllCapabilityIds - returns array with ids', () => {
        const results = selectors.selectAllCapabilityIds(mockState)

        expect(results).toBeInstanceOf(Array)
        expect(results).toEqual([2, 3, 4])
        expect(results).toHaveLength(3)
    })

    test('selectCapabilitiesByPortfolioId', () => {
        const results = selectors.selectCapabilitiesByPortfolioId(mockState, 1)

        expect(results).toBeInstanceOf(Array)
        expect(results).toHaveLength(2)
        expect(results).toEqual([mockState.capabilities[2], mockState.capabilities[4]])
    })

    test('selectCapabilitiesWithNoPortfolioId', () => {
        const results = selectors.selectCapabilitiesWithNoPortfolioId(mockState, 1)

        expect(results).toBeInstanceOf(Array)
        expect(results).toHaveLength(1)
        expect(results[0].id).toEqual(3)
    })
})