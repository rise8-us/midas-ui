import reducer from './reducer'
import { closePopup } from '../Popups/actions'

test('should handle fulfilled', () => {
    expect(
        reducer({}, { type: 'Foo/Bar/fulfilled', payload: {} })
    ).toEqual({
        'Foo/Bar': []
    })
})

test('should handle rejected (array)', () => {
    expect(
        reducer({}, { type: 'Foo/Bar/rejected', payload: ['Error 1'] })
    ).toEqual({
        'Foo/Bar': ['Error 1']
    })
})

test('should handle rejected (object)', () => {
    expect(
        reducer({}, { type: 'Foo/Bar/rejected', payload: 'Error 1' })
    ).toEqual({
        'Foo/Bar': ['Error 1']
    })
})

test('should handle rejected (unknown)', () => {
    expect(
        reducer({}, { type: 'Foo/Bar/rejected', error: { message: 'Error 1' } })
    ).toEqual({
        'Foo/Bar': ['Error 1']
    })
})

test('should clear error state on popup close', () => {
    expect(
        reducer({ 'foo': ['bar'] }, { type: `${closePopup}`, payload: { name: 'foo' } })
    ).toEqual({ 'foo': [] })
})

