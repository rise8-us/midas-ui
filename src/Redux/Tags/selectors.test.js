import * as selectors from './selectors'

const mockState = {
    tags: {
        0: {
            id: 0,
            label: 'Tag 1',
            description: 'description',
            color: '#FFFFFF'
        },
        1: {
            id: 1,
            detail: 'Tag 2',
            description: 'description',
            color: '#FFFFFF'
        }
    }
}

test('should return empty object', () => {
    expect(selectors.selectTagById({ tags: {} }, 0)).toBeInstanceOf(Object)
})

test('should return empty object', () => {
    expect(selectors.selectTagById(mockState, 1)).toEqual(mockState.tags[1])
})

test('should return empty array', () => {
    const tagsByIds = selectors.selectTagsByIds(mockState, [])

    expect(tagsByIds).toBeInstanceOf(Array)
    expect(tagsByIds).toHaveLength(0)
})

test('should return array of tag', () => {
    const tagsByIds = selectors.selectTagsByIds(mockState, [1])

    expect(tagsByIds).toBeInstanceOf(Array)
    expect(tagsByIds).toHaveLength(1)
    expect(tagsByIds[0]).toEqual(mockState.tags[1])
})