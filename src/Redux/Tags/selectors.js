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
    return Object.values(state.tags).sort((a, b) => {
        const labelA = a.label.toUpperCase()
        const labelB = b.label.toUpperCase()

        return labelA < labelB ? -1 : 1
    })
}

export const selectTagsByIds = (state, ids) => {
    if (ids.length === 0) return []

    const allTags = selectAllTags(state)

    return allTags.filter(tag => ids.includes(tag.id))
}

export const selectTagsByTypes = (state, types) => {
    return selectAllTags(state).filter(t => types.includes(t.tagType))
}

export const selectTagsByScope = (state, scope) => {
    return selectAllTags(state).filter(tag => tag.label.split('::')[0] === scope)
}

export const selectTagByLabel = (state, label) => {
    const tag = Object.values(state.tags).find(foundTag => foundTag.label === label)
    if (!tag) return {
        label: '',
        description: '',
        color: '#',
        tagType: 'ALL'
    }
    return tag
}