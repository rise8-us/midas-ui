export const selectDeliverablesByCapabilityId = (state, capabilityId) => {
    const deliverables = state.deliverables

    return Object.values(deliverables)
        .filter(deliverable => deliverable.capabilityId === capabilityId)
        .sort((a, b) => a.index - b.index)
}