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

export const selectPortfolioPageGanttSettingExpanded = (state, id) => {
    return selectPortfolioPageSetting(state, id, 'targets') ?? {
        allExpanded: false
    }
}

export const selectPortfolioPageSprintReportSettingExpanded = (state, id) => {
    return selectPortfolioPageSetting(state, id, 'projects') ?? {
        allExpanded: false
    }
}

export const selectPortfolioPageGanttAllExpanded = (state, id) =>
    state.app.portfolioPage[id]?.targets?.allExpanded ?? false

export const selectPortfolioPageSprintReportAllExpanded = (state, id) =>
    state.app.portfolioPage[id]?.projects?.allExpanded ?? false

export const selectPortfolioPageSettingTargetIdExpanded = (state, portfolioId, id) =>
    state.app.portfolioPage[portfolioId]?.targets?.[id] ?? false

export const selectPortfolioPageSettingProjectIdExpanded = (state, portfolioId, id) =>
    state.app.portfolioPage[portfolioId]?.projects?.[id] ?? false

const getGitlabPaginationOrDefault = (itemToFetch) => itemToFetch ?? { value: 0, status: 'SYNCED' }

export const selectEpicSyncProgress = (state, id) =>
    getGitlabPaginationOrDefault(state.app.epicSyncProgress[id])

export const selectIssueSyncProgress = (state, id) =>
    getGitlabPaginationOrDefault(state.app.issueSyncProgress[id])

export const selectReleaseSyncProgress = (state, id) =>
    getGitlabPaginationOrDefault(state.app.releaseSyncProgress[id])
