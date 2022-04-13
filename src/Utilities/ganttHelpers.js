import PropTypes from 'prop-types'
import * as dateHelpers from './dateHelpers'

export const generateChartFormat = (startDate, viewBy, duration) => {
    const generatedViewByArray = []
    const helpers = viewByModes[viewBy]
    let iterator = new Date(startDate.getTime())

    for (let i = 0; i < duration; i++) {
        generatedViewByArray.push({
            title: helpers.formatter(iterator, i),
            flexGrow: helpers.modulateBy === 12 ?
                new Date(iterator.getFullYear(), iterator.getMonth() + 1, 0).getDate()
                : 1
        })

        helpers.incrementor(iterator)
    }

    return generatedViewByArray
}

generateChartFormat.propTypes = {
    startDate: PropTypes.instanceOf(Date).isRequired,
    viewBy: PropTypes.oneOf(['year', 'month', 'week']).isRequired,
    duration: PropTypes.number.isRequired
}

const viewByModes = {
    year: {
        formatter: (date) => date.getFullYear(),
        incrementor: (date) => date.setFullYear(date.getFullYear() + 1),
        modulateBy: 0
    },
    month: {
        formatter: (date, index) => {
            const month = dateHelpers.getMonthAbbreviated(date.getMonth())
            return month +
                (index === 0 || month === 'Jan' ?
                    ' ' + date.getFullYear().toString().slice(2, 4) : '')
        },
        incrementor: (date) => date.setMonth(date.getMonth() + 1),
        modulateBy: 12
    },
    week: {
        formatter: (date) => dateHelpers.getDayAbbreviated(date.getDay()),
        incrementor: (date) => date.setDate(date.getDate() + 1),
        modulateBy: 7
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
