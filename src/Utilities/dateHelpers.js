export const getDateIfValid = (dateString) => {
    const date = new Date(dateString?.split('T')[0].replaceAll('-', '/'))
    return date.toString() === 'Invalid Date' ? null : date
}

export const getDateInDisplayOrder = (dateString) => {
    const date = getDateIfValid(dateString)
    return date ? [
        (date.getMonth() + 1).toString().padStart(2, 0),
        date.getDate().toString().padStart(2, 0),
        date.getFullYear()
    ].join('-') : null
}

export const getDateInDatabaseOrder = (dateString) => {
    const date = getDateIfValid(dateString)
    return date ? [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, 0),
        date.getDate().toString().padStart(2, 0)
    ].join('-') : null
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

    return total > 0 ? Math.floor((soFar / total) * 100) : 0
}

export const getIsDateInRange = (date, range) => {
    const start = getDateIfValid(range[0])
    const end = getDateIfValid(range[1])
    const nullCount = [start, end].filter(entry => entry === null).length

    if (date === null && nullCount === 2 || nullCount === 2) return true
    if (start === null) return Date.parse(date) < Date.parse(end)
    if (end === null) return Date.parse(date) > Date.parse(start)
    return Date.parse(date) > Date.parse(start) && Date.parse(date) < Date.parse(end)
}

export const DateConstants = {
    Day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    Month: ['January', 'Febuary', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']
}

export const getMonthAbbreviated = (index, length) => DateConstants.Month[index].substring(0, length ?? 3)
export const getDayAbbreviated = (index, length) => DateConstants.Day[index].substring(0, length ?? 3)