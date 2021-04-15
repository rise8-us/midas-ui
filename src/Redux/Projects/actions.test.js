import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from '../../Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('Project action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    it('requestFetchAllProjects : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchAllProjects())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/projects')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllProjects.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllProjects.fulfilled.toString())
    })

    it('requestFetchAllProjects : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchAllProjects())

        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllProjects.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllProjects.rejected.toString())
    })

    it('requestCreateProject : fulfilled', async() => {
        const project = { name: 'starship9', description: 'foo' }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateProject(project))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/projects')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(project)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateProject.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateProject.fulfilled.toString())
    })

    it('requestCreateProject : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateProject({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateProject.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateProject.rejected.toString())
    })

    it('requestUpdateProject : fulfilled', async() => {
        const requestBody = { name: 'starship9', description: 'foo' }
        const project = { id: 1, ...requestBody }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateProject(project))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/projects/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(requestBody)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateProject.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateProject.fulfilled.toString())
    })

    it('requestUpdateProject : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateProject())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateProject.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateProject.rejected.toString())
    })

    it('requestUpdateJourneyMapById : fulfilled', async() => {
        const requestBody = { id: 1, projectJourneyMap: 3 }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateJourneyMapById(requestBody))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/projects/1/journeymap')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ projectJourneyMap: 3 })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateJourneyMapById.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateJourneyMapById.fulfilled.toString())
    })

    it('requestUpdateJourneyMapById : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateJourneyMapById())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateJourneyMapById.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateJourneyMapById.rejected.toString())
    })

    it('requestArchiveProject : fulfilled', async() => {
        const requestBody = {  id: 1, isArchived: false }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestArchiveProject(requestBody))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/projects/1/archive')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ isArchived: false })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestArchiveProject.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestArchiveProject.fulfilled.toString())
    })

    it('requestArchiveProject : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestArchiveProject())

        expect(store.getActions()[0].type).toEqual(actions.requestArchiveProject.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestArchiveProject.rejected.toString())
    })


})
