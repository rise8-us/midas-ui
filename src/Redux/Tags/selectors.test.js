import * as selectors from './selectors'

test('should return empty object', () => {
    expect(selectors.selectTagById({ tags: {} }, 0)).toBeInstanceOf(Object)
})

test('should return empty object', () => {
    const mockState = {
        tags: {
            0: {
                id: 0,
                label: 'Tag 1',
                description: 'description',
                color: '#FFFFFF'
            },
            1: {
                detail: 'Tag 2',
                description: 'description',
                color: '#FFFFFF'
            }
        }
    }
    expect(selectors.selectTagById(mockState, 1)).toEqual(mockState.tags[1])
})