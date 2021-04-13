import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from '../../Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('Application action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    it('requestFetchAllApplications : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchAllApplications())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/applications')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllApplications.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllApplications.fulfilled.toString())
    })

    it('requestFetchAllApplications : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchAllApplications())

        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllApplications.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllApplications.rejected.toString())
    })

    it('requestCreateApplication : fulfilled', async() => {
        const Application = { name: 'starship9', description: 'foo' }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateApplication(Application))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/applications')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(Application)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateApplication.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateApplication.fulfilled.toString())
    })

    it('requestCreateApplication : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateApplication({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateApplication.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateApplication.rejected.toString())
    })

    it('requestUpdateApplication : fulfilled', async() => {
        const requestBody = { name: 'starship9', description: 'foo' }
        const Application = { id: 1, ...requestBody }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateApplication(Application))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/applications/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(requestBody)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateApplication.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateApplication.fulfilled.toString())
    })

    it('requestUpdateApplication : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateApplication())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateApplication.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateApplication.rejected.toString())
    })

    it('requestArchiveApplication : fulfilled', async() => {
        const requestBody = {  id: 1, isArchived: false }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestArchiveApplication(requestBody))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/applications/1/admin/archive')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ isArchived: false })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestArchiveApplication.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestArchiveApplication.fulfilled.toString())
    })

    it('requestArchiveApplication : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestArchiveApplication())

        expect(store.getActions()[0].type).toEqual(actions.requestArchiveApplication.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestArchiveApplication.rejected.toString())
    })


})
