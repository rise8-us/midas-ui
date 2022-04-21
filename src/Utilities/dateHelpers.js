export const getDateIfValid = (dateString) => {
    const date = new Date(dateString?.split('T')[0].replaceAll('-', '/'))
    return date.toString() === 'Invalid Date' ? null : date
}

export const parseStringToDate = (entry) => {
    const splitEntry = entry?.split('-')

    if (!splitEntry) return null

    return new Date(Number(splitEntry[0]), Number(splitEntry[1]) - 1, Number(splitEntry[2]))
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
    const soFar = Math.abs(getDifferenceInDays(start, new Date()))
    return total > 0 ? Math.round((soFar / total) * 100) : 0
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

export const calculateSinglePosition = (dateToCalculate, dateRange) => {
    const position = (dateToCalculate - dateRange[0]) / (dateRange[1] - dateRange[0]) * 100
    return [position, 0]
}

export const calculatePosition = (dateRangeEntry, totalDateRange) => {
    if (dateRangeEntry[0] === null && dateRangeEntry[1] === null) {
        return [0, 0]
    }

    if (dateRangeEntry.includes(null)) {
        const dateInput = dateRangeEntry[0] ?? dateRangeEntry[1]
        return calculateSinglePosition(dateInput, totalDateRange)
    }

    const range = totalDateRange[1] - totalDateRange[0]
    const start = (dateRangeEntry[0] - totalDateRange[0]) / range
    const end = (dateRangeEntry[1] - totalDateRange[0]) / range

    if (start < 1 && end > 0) return [start * 100, Math.abs(end - start) * 100]

    return [null, Math.abs(end - start) * 100]
}

export const DateConstants = {
    Day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    Month: ['January', 'Febuary', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']
}

export const dateRangeFilter = (entry, dateRange) => {
    const isoDateRange = [dateRange[0].toISOString(), dateRange[1].toISOString()]
    const dueDateInRange = getIsDateInRange(entry.dueDate, isoDateRange)
    const startDateInRange = getIsDateInRange(entry.startDate, isoDateRange)
    return startDateInRange || dueDateInRange ||
    (dateRange[0] > parseStringToDate(entry.startDate) && dateRange[1] < parseStringToDate(entry.dueDate))
}

export const getMonthAbbreviated = (index, length) => DateConstants.Month[index].substring(0, length ?? 3)
export const getDayAbbreviated = (index, length) => DateConstants.Day[index].substring(0, length ?? 3)