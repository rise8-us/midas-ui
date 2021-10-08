import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('Comment action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestGetBackupAsString : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestGetBackupAsString())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/dbActions/backupString')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({})
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestGetBackupAsString.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetBackupAsString.fulfilled.toString())
    })

    test('requestGetBackupAsString : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestGetBackupAsString())

        expect(store.getActions()[0].type).toEqual(actions.requestGetBackupAsString.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetBackupAsString.rejected.toString())
    })

    test('requestPostBackupAsJson : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestPostBackupAsJson('test'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/dbActions/restoreJSON')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ mysqlDump: 'test' })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestPostBackupAsJson.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestPostBackupAsJson.fulfilled.toString())
    })

    test('requestPostBackupAsJson : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestPostBackupAsJson())

        expect(store.getActions()[0].type).toEqual(actions.requestPostBackupAsJson.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestPostBackupAsJson.rejected.toString())
    })
})
