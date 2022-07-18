import * as selectors from './selectors'

const mockState = {
    milestones: {
        4: { portfolioId: 1 },
        5: { portfolioId: 1 },
        6: { portfolioId: 2 },
    }
}

const newMilestone = {
    title: '',
    description: '',
    dueDate: '',
    portfolioId: null
}

describe('Milestone selectors', () => {
    test('selectMilestoneById', () => {
        expect(selectors.selectMilestoneById(mockState, 4)).toEqual(mockState.milestones[4])
    })

    test('selectMilestoneById - return empty Milestone when Milestone not in state', () => {
        expect(selectors.selectMilestoneById(mockState, 40)).toEqual(newMilestone)
    })

    test('selectMilestonesByPortfolioId - returns proper array', () => {
        expect(selectors.selectMilestonesByPortfolioId(mockState, 1)).toHaveLength(2)
    })

    test('selectMilestonesByPortfolioId - returns empty array', () => {
        expect(selectors.selectMilestonesByPortfolioId(mockState, null)).toHaveLength(0)
    })

    test('selectMilestonesByPortfolioId - maps properly', () => {
        expect(selectors.selectMilestonesByPortfolioId(mockState, 2)).toEqual([{
            ...mockState.milestones[6],
            type: 'milestone',
            enableFullHeight: true,
            row: 0,
            maxWidthInVw: 24,
            minWidthInPx: 110
        }])
    })
})



