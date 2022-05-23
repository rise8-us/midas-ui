export const selectAppBarFilter = (state) => {
    return state.filters.appBar.filterString
}

export const selectTargetFilters = (state) => {
    return state.filters.targetFilters
}