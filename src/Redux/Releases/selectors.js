export const selectReleaseInRangeAndProjectId = (state, dateRange, projectId) => {
    return Object.values(state.releases).filter(release =>
        new Date(release.releasedAt) < dateRange[1] &&
        new Date(release.releasedAt) > dateRange[0] &&
        release.projectId === projectId
    ).sort((a, b) => new Date(b.releasedAt) - new Date(a.releasedAt))
}

export const selectReleaseClosestTo = (state, date, projectId) => {
    let closestDate = 0

    return Object.values(state.releases)
        .filter(release => release.projectId === projectId && new Date(release.releasedAt) < date)
        .reduce((previousValue, release) => {
            if (new Date(release.releasedAt) > closestDate) {
                closestDate = new Date(release.releasedAt)
                return release
            }
            return previousValue
        }, {})
}