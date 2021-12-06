import * as selectors from './selectors'

describe('Measure Selectors', () => {

    const mockState = {
        measures: {
            12: {
                id: 12,
                assertionId: 1
            },
            13: {
                id: 13,
                assertionId: 2
            }
        }
    }

    test('selectMeasureById - returns empty object', () => {
        expect(selectors.selectMeasureById({ measures: {} }, 2)).toBeInstanceOf(Object)
    })

    test('selectMeasureById - returns measure', () => {
        const measure = selectors.selectMeasureById(mockState, 12)

        expect(measure).toEqual(mockState.measures[12])
    })

    test('selectMeasuresByAssertionId - returns empty array', () => {
        expect(selectors.selectMeasuresByAssertionId({ measures: {} }, 3)).toBeInstanceOf(Array)
    })

    test('selectMeasuresByAssertionId - returns array of items', () => {
        const measures = selectors.selectMeasuresByAssertionId(mockState, 2)

        expect(measures).toEqual([mockState.measures[13]])
    })

    test('selectMeasureIdsByAssertionId to return array of ids', () => {
        expect(selectors.selectMeasureIdsByAssertionId(mockState, 2)).toEqual([13])
    })
})