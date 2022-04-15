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

    test('should handle viewBy = quarter', () => {
        const results = ganttHelpers.generateChartFormat(startDate, 'quarter', 5)

        expect(results[0]).toEqual({ title: 'Q1, Feb - Apr 00', flexGrow: 90 })
        expect(results[1]).toEqual({ title: 'Q2, May - Jul 00', flexGrow: 92 })
        expect(results[3]).toEqual({ title: 'Q4, Nov 00 - Jan 01', flexGrow: 92 })
        expect(results[4]).toEqual({ title: 'Q1, Feb - Apr 01', flexGrow: 89 })
    })

    test('should handle viewBy = month', () => {
        const results = ganttHelpers.generateChartFormat(startDate, 'month', 12)

        expect(results[0]).toEqual({ title: 'Feb 00', flexGrow: 29 })
        expect(results[11]).toEqual({ title: 'Jan 01', flexGrow: 31 })
    })

    test('should handle viewBy = week', () => {
        const results = ganttHelpers.generateChartFormat(startDate, 'week', 5)

        expect(results[0]).toEqual({ title: '1 - 7 Feb', flexGrow: 1 })
        expect(results[1]).toEqual({ title: '8 - 14 Feb', flexGrow: 1 })
        expect(results[4]).toEqual({ title: '29 Feb - 6 Mar', flexGrow: 1 })
    })

    test('should handle viewBy = day', () => {
        const results = ganttHelpers.generateChartFormat(startDate, 'day', 8)

        expect(results[0]).toEqual({ title: '1 Tue, Feb', flexGrow: 1 })
        expect(results[6]).toEqual({ title: '7 Mon, Feb', flexGrow: 1 })
        expect(results[7]).toEqual({ title: '8 Tue, Feb', flexGrow: 1 })
    })
})