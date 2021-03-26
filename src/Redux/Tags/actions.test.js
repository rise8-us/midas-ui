import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from '../../Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

describe('Tags actions', () => {
    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestCreateTag : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateTag({ details: 'this is a new tag' }))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/tags')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ details: 'this is a new tag' })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateTag.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateTag.fulfilled.toString())
    })

    test('requestCreateTag : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateTag({ details: 'this is a new tag' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateTag.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateTag.rejected.toString())
    })

    test('requestUpdateTag : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateTag({ id: 1, details: 'this is a new tag' }))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/tags/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ details: 'this is a new tag' })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateTag.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateTag.fulfilled.toString())
    })

    test('requestUpdateTag : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateTag({ id: 1, details: 'this is a new tag' }))

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateTag.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateTag.rejected.toString())
    })

    test('requestFetchAllTags : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchAllTags())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/tags')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllTags.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllTags.fulfilled.toString())
    })

    test('requestFetchAllTags : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchAllTags())

        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllTags.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllTags.rejected.toString())
    })

    test('requestDeleteTag : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        const data = await store.dispatch(actions.requestDeleteTag(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/tags/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('DELETE')
        expect(store.getActions()[0].type).toEqual(actions.requestDeleteTag.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteTag.fulfilled.toString())
        expect(data.payload).toEqual({ id: 1 })
    })

    test('requestDeleteTag : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeleteTag(1))

        expect(store.getActions()[0].type).toEqual(actions.requestDeleteTag.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteTag.rejected.toString())
    })
})
