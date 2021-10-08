import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('MissionThreads action thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    const body = { name: 'captain', description: 'foo' }

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestSearchMissionThreads : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSearchMissionThreads('product.id:1'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/missionthreads?search=product.id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSearchMissionThreads.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchMissionThreads.fulfilled.toString())
    })

    test('requestSearchMissionThreads : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSearchMissionThreads('product.id:1'))

        expect(store.getActions()[0].type).toEqual(actions.requestSearchMissionThreads.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchMissionThreads.rejected.toString())
    })

    test('requestCreateMissionThread : fulfilled', async() => {

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateMissionThread(body))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/missionthreads')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateMissionThread.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateMissionThread.fulfilled.toString())
    })

    test('requestCreateMissionThread : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateMissionThread({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateMissionThread.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateMissionThread.rejected.toString())
    })

    test('requestUpdateMissionThread : fulfilled', async() => {
        const deliverable = { id: 1, ...body }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateMissionThread(deliverable))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/missionthreads/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateMissionThread.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateMissionThread.fulfilled.toString())
    })

    test('requestUpdateMissionThread : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateMissionThread())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateMissionThread.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateMissionThread.rejected.toString())
    })

    test('requestUpdateMissionThreadsBulk : fulfilled', async() => {
        const deliverables = [{ id: 1, ...body }]

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateMissionThreadsBulk(deliverables))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/missionthreads/bulk')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(deliverables)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateMissionThreadsBulk.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateMissionThreadsBulk.fulfilled.toString())
    })

    test('requestUpdateMissionThreadsBulk : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateMissionThreadsBulk())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateMissionThreadsBulk.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateMissionThreadsBulk.rejected.toString())
    })

    test('requestDeleteMissionThread : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        const data = await store.dispatch(actions.requestDeleteMissionThread(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/missionthreads/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('DELETE')
        expect(store.getActions()[0].type).toEqual(actions.requestDeleteMissionThread.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteMissionThread.fulfilled.toString())
        expect(data.payload).toEqual({ id: 1 })
    })

    test('requestDeleteMissionThread : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeleteMissionThread(1))

        expect(store.getActions()[0].type).toEqual(actions.requestDeleteMissionThread.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteMissionThread.rejected.toString())
    })
})
