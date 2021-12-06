import * as selectors from './selectors'

describe('Assertion selectors', () => {

    const mockState = {
        assertions: {
            12: {
                id: 12,
                productId: 2,
                parentId: null,
                children: [13]
            },
            13: {
                id: 13,
                productId: 2,
                parentId: 12
            },
            14: {
                id: 13,
                productId: 3,
                parentId: 13
            }
        }
    }

    const mockStateBlocked = {
        products: {
            1: { id: 1, parentId: null },
            2: { id: 2, parentId: 1 },
            3: { id: 3, parentId: 1 },
            4: { id: 4, parentId: null },
            5: { id: 5, parentId: 4 },
        },
        assertions: {
            11: {
                productId: 1,
                status: 'BLOCKED'
            },
            12: {
                productId: 2,
                status: 'AT_RISK'
            },
            13: {
                productId: 3,
                status: 'BLOCKED'
            },
            14: {
                productId: 4,
                status: 'AT_RISK'
            },
            15: {
                productId: 5,
                status: 'BLOCKED'
            }
        }
    }

    test('selectAssertionById - returns empty object', () => {
        expect(selectors.selectAssertionById({ assertions: {} }, 2)).toBeInstanceOf(Object)
    })

    test('selectAssertionById - returns assertion', () => {
        const assertion = selectors.selectAssertionById(mockState, 12)

        expect(assertion).toEqual(mockState.assertions[12])
    })

    test('selectAssertionsByParentId - returns empty array', () => {
        expect(selectors.selectAssertionsByParentId({ assertions: {} }, 3)).toBeInstanceOf(Array)
    })

    test('selectAssertionsByParentId - returns array of items', () => {
        const assertions = selectors.selectAssertionsByParentId(mockState, 12)

        expect(assertions).toEqual([mockState.assertions[13]])
    })

    test('selectAssertionsByProductId - returns array of product objectives', () => {
        const assertions = selectors.selectAssertionsByProductId(mockState, 3)

        expect(assertions).toEqual([mockState.assertions[14]])
    })

    test('selectAssertionsByProductId - invalid product id', () => {
        expect(selectors.selectAssertionsByProductId(mockState, 6)).toEqual([])
    })

    test('selectRootAssertionId - undefined parentId should return undefined', () => {
        expect(selectors.selectRootAssertionId(mockState, 15)).toEqual(undefined)
    })

    test('selectRootAssertionId - null parentId should return id', () => {
        expect(selectors.selectRootAssertionId(mockState, 12)).toEqual(12)
    })

    test('selectRootAssertionId - not null parentId should recurse until parentId is null', () => {
        expect(selectors.selectRootAssertionId(mockState, 13)).toEqual(12)
    })

    test('selectBlockedAssertionsInAPortfolio - returns array of length 3', () => {
        expect(selectors.selectBlockedAssertionsInAPortfolio(mockStateBlocked)).toHaveLength(3)
    })

    test('selectBlockedAssertionsByPortfolioId - returns array of length 2', () => {
        expect(selectors.selectBlockedAssertionsByPortfolioId(mockStateBlocked, 1)).toHaveLength(2)
    })

    test('selectChildIdsByParentId - returns empty array', () => {
        expect(selectors.selectChildIdsByParentId(mockState, 2)).toEqual([])
    })

    test('selectChildIdsByParentId - returns populated array', () => {
        expect(selectors.selectChildIdsByParentId(mockState, 12)).toEqual([13])
    })

})