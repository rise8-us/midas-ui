export const selectCommentsByAssertionId = (state, assertionId) => {
    const allComments = state.comments
    if (!allComments) return []

    return Object.values(allComments).filter(c => c.assertionId === assertionId)
}