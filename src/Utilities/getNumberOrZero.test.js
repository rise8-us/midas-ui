import { getNumberOrZero } from './getNumberOrZero'

test('should return number', () => {
    expect(getNumberOrZero(42)).toEqual(42)
})

test('should return zero', () => {
    expect(getNumberOrZero('NaN')).toEqual(0)
})