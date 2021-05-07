import * as selectors from './selectors'

const mockState = {
    objectives: {
        creation: {
            productId: 1
        },
        12: {
            id: 12,
            productId: 2,
            assertionIds: []
        },
        13: {
            id: 13,
            productId: 2,
            assertionIds: []
        }
    }
}

test('selectObjectiveById - returns empty object', () => {
    expect(selectors.selectObjectiveById({ objectives: {} }, 2)).toBeInstanceOf(Object)
})

test('selectObjectiveById - returns objective', () => {
    const objective = selectors.selectObjectiveById(mockState, 12)

    expect(objective).toEqual(mockState.objectives[12])
})

test('selectObjectivesByProductId - returns empty array', () => {
    expect(selectors.selectObjectivesByProductId({ objectives: {} }, 2)).toBeInstanceOf(Array)
})

test('selectObjectivesByProductId - returns array of items', () => {
    const objectives = selectors.selectObjectivesByProductId(mockState, 2)

    expect(objectives).toEqual([mockState.objectives[12], mockState.objectives[13]])
})