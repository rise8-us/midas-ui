import * as reduxActions from './actions'
import reducer from './reducer'

const allApplicationsResponse = [
    {
        id: 1,
        name: 'Application1',
        isArchived: false
    }, {
        id: 2,
        name: 'Application2',
    }
]

const updatedApplication = { id: 1, name: 'foo' }
const archiveApplication = { id: 1, isArchived: true }

describe('Applications Reducer', () => {
    it('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    it('fetches all Applications', () => {
        const actions = [{ type: reduxActions.requestFetchAllApplications.fulfilled, payload: allApplicationsResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allApplicationsResponse[0])
        expect(state[2]).toEqual(allApplicationsResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    it('Create Application', () => {
        const actions = [{ type: reduxActions.requestCreateApplication.fulfilled, payload: allApplicationsResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allApplicationsResponse[0] })
    })

    it('Update Application', () => {
        const actions = [{ type: reduxActions.requestUpdateApplication.fulfilled, payload: updatedApplication }]
        const state = actions.reduce(reducer, { 1: allApplicationsResponse[0] })
        expect(state).toEqual({ 1: updatedApplication })
    })

    it('Archive Application', () => {
        const actions = [{ type: reduxActions.requestArchiveApplication.fulfilled, payload: archiveApplication }]
        const state = actions.reduce(reducer, { 1: allApplicationsResponse[0] })
        expect(state).toEqual({ 1: archiveApplication })
    })
})