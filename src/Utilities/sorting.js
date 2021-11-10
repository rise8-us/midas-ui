export const sortArrayAlphabetically = (array, key) => {
    return Array.from(array).sort((firstObj, secondObj) => {
        const firstElementValue = firstObj[key] ?? ''
        const secondElementValue = secondObj[key] ?? ''

        return firstElementValue.localeCompare(secondElementValue) < 0 ? -1 : 1
    })
}
