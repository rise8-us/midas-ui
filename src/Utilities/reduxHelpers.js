export const setStateFromArray = (state, response) => {
    response.forEach(item => { state[item.id] = item })
}

export const addChildren = (state, entry) => {
    state[entry.id] = {
        ...entry,
        children: Object.values(entry.children).map(child => child.id)
    }
    entry.children.forEach(child => addChildren(state, child))
}
