import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})
const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

afterEach(() => {
    jest.clearAllMocks()
    store.clearActions()
})

test('requestFetchInit : fulfilled', async() => {
    handleThunkRequest.mockResolvedValueOnce()
    await store.dispatch(actions.requestFetchInit())

    expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/init')
    expect(handleThunkRequest.mock.calls[0][0].body).toEqual({})
    expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
    expect(store.getActions()[0].type).toEqual(actions.requestFetchInit.pending.toString())
    expect(store.getActions()[1].type).toEqual(actions.requestFetchInit.fulfilled.toString())
})

test('requestFetchInit : rejected', async() => {
    handleThunkRequest.mockRejectedValueOnce()
    await store.dispatch(actions.requestFetchInit())

    expect(store.getActions()[0].type).toEqual(actions.requestFetchInit.pending.toString())
    expect(store.getActions()[1].type).toEqual(actions.requestFetchInit.rejected.toString())
})
