export const selectDeliverableById = (state, id) =>
    state.deliverables[id] ?? { children: [] }

export const selectDeliverablesByCapabilityId = (state, capabilityId) => {
    const deliverables = state.deliverables

    return Object.values(deliverables)
        .filter(deliverable => deliverable.capabilityId === capabilityId)
        .sort((a, b) => a.index - b.index)
}

export const selectDeliverableByParentId = (state, parentId) =>
    Object.values(state.deliverables).filter(deliverable => deliverable.parentId === parentId)