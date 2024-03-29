import * as selectors from './selectors'

describe('Error Selector', () => {
    const error = ['error 1']
    const mockState = {
        errors: {
            'type/getUser': error
        }
    }

    test('should return array of type', () => {
        const errors = selectors.selectRequestErrors(mockState, 'type/getUser')
        expect(errors).toBeInstanceOf(Array)
        expect(errors).toEqual(error)
    })

    test('should return empty array', () => {
        const errors = selectors.selectRequestErrors(mockState, 'type/doesNotExist')
        expect(errors).toBeInstanceOf(Array)
        expect(errors).toHaveLength(0)
    })

})