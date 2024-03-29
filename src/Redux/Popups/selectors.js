export const selectPopup = (state, key) => {
    return state.popups[key] ?? {}
}

export const selectOpenPopups = (state) => {
    const popups = state.popups
    if (popups === undefined) return []

    return Object.values(popups).filter(popup => popup.open)
}