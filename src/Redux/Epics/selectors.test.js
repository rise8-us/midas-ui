import * as selectors from './selectors'

const mockState = {
    epics: {
        2: {
            id: 2,
            productId: 1,
            title: 'title',
            description: 'description',
            index: 0
        },
        3: {
            id: 3,
            productId: 1
        },
        4: {
            id: 4,
            productId: 6
        },
        5: {
            id: 5,
            productId: 1
        }
    },
}

test('selectEpicById - returns default epic object', () => {
    const epics = selectors.selectEpicById({ epics: {} }, 1)

    expect(epics).toEqual({ title: '', description: '' })
})

test('selectEpicById - returns epic object', () => {
    const epic = selectors.selectEpicById(mockState, 2)

    expect(epic).toEqual(mockState.epics[2])
})

test('selectEpicsByProductId - returns empty array', () => {
    const epics = selectors.selectEpicsByProductId({}, 1)

    expect(epics).toHaveLength(0)
})

test('selectEpicsByProductId - returns array of epics', () => {
    const epics = selectors.selectEpicsByProductId(mockState, 1)

    expect(epics).toHaveLength(3)
})
