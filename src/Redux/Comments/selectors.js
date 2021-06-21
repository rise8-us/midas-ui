export const selectCommentsByAssertionId = (state, assertionId) => {
    const allComments = state.comments
    if (!allComments) return []

    return Object.values(allComments).filter(c => c.assertionId === assertionId).sort((a, b) => b.id - a.id)
}

export const selectCommentById = (state, commentId) => {
    return state?.comments[commentId] ?? {
        text: '',
        author: {}
    }
}