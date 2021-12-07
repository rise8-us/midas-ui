export const selectRoles = (state) => {
    return state.app.roles
}

export const selectRolesAsArray = (state) => {
    const allRoles = selectRoles(state)
    return Object.keys(allRoles).map(role => ({ ...allRoles[role] }))
}

export const selectTagTypes = (state) => {
    return Object.values(state.app.tagTypes).filter(t => t !== 'GITLAB')
}

export const selectRoadmapStatuses = (state) => state.app.roadmapStatus

export const selectRoadmapTypes = (state) => state.app.roadmapTypes

export const selectAssertionStatuses = (state) => state.app.assertionStatus

export const selectCompletionTypes = (state) => state.app.completionType ?? {}

export const selectAssertionCommentInfo = (state) => ({
    id: state.app.assertionCommentId,
    type: state.app.assertionCommentType
})