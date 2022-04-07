export const selectAllCapabilityIds = (state) => {
    return Object.keys(state.capabilities).map(id => parseInt(id))
}

export const selectCapabilityById = (state, id) => {
    const newCapability = {
        title: '',
        description: ''
    }

    return state.capabilities[id] ?? newCapability
}

export const selectCapabilitiesByPortfolioId = (state, portfolioId) => {
    return Object.values(state.capabilities).filter(capability => capability.portfolioId === portfolioId)
}

export const selectCapabilitiesWithNoPortfolioId = (state) => {
    return Object.values(state.capabilities).filter(capability => capability.portfolioId === null)
}