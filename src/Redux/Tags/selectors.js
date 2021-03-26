
export function selectTagById(state, id) {
    return state.tags[id] ?? {}
}