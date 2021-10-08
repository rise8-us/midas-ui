import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('Deliverable action thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    const body = { name: 'captain', description: 'foo' }

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestFetchDeliverablesByProductId : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchDeliverablesByProductId(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/deliverables?search=product.id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchDeliverablesByProductId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchDeliverablesByProductId.fulfilled.toString())
    })

    test('requestFetchDeliverablesByProductId : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchDeliverablesByProductId(1))

        expect(store.getActions()[0].type).toEqual(actions.requestFetchDeliverablesByProductId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchDeliverablesByProductId.rejected.toString())
    })

    test('requestCreateDeliverable : fulfilled', async() => {

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateDeliverable(body))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/deliverables')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateDeliverable.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateDeliverable.fulfilled.toString())
    })

    test('requestCreateDeliverable : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateDeliverable({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateDeliverable.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateDeliverable.rejected.toString())
    })

    test('requestUpdateDeliverable : fulfilled', async() => {
        const deliverable = { id: 1, ...body }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateDeliverable(deliverable))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/deliverables/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateDeliverable.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateDeliverable.fulfilled.toString())
    })

    test('requestUpdateDeliverable : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateDeliverable())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateDeliverable.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateDeliverable.rejected.toString())
    })

    test('requestUpdateDeliverablesBulk : fulfilled', async() => {
        const deliverables = [{ id: 1, ...body }]

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateDeliverablesBulk(deliverables))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/deliverables/bulk')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(deliverables)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateDeliverablesBulk.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateDeliverablesBulk.fulfilled.toString())
    })

    test('requestUpdateDeliverablesBulk : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateDeliverablesBulk())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateDeliverablesBulk.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateDeliverablesBulk.rejected.toString())
    })

    test('requestArchiveDeliverable : fulfilled', async() => {
        const deliverable = { id: 1, isArchived: true }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestArchiveDeliverable(deliverable))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/deliverables/1/archive')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ isArchived: true })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestArchiveDeliverable.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestArchiveDeliverable.fulfilled.toString())
    })

    test('requestArchiveDeliverable : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestArchiveDeliverable())

        expect(store.getActions()[0].type).toEqual(actions.requestArchiveDeliverable.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestArchiveDeliverable.rejected.toString())
    })

    test('requestDeleteDeliverable : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        const data = await store.dispatch(actions.requestDeleteDeliverable(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/deliverables/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('DELETE')
        expect(store.getActions()[0].type).toEqual(actions.requestDeleteDeliverable.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteDeliverable.fulfilled.toString())
        expect(data.payload).toEqual({ id: 1 })
    })

    test('requestDeleteDeliverable : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeleteDeliverable(1))

        expect(store.getActions()[0].type).toEqual(actions.requestDeleteDeliverable.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteDeliverable.rejected.toString())
    })
})
