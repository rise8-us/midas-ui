import * as reduxActions from './actions'
import reducer from './reducer'

const allCapabilitiesResponse = [
    { id: 1 },
    {
        id: 2,
        title: 'original',
        isArchived: false
    }
]

const updatedCapability = { id: 2, title: 'updated', isArchived: false }
const archivedCapability = { id: 2, title: 'orginal', isArchived: true }
const deletedCapability = { id: 1 }

describe('Capabilities Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('search Capabilities', () => {
        const actions = [{ type: reduxActions.requestSearchCapabilities.fulfilled,
            payload: allCapabilitiesResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allCapabilitiesResponse[0])
        expect(state[2]).toEqual(allCapabilitiesResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('Updates Capabilities Bulk', () => {
        const actions = [{ type: reduxActions.requestUpdateCapabilitiesBulk.fulfilled,
            payload: allCapabilitiesResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allCapabilitiesResponse[0])
        expect(state[2]).toEqual(allCapabilitiesResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('Create Capability', () => {
        const actions = [{ type: reduxActions.requestCreateCapability.fulfilled,
            payload: allCapabilitiesResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allCapabilitiesResponse[0] })
    })

    test('Update Capability', () => {
        const actions = [{ type: reduxActions.requestUpdateCapability.fulfilled,
            payload: updatedCapability }]
        const state = actions.reduce(reducer, { 2: allCapabilitiesResponse[1] })
        expect(state).toEqual({ 2: updatedCapability })
    })

    test('Archive Capability', () => {
        const actions = [{ type: reduxActions.requestArchiveCapability.fulfilled,
            payload: archivedCapability }]
        const state = actions.reduce(reducer, { 2: allCapabilitiesResponse[1] })
        expect(state).toEqual({ 2: archivedCapability })
    })

    test('Delete Capability', () => {
        const actions = [{ type: reduxActions.requestDeleteCapability.fulfilled,
            payload: deletedCapability }]
        const state = actions.reduce(reducer, { 1: allCapabilitiesResponse[0] })
        expect(state).toEqual({})
    })
})