import * as progressHelpers from './progressHelpers'

describe('progressHelpers', () => {

    const value = 2
    const target = 10

    test('normalize function', () => {
        expect(progressHelpers.normalise(value, target)).toEqual(20)
        expect(progressHelpers.normalise(0, 0)).toEqual(0)
    })

    test('rounded percent function', () => {
        expect(progressHelpers.roundedPercent(value, target)).toEqual('20% completed')
        expect(progressHelpers.roundedPercent(0, 0)).toEqual('0% completed')
    })

    test('get total weights function', () => {
        const result = progressHelpers.getTotalWeights([
            { completedWeight: 1, totalWeight: 10 },
            { completedWeight: 5, totalWeight: 10 }
        ])

        expect(result).toEqual([20, 6])
    })
})