
export const selectFeatureById = (state, id) => {
    const feature = state.features[id]
    if (!feature) return {
        title: '',
        description: '',
        index: 0,
    }

    return feature
}

export const selectFeaturesByProductId = (state, productId) => {
    const features = state.features
    if (!features) return []

    return Object.values(features)
        .filter(feature => feature.productId === productId)
        .sort((a, b) => a.index - b.index)
}