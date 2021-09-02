import * as reduxActions from './actions'
import reducer from './reducer'

const allPersonasResponse = [
    {
        id: 1,
        title: 'persona1',
        description: 'description1',
        productId: 3,
        isSupported: true
    }, {
        id: 2,
        title: 'persona2',
        description: 'description2',
        productId: 3,
        isSupported: false
    }
]

const updatedPersona = {
    id: 2,
    title: 'persona2',
    description: 'description2',
    productId: 3,
    isSupported: true
}

const deletePersona = { id: 1 }

describe('Personas Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('fetches all personas', () => {
        const actions = [{ type: reduxActions.requestFetchPersonasByProductId.fulfilled, payload: allPersonasResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allPersonasResponse[0])
        expect(state[2]).toEqual(allPersonasResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('Updates Personas Bulk', () => {
        const actions = [{ type: reduxActions.requestUpdatePersonasBulk.fulfilled, payload: allPersonasResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allPersonasResponse[0])
        expect(state[2]).toEqual(allPersonasResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('Create Persona', () => {
        const actions = [{ type: reduxActions.requestCreatePersona.fulfilled, payload: allPersonasResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allPersonasResponse[0] })
    })

    test('Update Persona', () => {
        const actions = [{ type: reduxActions.requestUpdatePersona.fulfilled, payload: updatedPersona }]
        const state = actions.reduce(reducer, { 2: allPersonasResponse[1] })
        expect(state).toEqual({ 2: updatedPersona })
    })

    test('Delete Persona', () => {
        const actions = [{ type: reduxActions.requestDeletePersona.fulfilled, payload: deletePersona }]
        const state = actions.reduce(reducer, { 1: allPersonasResponse[0] })
        expect(state).toEqual({})
    })
})