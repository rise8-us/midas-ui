import reducer from './reducer'

describe('Error Reducer', () => {
    it('should handle fulfilled', () => {
        expect(
            reducer({}, { type: 'Foo/Bar/fulfilled', payload: {} })
        ).toEqual({
            'Foo/Bar': []
        })
    })
    it('should handle rejected (array)', () => {
        expect(
            reducer({}, { type: 'Foo/Bar/rejected', payload: ['Error 1'] })
        ).toEqual({
            'Foo/Bar': ['Error 1']
        })
    })

    it('should handle rejected (object)', () => {
        expect(
            reducer({}, { type: 'Foo/Bar/rejected', payload: 'Error 1' })
        ).toEqual({
            'Foo/Bar': ['Error 1']
        })
    })

    it('should handle rejected (unknown)', () => {
        expect(
            reducer({}, { type: 'Foo/Bar/rejected', error: { message: 'Error 1' } })
        ).toEqual({
            'Foo/Bar': ['Error 1']
        })
    })

})