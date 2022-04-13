import * as ganttHelpers from './ganttHelpers'

describe('ganttHelpers', () => {
    const startDate = new Date(2000, 1, 1)

    test('should handle viewBy = year', () => {
        const results = ganttHelpers.generateChartFormat(startDate, 'year', 5)

        expect(results).toBeInstanceOf(Array)
        expect(results).toHaveLength(5)

        expect(results[0]).toEqual({ title: 2000, flexGrow: 1 })
        expect(results[4]).toEqual({ title: 2004, flexGrow: 1 })
    })

    test('should handle viewBy = month', () => {
        const results = ganttHelpers.generateChartFormat(startDate, 'month', 12)

        expect(results[0]).toEqual({ title: 'Feb 00', flexGrow: 29 })
        expect(results[11]).toEqual({ title: 'Jan 01', flexGrow: 31 })
    })

    test('should handle viewBy = week', () => {
        const results = ganttHelpers.generateChartFormat(startDate, 'week', 8)

        expect(results[0]).toEqual({ title: 'Tue', flexGrow: 1 })
        expect(results[6]).toEqual({ title: 'Mon', flexGrow: 1 })
        expect(results[7]).toEqual({ title: 'Tue', flexGrow: 1 })
    })
})