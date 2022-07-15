export const selectEventById = (state, id) => {
    return state.events[id] ?? {
        title: '',
        description: '',
        startDate: '',
        dueDate: '',
        location: '',
        organizerIds: [],
        attendeeIds: [],
        portfolioId: null
    }
}

export const selectEventsByPortfolioId = (state, portfolioId) => {
    const events = state.events

    return Object.values(events)
        .filter(event => event.portfolioId === portfolioId)
        .map(event => ({ ...event, type: 'event', row: 2, style: { width: 0 }, minWidthInPx: 144, maxWidthInVw: 24 }))
}