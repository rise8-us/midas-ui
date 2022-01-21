import * as reduxActions from './actions'
import reducer from './reducer'

const allDeliverablesResponse = [
    { id: 1, children: [] },
    {
        id: 2,
        title: 'original',
        isArchived: false,
        children: []
    }
]

const updatedDeliverable = { id: 2, title: 'updated', isArchived: false, children: [] }
const archivedDeliverable = { id: 2, title: 'orginal', isArchived: true, children: [] }
const deletedDeliverable = { id: 1 }

describe('Deliverables Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('fetches all Deliverables by Search', () => {
        const actions = [{ type: reduxActions.requestSearchDeliverables.fulfilled, payload: allDeliverablesResponse }]
        const state = actions.reduce(reducer, {})

        expect(Object.keys(state)).toHaveLength(2)
    })

    test('fetches all Deliverables by Product Id', () => {
        const actions = [{ type: reduxActions.requestFetchDeliverablesByProductId.fulfilled,
            payload: allDeliverablesResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allDeliverablesResponse[0])
        expect(state[2]).toEqual(allDeliverablesResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('Updates Deliverables Bulk', () => {
        const actions = [{ type: reduxActions.requestUpdateDeliverablesBulk.fulfilled,
            payload: allDeliverablesResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allDeliverablesResponse[0])
        expect(state[2]).toEqual(allDeliverablesResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('Create Deliverable', () => {
        const actions = [{ type: reduxActions.requestCreateDeliverable.fulfilled,
            payload: allDeliverablesResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allDeliverablesResponse[0] })
    })

    test('Update Deliverable', () => {
        const actions = [{ type: reduxActions.requestUpdateDeliverable.fulfilled,
            payload: updatedDeliverable }]
        const state = actions.reduce(reducer, { 2: allDeliverablesResponse[1] })
        expect(state).toEqual({ 2: updatedDeliverable })
    })

    test('Archive Deliverable', () => {
        const actions = [{ type: reduxActions.requestArchiveDeliverable.fulfilled,
            payload: archivedDeliverable }]
        const state = actions.reduce(reducer, { 2: allDeliverablesResponse[1] })
        expect(state).toEqual({ 2: archivedDeliverable })
    })

    test('Delete Deliverable', () => {
        const actions = [{ type: reduxActions.requestDeleteDeliverable.fulfilled,
            payload: deletedDeliverable }]
        const state = actions.reduce(reducer, { 1: allDeliverablesResponse[0] })
        expect(state).toEqual({})
    })
})