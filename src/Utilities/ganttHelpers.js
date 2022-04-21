import PropTypes from 'prop-types'
import * as dateHelpers from './dateHelpers'

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

            const startMonth = dateHelpers.getMonthAbbreviated(startDate.getMonth())
            const endMonth = dateHelpers.getMonthAbbreviated(endDate.getMonth())
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
            const month = dateHelpers.getMonthAbbreviated(date.getMonth())
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
            const startMonth = dateHelpers.getMonthAbbreviated(startDate.getMonth())
            const endMonth = dateHelpers.getMonthAbbreviated(endDate.getMonth())
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
            const weekday = dateHelpers.getDayAbbreviated(date.getDay())
            const month = dateHelpers.getMonthAbbreviated(date.getMonth())
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

export const entrySize = (type = 'default') => {
    const entrySizes = {
        'milestone': 0,
        'event': 56,
        'target': 48,
        'default': 48
    }
    return entrySizes[type]
}