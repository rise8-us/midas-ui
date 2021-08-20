import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('Roadmap action thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    const body = { name: 'captain', description: 'foo' }

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestFetchRoadmapsByProductId : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchRoadmapsByProductId(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/roadmaps?search=product.id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchRoadmapsByProductId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchRoadmapsByProductId.fulfilled.toString())
    })

    test('requestFetchRoadmapsByProductId : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchRoadmapsByProductId(1))

        expect(store.getActions()[0].type).toEqual(actions.requestFetchRoadmapsByProductId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchRoadmapsByProductId.rejected.toString())
    })

    test('requestCreateRoadmap : fulfilled', async() => {

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateRoadmap(body))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/roadmaps')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateRoadmap.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateRoadmap.fulfilled.toString())
    })

    test('requestCreateRoadmap : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateRoadmap({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateRoadmap.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateRoadmap.rejected.toString())
    })

    test('requestUpdateRoadmap : fulfilled', async() => {
        const roadmap = { id: 1, ...body }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateRoadmap(roadmap))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/roadmaps/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateRoadmap.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateRoadmap.fulfilled.toString())
    })

    test('requestUpdateRoadmap : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateRoadmap())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateRoadmap.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateRoadmap.rejected.toString())
    })

    test('requestDeleteRoadmap : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        const data = await store.dispatch(actions.requestDeleteRoadmap(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/roadmaps/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('DELETE')
        expect(store.getActions()[0].type).toEqual(actions.requestDeleteRoadmap.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteRoadmap.fulfilled.toString())
        expect(data.payload).toEqual({ id: 1 })
    })

    test('requestDeleteRoadmap : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeleteRoadmap(1))

        expect(store.getActions()[0].type).toEqual(actions.requestDeleteRoadmap.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteRoadmap.rejected.toString())
    })
})
