import * as selectors from './selectors'

const mockState = {
    targets: {
        4: { id: 4, portfolioId: 1, parentId: null, epicIds: [] },
        5: { id: 5, portfolioId: 1, parentId: null, epicIds: [] },
        6: { id: 6, portfolioId: 2, parentId: null, epicIds: [1, 2] },
    }
}

const newTarget = {
    title: '',
    description: '',
    startDate: '',
    dueDate: '',
    portfolioId: null,
    deliverableIds: [],
    epicIds: []
}

describe('Target selectors', () => {
    test('selectTargetById - returns found object', () => {
        expect(selectors.selectTargetById(mockState, 4)).toEqual(mockState.targets[4])
    })

    test('selectTargetById - return empty target when target not in state', () => {
        expect(selectors.selectTargetById(mockState, 40)).toEqual(newTarget)
    })

    test('selectTargetsByPortfolioId - returns proper array', () => {
        expect(selectors.selectTargetsByPortfolioId(mockState, 1)).toHaveLength(2)
    })

    test('selectTargetsByPortfolioId - returns empty array', () => {
        expect(selectors.selectTargetsByPortfolioId(mockState, null)).toHaveLength(0)
    })

    test('selectTargetsByPortfolioId - maps properly', () => {
        expect(selectors.selectTargetsByPortfolioId(mockState, 2)).toEqual([{
            ...mockState.targets[6],
            type: 'target',
            style: { width: 0 }
        }])
    })

    test('selectTargetsByIds - returns proper array', () => {
        expect(selectors.selectTargetsByIds(mockState, [4, 5])).toEqual([
            { id: 4, portfolioId: 1, parentId: null, epicIds: [] },
            { id: 5, portfolioId: 1, parentId: null, epicIds: [] }
        ])
    })

    test('selectTargetsByIds - returns empty array', () => {
        expect(selectors.selectTargetsByIds(mockState, [])).toHaveLength(0)
    })

    test('selectEpicIdsByTargetIds - returns empty array', () => {
        expect(selectors.selectEpicIdsByTargetIds(mockState, [])).toHaveLength(0)
    })

    test('selectEpicIdsByTargetIds - returns proper array', () => {
        expect(selectors.selectEpicIdsByTargetIds(mockState, [4, 5, 6])).toEqual([1, 2])
    })
})