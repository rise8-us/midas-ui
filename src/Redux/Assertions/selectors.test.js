import * as selectors from './selectors'

const mockState = {
    assertions: {
        12: {
            id: 12,
            objectiveId: 2,
            parentId: null,
            type: 'FOO'
        },
        13: {
            id: 13,
            objectiveId: 2,
            parentId: 12,
            type: 'BAR'
        }
    }
}

test('selectAssertionById - returns empty object', () => {
    expect(selectors.selectAssertionById({ assertions: {} }, 2)).toBeInstanceOf(Object)
})

test('selectAssertionById - returns assertion', () => {
    const assertion = selectors.selectAssertionById(mockState, 12)

    expect(assertion).toEqual(mockState.assertions[12])
})

test('selectAssertionsByObjectiveIdAndType - returns empty array', () => {
    expect(selectors.selectAssertionsByObjectiveIdAndType({ assertions: {} }, 2, 'FOOBAR')).toBeInstanceOf(Array)
})

test('selectAssertionsByObjectiveIdAndType - returns array of items', () => {
    const assertions = selectors.selectAssertionsByObjectiveIdAndType(mockState, 2, 'foo')

    expect(assertions).toEqual([mockState.assertions[12]])
})

test('selectAssertionsByParentId - returns empty array', () => {
    expect(selectors.selectAssertionsByParentId({ assertions: {} }, 3)).toBeInstanceOf(Array)
})

test('selectAssertionsByParentId - returns array of items', () => {
    const assertions = selectors.selectAssertionsByParentId(mockState, 12)

    expect(assertions).toEqual([mockState.assertions[13]])
})