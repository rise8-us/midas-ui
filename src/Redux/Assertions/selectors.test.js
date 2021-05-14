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