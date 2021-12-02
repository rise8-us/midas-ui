import * as dateHelper from './dateHelpers'

describe('date Helpers', () => {

    test('DateInDisplayOrder date===notString', () => {
        expect(dateHelper.dateInDisplayOrder(null)).toEqual(null)
    })

    test('DateInDisplayOrder date===YYYY-MM-DD', () => {
        expect(dateHelper.dateInDisplayOrder('2020-01-02')).toEqual('01-02-2020')
    })

    test('dateInDatabaseOrder date===notString', () => {
        expect(dateHelper.dateInDatabaseOrder(null)).toEqual(null)
    })

    test('dateInDatabaseOrder date===MM-DD-YYYY', () => {
        expect(dateHelper.dateInDatabaseOrder('01-02-2020')).toEqual('2020-01-02')
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


})