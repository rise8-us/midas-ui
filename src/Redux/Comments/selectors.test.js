import * as selectors from './selectors'

const mockState = {
    comments: {
        2: {
            assertionId: 1
        },
        3: {
            assertionId: 4
        }
    }
}

test('selectCommentsByAssertionId - returns empty array', () => {
    const results = selectors.selectCommentsByAssertionId({ }, 2)

    expect(results).toBeInstanceOf(Array)
    expect(results).toHaveLength(0)
})

test('selectCommentsByAssertionId - returns array of comments', () => {
    const results = selectors.selectCommentsByAssertionId(mockState, 1)

    expect(results).toEqual([mockState.comments[2]])
})
