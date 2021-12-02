export const dateInDisplayOrder = (date) => {
    if (typeof date === 'string') {
        const splitDate = date.split('-')
        return splitDate[1] + '-' + splitDate[2] + '-' + splitDate[0]
    }

    return null
}

export const dateInDatabaseOrder = (date) => {
    if (typeof date === 'string') {
        const splitDate = date.split('-')
        return splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1]
    }

    return null
}

export const getDifferenceInDays = (start, end) => {
    if (!start || !end) return 0

    const startDate = Date.parse(start)
    const endDate = Date.parse(end)

    return (endDate - startDate) / (1000 * 3600 * 24)
}

export const getTodayAsPercentageInRange = (start, end) => {

    const total = Math.abs(getDifferenceInDays(start, end))
    const soFar = Math.abs(getDifferenceInDays(start, (new Date())))

    return total > 0 ? (soFar / total) * 100 : 0
}