
export const sortArrayAlphabetically = (array, key) => {
    return Array.from(array).sort((firstObj, secondObj) => {
        const firstElementValue = firstObj[key] ?? ''
        const secondElementValue = secondObj[key] ?? ''

        return firstElementValue.localeCompare(secondElementValue, undefined, { numeric: true })
    })
}

export const sortArrayByStartDate = (a, b) => a.startDate > b.startDate || !b.startDate ? 1 : -1

export const sortArrayByDateAndTitle = (a, b) => {
    if (a.startDate > b.startDate) {
        return 1
    } else if (a.startDate < b.startDate) {
        return -1
    }
    return a.title.localeCompare(b.title, undefined, { numeric: true })
}

export const sortByStateAndTitle = (a, b) => {
    if (a.state === b.state) return a.title.localeCompare(b.title)
    if (a.state === 'closed') return 1
    if (b.state === 'closed') return -1
    return a.title.localeCompare(b.title, undefined, { numeric: true })
}
