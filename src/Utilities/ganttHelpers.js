import PropTypes from 'prop-types'
import { calculateSinglePosition, getDayAbbreviated, getMonthAbbreviated, parseStringToDate } from './dateHelpers'

const QUARTER_IN_YEAR = 4

export const generateChartFormat = (startDate, viewBy, duration) => {
    const generatedViewByArray = []
    const helpers = viewByModes[viewBy]
    let iterator = new Date(startDate.getTime())

    for (let i = 0; i < duration; i++) {
        generatedViewByArray.push({
            title: helpers.formatter(iterator, i),
            flexGrow: helpers.flexGrow(iterator)
        })

        helpers.incrementor(iterator)
    }

    return generatedViewByArray
}

generateChartFormat.propTypes = {
    startDate: PropTypes.instanceOf(Date).isRequired,
    viewBy: PropTypes.oneOf(['year', 'quarter', 'month', 'week', 'day']).isRequired,
    duration: PropTypes.number.isRequired
}

const viewByModes = {
    year: {
        formatter: (date) => date.getFullYear(),
        incrementor: (date) => date.setFullYear(date.getFullYear() + 1),
        flexGrow: () => 1
    },
    quarter: {
        formatter: (startDate, index) => {
            let endDate = new Date(startDate.getTime())
            endDate.setMonth(endDate.getMonth() + 2)

            const startMonth = getMonthAbbreviated(startDate.getMonth())
            const endMonth = getMonthAbbreviated(endDate.getMonth())
            const startYear = getYearAbbreviated(startDate)
            const endYear = getYearAbbreviated(endDate)

            const quarter = index % QUARTER_IN_YEAR

            const startYearTitle = startYear === endYear ? '' : startYear
            const quarterTitle = 'Q' + (quarter + 1) + ', '

            return quarterTitle + startMonth + startYearTitle + ' - ' + endMonth + endYear
        },
        incrementor: (date) => date.setMonth(date.getMonth() + 3),
        flexGrow: (iterator) => {
            let runningSum = 0
            for (let i = 0; i < 3; i++) {
                runningSum += new Date(iterator.getFullYear(), iterator.getMonth() + 1 + i, 0).getDate()
            }

            return runningSum
        }
    },
    month: {
        formatter: (date, index) => {
            const month = getMonthAbbreviated(date.getMonth())
            return month +
                (index === 0 || month === 'Jan' ? getYearAbbreviated(date) : '')
        },
        incrementor: (date) => date.setMonth(date.getMonth() + 1),
        flexGrow: (iterator) => new Date(iterator.getFullYear(), iterator.getMonth() + 1, 0).getDate()
    },
    week: {
        formatter: (startDate, index) => {
            let endDate = new Date(startDate.getTime())
            endDate.setDate(endDate.getDate() + 6)

            const startDay = startDate.getDate()
            const endDay = endDate.getDate()
            const startMonth = getMonthAbbreviated(startDate.getMonth())
            const endMonth = getMonthAbbreviated(endDate.getMonth())
            const endYear = index === 0 || (endMonth === 'Jan' && endDay >= 1 && endDay <= 7) ?
                getYearAbbreviated(endDate) : ''
            const startYear = (startMonth === 'Dec' && endMonth === 'Jan') ?
                getYearAbbreviated(startDate) : ''

            return startDay + `${startMonth !== endMonth ? ' ' + startMonth : ''}` + startYear +
                ' - ' + endDay + ' ' + endMonth + endYear
        },
        incrementor: (date) => date.setDate(date.getDate() + 7),
        flexGrow: () => 1
    },
    day: {
        formatter: (date, index) => {
            const num = date.getDate()
            const weekday = getDayAbbreviated(date.getDay())
            const month = getMonthAbbreviated(date.getMonth())
            const year = index === 0
                || (month === 'Jan' && num === 1) ? getYearAbbreviated(date) : ''
            return weekday + ', ' + num + ' ' + month + year
        },
        incrementor: (date) => date.setDate(date.getDate() + 1),
        flexGrow: () => 1
    }
}

export const rowStyles = (backgroundColor, borderColor) => {
    return {
        backgroundColor,
        borderBottom: `1px solid ${borderColor}`,
        borderRight: `1px solid ${borderColor}`,
        display: 'flex'
    }
}

export const cellStyles = (borderColor, flexGrow = 1) => {
    return {
        borderLeft: '1px solid',
        color: borderColor,
        flexGrow,
        width: 0
    }
}

export const getYearAbbreviated = (date) => {
    return ` '${date.getFullYear().toString().slice(2, 4)}`
}

export const setDateByViewBy = {
    year: (date, scope) => date.setYear(date.getFullYear() + scope),
    quarter: (date, scope) => date.setMonth(date.getMonth() + (scope * 3)),
    month: (date, scope) => date.setMonth(date.getMonth() + scope),
    week: (date, scope) => date.setDate(date.getDate() + (scope * 7)),
    day: (date, scope) => date.setDate(date.getDate() + scope),
}

export const parseDate = (startDate, endDate) => {
    if (startDate === null) startDate = endDate
    if (endDate === null) endDate = startDate
    const [yearStart, monthStart, dayStart] = startDate.split('-')
    const [yearEnd, monthEnd, dayEnd] = endDate.split('-')
    const parsedMonth = (month) => parseInt(month) - 1

    if (startDate === endDate) {
        return `${dayStart} ${getMonthAbbreviated(parsedMonth(monthStart))} ${yearStart}`
    } else if (yearStart === yearEnd && monthStart === monthEnd) {
        return `${dayStart} - ${dayEnd} ${getMonthAbbreviated(parsedMonth(monthStart))} ${yearStart}`
    } else if (yearStart === yearEnd) {
        return `${dayStart} ${getMonthAbbreviated(parsedMonth(monthStart))}`
                + ` - ${dayEnd} ${getMonthAbbreviated(parsedMonth(monthEnd))} ${yearStart}`
    } else {
        return `${dayStart} ${getMonthAbbreviated(parsedMonth(monthStart))} ${yearStart}` +
    ` - ${dayEnd} ${getMonthAbbreviated(parsedMonth(monthEnd))} ${yearEnd}`
    }
}

const isWholeNumber = (num) => num !== null && num !== undefined && num >= 0

const calculateEntryWidth = (string, fontSize) => {
    const letterWidthAtFontSize100 = 55 * string?.length
    const fontRatio = 100 / fontSize
    const maxEntrySize = window.innerWidth * .24 - 48
    let letterWidth = letterWidthAtFontSize100 / fontRatio
    return Math.max(100, Math.min(letterWidth, maxEntrySize))
}

const insertEntry = (entriesObject, row, entry) => {
    if (entriesObject[row]?.length > 0) entriesObject[row].push(entry)
    else entriesObject[row] = [entry]
}

const sortEntriesByDueDate = (entries) => {
    return entries.sort((prev, next) => {
        const prevDueDate = parseStringToDate(prev.dueDate)?.getTime()
        const nextDueDate = parseStringToDate(next.dueDate)?.getTime()
        return prevDueDate - nextDueDate
    })
}

const handleRowfulEntries = (rowfulEntries, indexedEntries, dateRange = []) => {
    const tempIndexedEntries = {}

    for (const rowfulEntry of rowfulEntries) {
        if (tempIndexedEntries[rowfulEntry.row]?.length > 0) {
            tempIndexedEntries[rowfulEntry.row].push(rowfulEntry)
        } else {
            tempIndexedEntries[rowfulEntry.row] = [rowfulEntry]
        }
    }

    if (!dateRange || dateRange.length == 0) {
        return tempIndexedEntries
    }

    let currentRow = 0
    Object.entries(tempIndexedEntries).sort((prev, next) => { return prev.row - next.row })
        .map(rowEntry => {
            const indexedRowEntries = {}
            const rowAvailability = {}
            const startingRow = 0
            const entriesSortedByDueDate = sortEntriesByDueDate(rowEntry[1])
            rowAvailability[startingRow] = 0

            for (const entry of entriesSortedByDueDate) {
                if (entry.hasNoWidth) {
                    insertEntry(indexedRowEntries, 0, entry)
                } else if (!entry.startDate) {
                    const itemWidth = calculateEntryWidth(entry.title, 16)
                    const startPos = calculateSinglePosition(parseStringToDate(entry.dueDate), dateRange)[0]
                    const availableRow = findAvailableRow(
                        startPos,
                        startPos + itemWidth / window.innerWidth * 100,
                        startingRow,
                        rowAvailability,
                        []
                    )
                    insertEntry(indexedRowEntries, availableRow, entry)
                } else {
                    const availableRow = findAvailableRow(
                        parseStringToDate(entry.startDate),
                        parseStringToDate(entry.dueDate),
                        startingRow,
                        rowAvailability,
                        []
                    )
                    insertEntry(indexedRowEntries, availableRow, entry)
                }
            }

            for (const key in indexedRowEntries) {
                indexedEntries[currentRow] = indexedRowEntries[key]
                currentRow++
            }
        })

    return indexedEntries
}

const getFirstAvailableRowId = (indexedEntries) => {
    let startingIndex = 0
    const indexedEntriesKeyArray = Object.keys(indexedEntries)

    if (indexedEntriesKeyArray.length - 1 === parseInt(indexedEntriesKeyArray.at(-1))) {
        startingIndex = indexedEntriesKeyArray.length
    } else {
        indexedEntriesKeyArray.every((key, index) => {
            if (parseInt(key) !== index) {
                startingIndex = index
                return false
            }
            return true
        })
    }
    return startingIndex
}

const findAvailableRow = (startDate, dueDate, startingRowCount, rowsObject, exclusionRows) => {
    const rowCount = Object.keys(rowsObject).length + startingRowCount

    for (let i = startingRowCount; i < rowCount; i++) {
        if (!exclusionRows.includes(i) && startDate > rowsObject[i]) {
            rowsObject[i] = dueDate
            return i
        }
    }

    const nextAvailableIndex = rowCount + exclusionRows.filter(n => n <= rowCount).length

    rowsObject[nextAvailableIndex] = dueDate
    return nextAvailableIndex
}

const handleRowlessEntries = (indexedEntries, rowlessEntriesByType, fillUndefinedRowsWithLikeTypes) => {
    for (const type of Object.keys(rowlessEntriesByType)) {

        if (fillUndefinedRowsWithLikeTypes) {
            const rowAvailability = {}
            const startingRow = getFirstAvailableRowId(indexedEntries)
            const entriesSortedByDueDate = sortEntriesByDueDate(rowlessEntriesByType[type])
            const existingFilledRows = Object.keys(indexedEntries)
                .filter(key => parseInt(key) > startingRow)
                .map(numberAsString => parseInt(numberAsString))
            rowAvailability[startingRow] = 0

            for (const entry of entriesSortedByDueDate) {
                const rowWithAvailability = findAvailableRow(
                    parseStringToDate(entry.startDate),
                    parseStringToDate(entry.dueDate),
                    startingRow,
                    rowAvailability,
                    existingFilledRows
                )
                insertEntry(indexedEntries, rowWithAvailability, entry)
            }
        } else {
            for (const entry of rowlessEntriesByType[type]) {
                const rowNumber = getFirstAvailableRowId(indexedEntries)
                indexedEntries[rowNumber] = [entry]
            }
        }
    }
    return indexedEntries
}

export const createIndexedRowsFromData = (entries, dateRange = [], fillUndefinedRowsWithLikeTypes = false) => {
    let indexedEntries = {}

    const sortedEntries = entries.reduce((acc, entry) => {
        isWholeNumber(entry.row) ? acc.rowful.push(entry) : acc.rowless.push(entry)
        return acc
    }, { rowful: [], rowless: [] })

    const rowfulEntries = sortedEntries.rowful.sort((a, b) => a.row - b.row)
    const rowlessEntriesByType = sortedEntries.rowless
        .reduce((acc, entry) => {
            const { type } = entry

            if (acc[type]?.length > 0) acc[type].push(entry)
            else acc[type] = [entry]
            return acc
        }, {})
    indexedEntries = handleRowfulEntries(rowfulEntries, indexedEntries, dateRange)
    return handleRowlessEntries(indexedEntries, rowlessEntriesByType, fillUndefinedRowsWithLikeTypes)
}
