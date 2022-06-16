import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('Issue action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestSearchIssues : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSearchIssues('issue.id:1'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/issues?search=issue.id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSearchIssues.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchIssues.fulfilled.toString())
    })

    test('requestSearchIssues : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSearchIssues())

        expect(store.getActions()[0].type).toEqual(actions.requestSearchIssues.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchIssues.rejected.toString())
    })

    test('requestSyncIssuesByProjectId : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSyncIssuesByProjectId(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/issues/sync/project/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSyncIssuesByProjectId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSyncIssuesByProjectId.fulfilled.toString())
    })

    test('requestSyncIssuesByProjectId : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSyncIssuesByProjectId())

        expect(store.getActions()[0].type).toEqual(actions.requestSyncIssuesByProjectId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSyncIssuesByProjectId.rejected.toString())
    })
})