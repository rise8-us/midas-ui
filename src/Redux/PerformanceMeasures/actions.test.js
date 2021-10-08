import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('PerformanceMeasures action thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    const body = { name: 'captain', description: 'foo' }

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestSearchPerformanceMeasures : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSearchPerformanceMeasures('product.id:1'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/performancemeasures?search=product.id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSearchPerformanceMeasures.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchPerformanceMeasures.fulfilled.toString())
    })

    test('requestSearchPerformanceMeasures : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSearchPerformanceMeasures('product.id:1'))

        expect(store.getActions()[0].type).toEqual(actions.requestSearchPerformanceMeasures.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchPerformanceMeasures.rejected.toString())
    })

    test('requestCreatePerformanceMeasure : fulfilled', async() => {

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreatePerformanceMeasure(body))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/performancemeasures')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreatePerformanceMeasure.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreatePerformanceMeasure.fulfilled.toString())
    })

    test('requestCreatePerformanceMeasure : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreatePerformanceMeasure({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreatePerformanceMeasure.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreatePerformanceMeasure.rejected.toString())
    })

    test('requestUpdatePerformanceMeasure : fulfilled', async() => {
        const deliverable = { id: 1, ...body }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdatePerformanceMeasure(deliverable))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/performancemeasures/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdatePerformanceMeasure.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdatePerformanceMeasure.fulfilled.toString())
    })

    test('requestUpdatePerformanceMeasure : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdatePerformanceMeasure())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdatePerformanceMeasure.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdatePerformanceMeasure.rejected.toString())
    })

    test('requestUpdatePerformanceMeasuresBulk : fulfilled', async() => {
        const deliverables = [{ id: 1, ...body }]

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdatePerformanceMeasuresBulk(deliverables))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/performancemeasures/bulk')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(deliverables)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdatePerformanceMeasuresBulk.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdatePerformanceMeasuresBulk.fulfilled.toString())
    })

    test('requestUpdatePerformanceMeasuresBulk : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdatePerformanceMeasuresBulk())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdatePerformanceMeasuresBulk.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdatePerformanceMeasuresBulk.rejected.toString())
    })

    test('requestDeletePerformanceMeasure : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        const data = await store.dispatch(actions.requestDeletePerformanceMeasure(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/performancemeasures/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('DELETE')
        expect(store.getActions()[0].type).toEqual(actions.requestDeletePerformanceMeasure.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeletePerformanceMeasure.fulfilled.toString())
        expect(data.payload).toEqual({ id: 1 })
    })

    test('requestDeletePerformanceMeasure : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeletePerformanceMeasure(1))

        expect(store.getActions()[0].type).toEqual(actions.requestDeletePerformanceMeasure.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeletePerformanceMeasure.rejected.toString())
    })
})
