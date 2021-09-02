import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('Feature action thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    const body = { name: 'captain', description: 'foo' }

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestFetchFeaturesByProductId : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchFeaturesByProductId(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/features?search=product.id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchFeaturesByProductId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchFeaturesByProductId.fulfilled.toString())
    })

    test('requestFetchFeaturesByProductId : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchFeaturesByProductId(1))

        expect(store.getActions()[0].type).toEqual(actions.requestFetchFeaturesByProductId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchFeaturesByProductId.rejected.toString())
    })

    test('requestCreateFeature : fulfilled', async() => {

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateFeature(body))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/features')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateFeature.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateFeature.fulfilled.toString())
    })

    test('requestCreateFeature : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateFeature({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateFeature.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateFeature.rejected.toString())
    })

    test('requestUpdateFeature : fulfilled', async() => {
        const feature = { id: 1, ...body }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateFeature(feature))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/features/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateFeature.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateFeature.fulfilled.toString())
    })

    test('requestUpdateFeature : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateFeature())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateFeature.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateFeature.rejected.toString())
    })

    test('requestUpdateFeaturesBulk : fulfilled', async() => {
        const features = [{ id: 1, ...body }]

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateFeaturesBulk(features))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/features/bulk')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(features)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateFeaturesBulk.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateFeaturesBulk.fulfilled.toString())
    })

    test('requestUpdateFeaturesBulk : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateFeaturesBulk())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateFeaturesBulk.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateFeaturesBulk.rejected.toString())
    })

    test('requestDeleteFeature : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        const data = await store.dispatch(actions.requestDeleteFeature(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/features/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('DELETE')
        expect(store.getActions()[0].type).toEqual(actions.requestDeleteFeature.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteFeature.fulfilled.toString())
        expect(data.payload).toEqual({ id: 1 })
    })

    test('requestDeleteFeature : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeleteFeature(1))

        expect(store.getActions()[0].type).toEqual(actions.requestDeleteFeature.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteFeature.rejected.toString())
    })
})
