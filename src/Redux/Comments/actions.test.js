import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from '../../Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('Comment action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestSearchComments : fulfilled', async() => {
        const searchRequest = 'parentId:3'
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSearchComments(searchRequest))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain(`/api/comments?search=${searchRequest}`)
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({})
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSearchComments.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchComments.fulfilled.toString())
    })

    test('requestSearchComments : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSearchComments())

        expect(store.getActions()[0].type).toEqual(actions.requestSearchComments.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchComments.rejected.toString())
    })

    test('requestCreateComment : fulfilled', async() => {
        const createRequest = { parentId: null, assertionId: 1, text: 'test' }
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateComment(createRequest))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/comments')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(createRequest)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateComment.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateComment.fulfilled.toString())
    })

    test('requestFetchAllProducts : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateComment())

        expect(store.getActions()[0].type).toEqual(actions.requestCreateComment.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateComment.rejected.toString())
    })

    test('requestUpdateComment : fulfilled', async() => {
        const updateRequest = { parentId: null, assertionId: 1, text: 'test' }
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateComment({ ...updateRequest, id: 2 }))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/comments/2')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(updateRequest)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateComment.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateComment.fulfilled.toString())
    })

    test('requestUpdateComment : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateComment())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateComment.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateComment.rejected.toString())
    })

    test('requestDeleteComment : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestDeleteComment(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/comments/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({})
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('DELETE')
        expect(store.getActions()[0].type).toEqual(actions.requestDeleteComment.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteComment.fulfilled.toString())
    })

    test('requestDeleteComment : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeleteComment())

        expect(store.getActions()[0].type).toEqual(actions.requestDeleteComment.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteComment.rejected.toString())
    })
})
