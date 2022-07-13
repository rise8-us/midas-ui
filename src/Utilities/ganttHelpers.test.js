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

        expect(results[0]).toEqual({ title: 'Q1, Feb - Apr \'00', flexGrow: 90 })
        expect(results[1]).toEqual({ title: 'Q2, May - Jul \'00', flexGrow: 92 })
        expect(results[3]).toEqual({ title: 'Q4, Nov \'00 - Jan \'01', flexGrow: 92 })
        expect(results[4]).toEqual({ title: 'Q1, Feb - Apr \'01', flexGrow: 89 })
    })

    test('should handle viewBy = month', () => {
        const results = ganttHelpers.generateChartFormat(startDate, 'month', 12)

        expect(results[0]).toEqual({ title: 'Feb \'00', flexGrow: 29 })
        expect(results[11]).toEqual({ title: 'Jan \'01', flexGrow: 31 })
    })

    test('should handle viewBy = week', () => {
        const results = ganttHelpers.generateChartFormat(startDate, 'week', 5)

        expect(results[0]).toEqual({ title: '1 - 7 Feb \'00', flexGrow: 1 })
        expect(results[1]).toEqual({ title: '8 - 14 Feb', flexGrow: 1 })
        expect(results[4]).toEqual({ title: '29 Feb - 6 Mar', flexGrow: 1 })

        const bridgedStartDate = new Date(2000, 11, 30)
        const secondResults = ganttHelpers.generateChartFormat(bridgedStartDate, 'week',  5)
        expect(secondResults[0]).toEqual({ title: '30 Dec \'00 - 5 Jan \'01', flexGrow: 1 })
    })

    test('should handle viewBy = day', () => {
        const results = ganttHelpers.generateChartFormat(startDate, 'day', 8)

        expect(results[0]).toEqual({ title: 'Tue, 1 Feb \'00', flexGrow: 1 })
        expect(results[6]).toEqual({ title: 'Mon, 7 Feb', flexGrow: 1 })
        expect(results[7]).toEqual({ title: 'Tue, 8 Feb', flexGrow: 1 })
    })

    test('getYearAbbreviated', () => {
        const results = ganttHelpers.getYearAbbreviated(startDate)

        expect(results).toEqual(' \'00')
    })

    describe('parseDate function', () => {
        const date1 = '2021-01-01'
        const date2 = '2021-04-21'
        const date3 = '2022-03-13'
        const date4 = '2021-01-05'

        test('same dates', () => {
            const result = ganttHelpers.parseDate(date1, date1)
            expect(result).toEqual('01 Jan 2021')
        })

        test('startDate null', () => {
            const result = ganttHelpers.parseDate(null, date1)
            expect(result).toEqual('01 Jan 2021')
        })

        test('same month and year', () => {
            const result = ganttHelpers.parseDate(date1, date4)
            expect(result).toEqual('01 - 05 Jan 2021')
        })

        test('different months, same year', () => {
            const result = ganttHelpers.parseDate(date1, date2)
            expect(result).toEqual('01 Jan - 21 Apr 2021')
        })

        test('different month and year', () => {
            const result = ganttHelpers.parseDate(date2, date3)
            expect(result).toEqual('21 Apr 2021 - 13 Mar 2022')
        })
    })

    describe('createIndexedRowsFromData', () => {
        test('mixed with and without rows', () => {
            const data = [{ a: 5, row: 3 }, { a: 5, row: 0 }, { a: 1, row: 1 }, { a: 3 }, { a: 2 }, { a: 6, row: 1 }]
            const expected = {
                0: [{ a: 5, row: 0 }],
                1: [{ a: 1, row: 1 }, { a: 6, row: 1 }],
                2: [{ a: 3 }],
                3: [{ a: 5, row: 3 }],
                4: [{ a: 2 }]
            }

            expect(ganttHelpers.createIndexedRowsFromData(data, [])).toEqual(expected)
        })

        test('without rows', () => {
            const data = [{ a: 5 }, { a: 4 }, { a: 1 }, { a: 3 }, { a: 2 }, { a: 6 }]

            const expected = {
                0: [{ a: 5 }],
                1: [{ a: 4 }],
                2: [{ a: 1 }],
                3: [{ a: 3 }],
                4: [{ a: 2 }],
                5: [{ a: 6 }],
            }

            expect(ganttHelpers.createIndexedRowsFromData(data, [])).toEqual(expected)
        })

        test('rows that are defined only have elements that specify that row', () => {
            const data = [
                { a: 5, row: 3 },
                { a: 5, row: 0 },
                { a: 1, row: 1 },
                { a: 3 },
                { a: 99, row: 2 },
                { a: 2 },
                { a: 6, row: 1 }
            ]

            const expected = {
                0: [{ a: 5, row: 0 }],
                1: [{ a: 1, row: 1 }, { a: 6, row: 1 }],
                2: [{ a: 99, row: 2 }],
                3: [{ a: 5, row: 3 }],
                4: [{ a: 3 }],
                5: [{ a: 2 }]
            }

            expect(ganttHelpers.createIndexedRowsFromData(data, [])).toEqual(expected)
        })
    })
})