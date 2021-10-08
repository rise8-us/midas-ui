import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('Release action thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    const body = { name: 'captain', description: 'foo' }

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

    test('requestCreateRelease : fulfilled', async() => {

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateRelease(body))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/releases')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateRelease.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateRelease.fulfilled.toString())
    })

    test('requestCreateRelease : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateRelease({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateRelease.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateRelease.rejected.toString())
    })

    test('requestUpdateRelease : fulfilled', async() => {
        const release = { id: 1, ...body }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateRelease(release))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/releases/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateRelease.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateRelease.fulfilled.toString())
    })

    test('requestUpdateRelease : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateRelease())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateRelease.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateRelease.rejected.toString())
    })

    test('requestDeleteRelease : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        const data = await store.dispatch(actions.requestDeleteRelease(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/releases/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('DELETE')
        expect(store.getActions()[0].type).toEqual(actions.requestDeleteRelease.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteRelease.fulfilled.toString())
        expect(data.payload).toEqual({ id: 1 })
    })

    test('requestDeleteRelease : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeleteRelease(1))

        expect(store.getActions()[0].type).toEqual(actions.requestDeleteRelease.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteRelease.rejected.toString())
    })
})
