export const selectTagById = (state, id) => {
    const tag = state.tags[id]
    if (!tag) return {
        label: '',
        description: '',
        color: '#',
        tagType: 'ALL'
    }
    return tag
}

export const selectAllTags = state => {
    return Object.values(state.tags)
}

export const selectTagsByIds = (state, ids) => {
    if (ids.length === 0) return []

    const allTags = selectAllTags(state)

    return allTags.filter(tag => ids.includes(tag.id))
}

export const selectTagsByTypes = (state, types) => {
    return selectAllTags(state).filter(t => types.includes(t.tagType))
}