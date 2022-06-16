import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('Release action thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestSearchReleases : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSearchReleases('product.id:1'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/releases?search=product.id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSearchReleases.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchReleases.fulfilled.toString())
    })

    test('requestSearchReleases : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSearchReleases('product.id:1'))

        expect(store.getActions()[0].type).toEqual(actions.requestSearchReleases.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchReleases.rejected.toString())
    })

    test('fetchReleasesByProjectId : fulfilled', async() => {

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.fetchReleasesByProjectId(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/releases/project/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({})
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.fetchReleasesByProjectId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.fetchReleasesByProjectId.fulfilled.toString())
    })

    test('fetchReleasesByProjectId : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.fetchReleasesByProjectId(1))

        expect(store.getActions()[0].type).toEqual(actions.fetchReleasesByProjectId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.fetchReleasesByProjectId.rejected.toString())
    })

    test('fetchReleasesByProductId : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.fetchReleasesByProductId(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/releases/product/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({})
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.fetchReleasesByProductId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.fetchReleasesByProductId.fulfilled.toString())
    })

    test('fetchReleasesByProductId : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.fetchReleasesByProductId(1))

        expect(store.getActions()[0].type).toEqual(actions.fetchReleasesByProductId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.fetchReleasesByProductId.rejected.toString())
    })

    test('requestSyncReleasesByProjectId : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSyncReleasesByProjectId(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/releases/sync/project/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({})
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSyncReleasesByProjectId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSyncReleasesByProjectId.fulfilled.toString())
    })

    test('requestSyncReleasesByProjectId : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSyncReleasesByProjectId(1))

        expect(store.getActions()[0].type).toEqual(actions.requestSyncReleasesByProjectId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSyncReleasesByProjectId.rejected.toString())
    })
})
