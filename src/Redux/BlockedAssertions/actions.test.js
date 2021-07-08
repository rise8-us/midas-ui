import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from '../../Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('blockedAssertions action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestFetchAllBlockedAssertions : fulfilled - no id', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchAllBlockedAssertions())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/assertions/blockers')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllBlockedAssertions.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllBlockedAssertions.fulfilled.toString())
    })

    test('requestFetchAllBlockedAssertions : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchAllBlockedAssertions())

        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllBlockedAssertions.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllBlockedAssertions.rejected.toString())
    })

})
