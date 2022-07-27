import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('Deliverable action thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')
    const handleThunkDownloadRequest = useModuleMock('Utilities/requests', 'handleThunkDownloadRequest')
    const handleThunkRequestWithHeaders = useModuleMock('Utilities/requests', 'handleThunkRequestWithHeaders')

    const body = { fileName: 'file', filePath: 'path/file' }
    const saveRequest = { portfolio: 'portfolio', product: 'product', file: 'file' }
    const params = { portfolioName: 'portfolio', productName: 'product' }

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestGetFile : fulfilled', async() => {
        handleThunkDownloadRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestGetFile(body))

        expect(handleThunkDownloadRequest.mock.calls[0][0].endpoint).toContain('/api/filemanager/download')
        expect(handleThunkDownloadRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkDownloadRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestGetFile.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetFile.fulfilled.toString())
    })

    test('requestSearchDeliverables : rejected', async() => {
        handleThunkDownloadRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestGetFile(body))

        expect(store.getActions()[0].type).toEqual(actions.requestGetFile.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetFile.rejected.toString())
    })

    test('requestSaveFile : fulfilled', async() => {
        handleThunkRequestWithHeaders.mockResolvedValueOnce()
        await store.dispatch(actions.requestSaveFile(saveRequest))

        expect(handleThunkRequestWithHeaders.mock.calls[0][0].endpoint).toContain('/api/filemanager/upload')
        expect(handleThunkRequestWithHeaders.mock.calls[0][0].body).toEqual(saveRequest.file)
        expect(handleThunkRequestWithHeaders.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestSaveFile.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSaveFile.fulfilled.toString())
    })

    test('requestSaveFile : rejected', async() => {
        handleThunkRequestWithHeaders.mockRejectedValueOnce()
        await store.dispatch(actions.requestSaveFile(saveRequest))

        expect(store.getActions()[0].type).toEqual(actions.requestSaveFile.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSaveFile.rejected.toString())
    })

    test('requestGetFileNames : fulfilled', async() => {

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestGetFileNames(params))

        expect(handleThunkRequest.mock.calls[0][0].endpoint)
            .toContain('/api/filemanager/files/?portfolio=portfolio&product=product')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestGetFileNames.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetFileNames.fulfilled.toString())
    })

    test('requestGetFileNames : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestGetFileNames(params))

        expect(store.getActions()[0].type).toEqual(actions.requestGetFileNames.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetFileNames.rejected.toString())
    })

    test('requestDeleteFile : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestDeleteFile(body))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/filemanager/delete')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('DELETE')
        expect(store.getActions()[0].type).toEqual(actions.requestDeleteFile.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteFile.fulfilled.toString())
    })

    test('requestDeleteFile : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeleteFile(body))

        expect(store.getActions()[0].type).toEqual(actions.requestDeleteFile.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteFile.rejected.toString())
    })

})
