import * as reduxActions from './actions'
import reducer from './reducer'

const allProjectsResponse = [
    {
        id: 1,
        name: 'project1',
        projectJourneyMap: 1,
        isArchived: false
    }, {
        id: 2,
        name: 'project2',
        projectJourneyMap: 1
    }
]

const updatedProject = { id: 1, name: 'foo' }
const updatedProjectJourney = { id: 1, projectJourneyMap: 2 }
const archiveProject = { id: 1, isArchived: false }

describe('Projects Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('fetches all projects', () => {
        const actions = [{ type: reduxActions.requestFetchAllProjects.fulfilled, payload: allProjectsResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allProjectsResponse[0])
        expect(state[2]).toEqual(allProjectsResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('Create Project', () => {
        const actions = [{ type: reduxActions.requestCreateProject.fulfilled, payload: allProjectsResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allProjectsResponse[0] })
    })

    test('Update Project', () => {
        const actions = [{ type: reduxActions.requestUpdateProject.fulfilled, payload: updatedProject }]
        const state = actions.reduce(reducer, { 1: allProjectsResponse[0] })
        expect(state).toEqual({ 1: updatedProject })
    })

    test('Update Project Journey', () => {
        const actions = [{ type: reduxActions.requestUpdateJourneyMapById.fulfilled, payload: updatedProjectJourney }]
        const state = actions.reduce(reducer, { 1: allProjectsResponse[0] })
        expect(state).toEqual({ 1: updatedProjectJourney })
    })

    test('Archive Project', () => {
        const actions = [{ type: reduxActions.requestArchiveProject.fulfilled, payload: archiveProject }]
        const state = actions.reduce(reducer, { 1: allProjectsResponse[0] })
        expect(state).toEqual({ 1: archiveProject })
    })
})