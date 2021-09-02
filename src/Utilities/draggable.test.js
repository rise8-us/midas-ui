import { onDragEnd } from './draggable'

test('should return undefined no destination found', () => {
    expect(onDragEnd({}, [], jest.fn)).toEqual(undefined)
})

test('should return undefined source === destination', () => {
    expect(onDragEnd({
        source: { index: 0 },
        destination: { index: 0 },
    }, [], jest.fn)).toEqual(undefined)
})


test('should return reordered list', () => {
    const actionMock = jest.fn()

    onDragEnd({
        source: { index: 0 },
        destination: { index: 1 },
    }, ['entry 1', 'entry 2'], actionMock)

    expect(actionMock).toHaveBeenCalledWith(['entry 2', 'entry 1'])
})