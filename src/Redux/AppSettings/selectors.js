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

export const selectPortfolioPageSettings = (state, id) => {
    return state.app.portfolioPage[id] ?? {
        selectedDeliverableId: null
    }
}

export const selectPortfolioPageSetting = (state, id, setting) => {
    return state.app.portfolioPage[id]?.[setting]
}

export const selectPortfolioPageSettingView = (state, id) => {
    return selectPortfolioPageSetting(state, id, 'view') ?? {
        title: '6M',
        viewBy: 'month',
        scope: 6,
        leadingColumns: 2
    }
}

export const selectPortfolioPageSettingExpanded = (state, id) => {
    return selectPortfolioPageSetting(state, id, 'expanded') ?? {
        allExpanded: false
    }
}

export const selectPortfolioPageSettingAllExpanded = (state, id) =>
    state.app.portfolioPage[id]?.expanded?.allExpanded ?? false

export const selectPortfolioPageSettingTargetIdExpanded = (state, portfolioId, id) =>
    state.app.portfolioPage[portfolioId]?.expanded?.[id] ?? false

export const selectEpicSyncProgress = (state) =>
    state.app.epicSyncProgress ?? 0