export const sortArrayAlphabetically = (array, key) => {
    return Array.from(array).sort((firstObj, secondObj) => {
        const firstElementValue = firstObj[key] ?? ''
        const secondElementValue = secondObj[key] ?? ''

        return firstElementValue.localeCompare(secondElementValue) < 0 ? -1 : 1
    })
}

export const sortArrayByDate = (a, b) => a.startDate > b.startDate || !b.startDate ? 1 : -1
