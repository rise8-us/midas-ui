export const selectRoadmapById = (state, id) => {
    const roadmap = state.roadmaps[id]
    if (!roadmap) return {
        title: '',
        description: '',
        status: 'FUTURE'
    }

    return roadmap
}

export const selectRoadmapsByProductId = (state, productId) => {
    const roadmaps = state.roadmaps
    if (!roadmaps) return []

    return Object.values(roadmaps).filter(roadmap => roadmap.productId === productId)
}