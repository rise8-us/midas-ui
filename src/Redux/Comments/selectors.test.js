import * as selectors from './selectors'

const mockState = {
    comments: {
        2: {
            id: 2,
            assertionId: 1
        },
        3: {
            id: 3,
            assertionId: 4
        },
        5: {
            id: 5,
            assertionId: 1
        },
    }
}

test('selectCommentsByAssertionId - returns empty array', () => {
    const results = selectors.selectCommentsByAssertionId({ }, 2)

    expect(results).toBeInstanceOf(Array)
    expect(results).toHaveLength(0)
})

test('selectCommentsByAssertionId - returns array of comments', () => {
    const results = selectors.selectCommentsByAssertionId(mockState, 1)

    expect(results).toBeInstanceOf(Array)
    expect(results).toHaveLength(2)
})

test('selectCommentsByAssertionId - returns array of comments', () => {
    const results = selectors.selectCommentsByAssertionId(mockState, 1)

    expect(results).toMatchObject([
        { id: 5, assertionId: 1 },
        { id: 2, assertionId: 1 }
    ])
})