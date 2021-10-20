import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('Epic action thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestFetchEpicsByProductId : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchEpicsByProductId())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/epics?search=product.id:')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchEpicsByProductId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchEpicsByProductId.fulfilled.toString())
    })

    test('requestFetchEpicsByProductId : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchEpicsByProductId())

        expect(store.getActions()[0].type).toEqual(actions.requestFetchEpicsByProductId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchEpicsByProductId.rejected.toString())
    })

    test('requestSyncEpicsByProductId : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSyncEpicsByProductId())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/epics/all')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSyncEpicsByProductId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSyncEpicsByProductId.fulfilled.toString())
    })

    test('requestSyncEpicsByProductId : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSyncEpicsByProductId())

        expect(store.getActions()[0].type).toEqual(actions.requestSyncEpicsByProductId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSyncEpicsByProductId.rejected.toString())
    })

    test('requestHideEpic : fulfilled', async() => {
        const requestBody = { id: 1, isHidden: false }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestHideEpic(requestBody))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/epics/1/hide')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ isHidden: false })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestHideEpic.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestHideEpic.fulfilled.toString())
    })

    test('requestHideEpic : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestHideEpic())

        expect(store.getActions()[0].type).toEqual(actions.requestHideEpic.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestHideEpic.rejected.toString())
    })

})
