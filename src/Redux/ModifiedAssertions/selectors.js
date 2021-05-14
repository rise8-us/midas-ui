export const selectTreeByNodeId = (state, root, type) => {
    return {
        ...state.modifiedAssertions[root],
        children: getChildren(state, state.modifiedAssertions[root], type)
    }
}

const getChildren = (state, parent, type) => {
    const allChildren = Object.values(state.modifiedAssertions)
        .filter(a => a.parentKey === parent?.linkKey)

    let children
    let newChildren = []

    switch (type) {
    case 'current':
        children = allChildren.filter(c => c.id !== undefined)
        break
    case 'new':
        children = allChildren.filter(c => c.id === undefined)
        break
    default:
        children = allChildren
    }

    children.forEach(kid => {
        newChildren.push({ ...kid, children: getChildren(state, kid, type) })
    })

    return newChildren
}