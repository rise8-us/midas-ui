import * as dateHelper from './dateHelpers'

describe('date Helpers', () => {

    describe('GanttDate Helpers', () => {
        const rangeStart = new Date(2020, 0, 1)
        const rangeEnd = new Date(2020, 11, 31)
        const entryStart = new Date(2020, 2, 1)
        const entryEnd = new Date(2020, 8, 1)

        test('test calculatePosition - both null', () => {
            expect(dateHelper.calculatePosition([null, null], [])).toEqual([0, 0])
        })

        test('test calculatePosition - one null', () => {
            expect(dateHelper.calculatePosition([null, entryEnd], [rangeStart, rangeEnd])).toEqual([66.837899543379, 0])
            expect(dateHelper.calculatePosition([entryEnd, null], [rangeStart, rangeEnd])).toEqual([66.837899543379, 0])
        })

        test('test calculatePosition - no nulls & in range', () => {
            expect(dateHelper.calculatePosition([entryStart, entryEnd], [rangeStart, rangeEnd]))
                .toEqual([16.43835616438356, 50.39954337899544])
        })

        test('test calculatePosition - no nulls & not in range', () => {
            expect(dateHelper.calculatePosition([rangeStart, entryStart], [entryEnd, rangeEnd]))
                .toEqual([null, 49.56970740103268])
        })
    })

    test('getDateIfValid - null param', () => {
        expect(dateHelper.getDateIfValid(null)).toBeNull()
    })

    test('getDateInDisplayOrder invalid date', () => {
        expect(dateHelper.getDateInDisplayOrder('foobar')).toEqual(null)
    })

    test('getDateInDisplayOrder date===YYYY-MM-DD', () => {
        expect(dateHelper.getDateInDisplayOrder('2020-01-02')).toEqual('01-02-2020')
    })

    test('getDateInDatabaseOrder invalid date', () => {
        expect(dateHelper.getDateInDatabaseOrder('foobar')).toEqual(null)
    })
    test('getDateInDatabaseOrder date===MM-DD-YYYY', () => {
        expect(dateHelper.getDateInDatabaseOrder('01-02-2020')).toEqual('2020-01-02')
    })

    test('getDifferenceInDays - handle empty start || end', () => {
        expect(dateHelper.getDifferenceInDays(null, 'yolo')).toEqual(0)
        expect(dateHelper.getDifferenceInDays('null', undefined)).toEqual(0)
    })

    test('getTodayAsPercentageInRange - returns 50', () => {
        var start = new Date()
        var end = new Date()
        start.setDate(start.getDate() - 5)
        end.setDate(end.getDate() + 5)

        expect(dateHelper.getTodayAsPercentageInRange(start, end)).toEqual(50)
    })

    test('getTodayAsPercentageInRange - returns 0', () => {
        expect(dateHelper.getTodayAsPercentageInRange(0, 0)).toEqual(0)
    })

    describe('getIsDateInRange', () => {
        test('returns truen when all null', () => {
            expect(dateHelper.getIsDateInRange(null, [null, null])).toEqual(true)
        })

        test('returns false with null date', () => {
            expect(dateHelper.getIsDateInRange(null, [null, '2020-01-01'])).toEqual(false)
        })

        test('returns true with null range', () => {
            expect(dateHelper.getIsDateInRange('foo', [null, null])).toEqual(true)
        })

        test('returns true with null start', () => {
            expect(dateHelper.getIsDateInRange('2020-01-01', [null, '2021-01-01'])).toEqual(true)
        })

        test('returns true with null end', () => {
            expect(dateHelper.getIsDateInRange('2021-01-01', ['2020-01-01', null])).toEqual(true)
        })

        test('returns true when date in range', () => {
            expect(dateHelper.getIsDateInRange('2021-01-01', ['2020-01-01', '2022-01-01'])).toEqual(true)
        })

        test('returns false when date < start', () => {
            expect(dateHelper.getIsDateInRange('2020-01-01', ['2021-01-01', '2022-01-01'])).toEqual(false)
        })

        test('returns false when date > end', () => {
            expect(dateHelper.getIsDateInRange('2022-01-01', ['2020-01-01', '2021-01-01'])).toEqual(false)
        })
    })

    test('getMonthAbbreviated - default', () => {
        expect(dateHelper.getMonthAbbreviated(0)).toEqual('Jan')
    })

    test('getMonthAbbreviated - custom', () => {
        expect(dateHelper.getMonthAbbreviated(0, 4)).toEqual('Janu')
    })

    test('getDayAbbreviated - default', () => {
        expect(dateHelper.getDayAbbreviated(0)).toEqual('Sun')
    })

    test('getDayAbbreviated - custom', () => {
        expect(dateHelper.getDayAbbreviated(0, 6)).toEqual('Sunday')
    })
})