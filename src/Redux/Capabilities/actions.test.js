import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('Capability action thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    const body = { name: 'captain', description: 'foo' }

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestSearchCapabilities : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSearchCapabilities('product.id:1'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/capabilities?search=product.id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSearchCapabilities.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchCapabilities.fulfilled.toString())
    })

    test('requestSearchCapabilities : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSearchCapabilities(1))

        expect(store.getActions()[0].type).toEqual(actions.requestSearchCapabilities.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchCapabilities.rejected.toString())
    })

    test('requestCreateCapability : fulfilled', async() => {

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateCapability(body))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/capabilities')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateCapability.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateCapability.fulfilled.toString())
    })

    test('requestCreateCapability : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateCapability({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateCapability.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateCapability.rejected.toString())
    })

    test('requestUpdateCapability : fulfilled', async() => {
        const capability = { id: 1, ...body }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateCapability(capability))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/capabilities/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateCapability.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateCapability.fulfilled.toString())
    })

    test('requestUpdateCapability : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateCapability())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateCapability.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateCapability.rejected.toString())
    })

    test('requestUpdateCapabilitiesBulk : fulfilled', async() => {
        const capabilities = [{ id: 1, ...body }]

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateCapabilitiesBulk(capabilities))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/capabilities/bulk')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(capabilities)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateCapabilitiesBulk.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateCapabilitiesBulk.fulfilled.toString())
    })

    test('requestUpdateCapabilitiesBulk : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateCapabilitiesBulk())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateCapabilitiesBulk.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateCapabilitiesBulk.rejected.toString())
    })

    test('requestArchiveCapability : fulfilled', async() => {
        const capability = { id: 1, isArchived: true }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestArchiveCapability(capability))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/capabilities/1/archive')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ isArchived: true })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestArchiveCapability.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestArchiveCapability.fulfilled.toString())
    })

    test('requestArchiveCapability : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestArchiveCapability())

        expect(store.getActions()[0].type).toEqual(actions.requestArchiveCapability.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestArchiveCapability.rejected.toString())
    })

    test('requestDeleteCapability : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        const data = await store.dispatch(actions.requestDeleteCapability(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/capabilities/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('DELETE')
        expect(store.getActions()[0].type).toEqual(actions.requestDeleteCapability.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteCapability.fulfilled.toString())
        expect(data.payload).toEqual({ id: 1 })
    })

    test('requestDeleteCapability : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeleteCapability(1))

        expect(store.getActions()[0].type).toEqual(actions.requestDeleteCapability.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteCapability.rejected.toString())
    })
})
