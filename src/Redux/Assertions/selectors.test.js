import * as selectors from './selectors'

const mockState = {
    assertions: {
        12: {
            id: 12,
            productId: 2,
            parentId: null,
            type: 'FOO'
        },
        13: {
            id: 13,
            productId: 2,
            parentId: 12,
            type: 'BAR'
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

test('selectAssertionsByType - returns object in array', () => {
    expect(selectors.selectAssertionsByType(mockState, 'foo')).toEqual([mockState.assertions[12]])
})

test('selectAssertionsByType - invalid type', () => {
    expect(selectors.selectAssertionsByType(mockState, 1)).toEqual([])
})

test('selectAssertionsByTypeAndProductId - invalid type', () => {
    expect(selectors.selectAssertionsByTypeAndProductId(mockState, 'FOO', 2)).toEqual([mockState.assertions[12]])
})

test('selectRootAssertionId - undefined parentId should return undefined', () => {
    expect(selectors.selectRootAssertionId(mockState, 14)).toEqual(undefined)
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