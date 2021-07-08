import * as selectors from './selectors'

const mockState = {
    blockedAssertions: [
        {
            productId: 1,
            productParentId: null,
        }, {
            productId: 2,
            productParentId: 1,
        }, {
            productId: 3,
            productParentId: 1,
        }, {
            productId: 4,
            productParentId: null,
        }, {
            productId: 5,
            productParentId: 4,
        }
    ]
}

test('selectAllBlockedAssertionsWithParentId - returns array of length 3', () => {
    expect(selectors.selectAllBlockedAssertionsWithParentId(mockState)).toHaveLength(3)
})

test('selectBlockedAssertionsByParentId - returns array of length 2', () => {
    expect(selectors.selectBlockedAssertionsByParentId(mockState, 1)).toHaveLength(2)
})