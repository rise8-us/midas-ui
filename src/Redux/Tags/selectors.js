
export function selectTagById(state, id) {
    const tags = state.tags[id]
    if(!tags) return {
        label: '',
        description: '',
        color: '#'
    }
    
    return tags
}

export const selectAllTags = state => {
    return Object.values(state.tags)
}

export const selectTagsByIds = (state, ids) => {
    if (ids.length === 0) return []

    const allTags = selectAllTags(state)

    return allTags.filter(tag => ids.includes(tag.id))
}