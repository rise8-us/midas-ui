import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')
const handleThunkDownloadRequest = useModuleMock('Utilities/requests', 'handleThunkDownloadRequest')

describe('Comment action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestGetBackupList : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestGetBackupList())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/dbActions/fileNames')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestGetBackupList.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetBackupList.fulfilled.toString())
    })

    test('requestGetBackupList : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestGetBackupList())

        expect(store.getActions()[0].type).toEqual(actions.requestGetBackupList.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetBackupList.rejected.toString())
    })

    test('requestRestore : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestRestore('fileName42'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/dbActions/restore')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ fileName: 'fileName42' })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestRestore.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestRestore.fulfilled.toString())
    })

    test('requestRestore : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestRestore())

        expect(store.getActions()[0].type).toEqual(actions.requestRestore.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestRestore.rejected.toString())
    })

    test('requestTakeBackup : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestTakeBackup())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/dbActions/backup')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({})
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestTakeBackup.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestTakeBackup.fulfilled.toString())
    })

    test('requestTakeBackup : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestTakeBackup())

        expect(store.getActions()[0].type).toEqual(actions.requestTakeBackup.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestTakeBackup.rejected.toString())
    })

    test('requestDownloadBackupFile : fulfilled', async() => {
        handleThunkDownloadRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestDownloadBackupFile('fileName42'))

        expect(handleThunkDownloadRequest.mock.calls[0][0].endpoint).toContain('/api/dbActions/download')
        expect(handleThunkDownloadRequest.mock.calls[0][0].body).toEqual({ fileName: 'fileName42' })
        expect(handleThunkDownloadRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestDownloadBackupFile.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDownloadBackupFile.fulfilled.toString())
    })

    test('requestDownloadBackupFile : rejected', async() => {
        handleThunkDownloadRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDownloadBackupFile())

        expect(store.getActions()[0].type).toEqual(actions.requestDownloadBackupFile.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDownloadBackupFile.rejected.toString())
    })
})
