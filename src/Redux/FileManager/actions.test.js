import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('FileManager Action Thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestGetFile : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestGetFile('foobar'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/epics?search=foobar')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestGetFile.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetFile.fulfilled.toString())
    })

    test('requestGetFile : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestGetFile())

        expect(store.getActions()[0].type).toEqual(actions.requestGetFile.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetFile.rejected.toString())
    })

    test('requestSaveFile : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSaveFile())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/epics?search=product.id:')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSaveFile.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSaveFile.fulfilled.toString())
    })

    test('requestSaveFile : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSaveFile())

        expect(store.getActions()[0].type).toEqual(actions.requestSaveFile.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSaveFile.rejected.toString())
    })

    test('requestGetFileNames : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestGetFileNames())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/epics/all')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestGetFileNames.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetFileNames.fulfilled.toString())
    })

    test('requestGetFileNames : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestGetFileNames())

        expect(store.getActions()[0].type).toEqual(actions.requestGetFileNames.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetFileNames.rejected.toString())
    })

    test('requestDeleteFile : fulfilled', async() => {
        const requestBody = { id: 1, isHidden: false }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestDeleteFile(requestBody))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/epics/1/hide')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ isHidden: false })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestDeleteFile.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteFile.fulfilled.toString())
    })

    test('requestDeleteFile : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeleteFile())

        expect(store.getActions()[0].type).toEqual(actions.requestDeleteFile.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteFile.rejected.toString())
    })

})
