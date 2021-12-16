import * as selectors from './selectors'

const mockState = {
    capabilities: {
        1434: {
            id: 1434,
            creationDate: '2021-12-16T15:56:17',
            title: 'I am a Test Title',
            description: 'Stuff and things for stuff and things.',
        },
        1435: {
            id: 1435,
            creationDate: '2021-12-16T15:56:31',
            title: 'This is a Senior Test',
            description: 'There are many like it but this one is mine.',
        },
        1436: {
            id: 1436,
            creationDate: '2021-12-16T15:56:35',
            title: 'Testification',
            description: 'Tell us about your testing experience!',
        }
    }
}

test('selectAllCapabilityIds - returns array with ids', () => {
    const results = selectors.selectAllCapabilityIds(mockState)

    expect(results).toBeInstanceOf(Array)
    expect(results).toEqual([1434, 1435, 1436])
    expect(results).toHaveLength(3)
})

