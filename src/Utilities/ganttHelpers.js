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
            const startYear = startDate.getFullYear().toString().slice(2, 4)
            const endYear = endDate.getFullYear().toString().slice(2, 4)

            const quarter = index % QUARTER_IN_YEAR

            const startYearTitle = startYear === endYear ? '' : ' ' + startYear
            const quarterTitle = 'Q' + (quarter + 1) + ', '

            return quarterTitle + startMonth + startYearTitle + ' - ' + endMonth + ' ' + endYear
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
                (index === 0 || month === 'Jan' ?
                    ' ' + date.getFullYear().toString().slice(2, 4) : '')
        },
        incrementor: (date) => date.setMonth(date.getMonth() + 1),
        flexGrow: (iterator) => new Date(iterator.getFullYear(), iterator.getMonth() + 1, 0).getDate()
    },
    week: {
        formatter: (startDate) => {
            let endDate = new Date(startDate.getTime())
            endDate.setDate(endDate.getDate() + 6)

            const startDay = startDate.getDate()
            const endDay = endDate.getDate()
            const startMonth = dateHelpers.getMonthAbbreviated(startDate.getMonth())
            const endMonth = dateHelpers.getMonthAbbreviated(endDate.getMonth())

            return startDay + `${startMonth !== endMonth ? ' ' + startMonth : ''}` + ' - ' + endDay + ' ' + endMonth
        },
        incrementor: (date) => date.setDate(date.getDate() + 7),
        flexGrow: () => 1
    },
    day: {
        formatter: (date) => {
            const num = date.getDate()
            const weekday = dateHelpers.getDayAbbreviated(date.getDay())
            const month = dateHelpers.getMonthAbbreviated(date.getMonth())
            return num + ' ' + weekday + ', ' + month
        },
        incrementor: (date) => date.setDate(date.getDate() + 1),
        flexGrow: () => 1
    }
}

export const rowStyles = (backgroundColor, borderColor) => {
    return {
        backgroundColor,
        borderBottom: '1px solid',
        borderColor,
        display: 'flex'
    }
}

export const cellStyles = (borderColor, flexGrow = 1) => {
    return {
        borderLeft: '1px solid',
        borderColor,
        flexGrow,
        width: 0
    }
}