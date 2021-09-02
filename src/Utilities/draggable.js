
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

export const onDragEnd = (result, originalList, action) => {
    if (!result.destination) {
        return
    }

    if (result.destination.index === result.source.index) {
        return
    }

    const newList = reorder(
        originalList,
        result.source.index,
        result.destination.index
    )

    action(newList)
}