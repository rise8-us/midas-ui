import * as selectors from './selectors'

const mockState = {
    personas: {
        2: {
            id: 2,
            productId: 1,
            title: 'title',
            description: 'description',
            isSupported: false
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

test('selectPersonaById - returns default persona object', () => {
    const personas = selectors.selectPersonaById({ personas: {} }, 1)

    expect(personas).toEqual({ title: '', description: '', isSupported: false })
})

test('selectPersonaById - returns persona object', () => {
    const persona = selectors.selectPersonaById(mockState, 2)

    expect(persona).toEqual(mockState.personas[2])
})


test('selectPersonasByProductId - returns empty array', () => {
    const personas = selectors.selectPersonasByProductId({}, 1)

    expect(personas).toHaveLength(0)
})

test('selectPersonasByProductId - returns array of personas', () => {
    const personas = selectors.selectPersonasByProductId(mockState, 1)

    expect(personas).toHaveLength(3)
})
