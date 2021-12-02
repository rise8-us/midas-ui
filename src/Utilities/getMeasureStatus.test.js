import { getMeasureStatus } from './getMeasureStatus'

describe('getMeasureStatus', () => {

    const measure = { 'startDate': 'foo', 'dueDate': null, 'completedAt': null, 'value': 0, 'target': 100 }

    test('should return not started', () => {
        expect(getMeasureStatus({ ...measure, startDate: null })).toEqual('NOT_STARTED')
    })

    test('should return completed', () => {
        expect(getMeasureStatus({ ...measure, completedAt: 'foo' })).toEqual('COMPLETED')
    })

    test('should return blocked', () => {
        expect(getMeasureStatus({ ...measure, dueDate: '2020-01-01' })).toEqual('BLOCKED')
    })

    test('should return at risk', () => {
        Date.now = jest.fn(() => new Date('2021-01-01').valueOf())
        const newMeasure = {
            ...measure,
            startDate: '2020-01-01',
            dueDate: '2021-01-02'
        }
        expect(getMeasureStatus(newMeasure)).toEqual('AT_RISK')
    })

    test('should return on track', () => {
        expect(getMeasureStatus(measure)).toEqual('ON_TRACK')
    })
})