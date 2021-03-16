import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from '../../Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})
const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('Info action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    it('requestFetchInitInfo : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchInitInfo())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/init/info')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({})
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchInitInfo.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchInitInfo.fulfilled.toString())
    })

    it('requestFetchInitInfo : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchInitInfo())

        expect(store.getActions()[0].type).toEqual(actions.requestFetchInitInfo.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchInitInfo.rejected.toString())
    })

    it('requestFetchInitUser : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchInitUser())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/init/user')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({})
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchInitUser.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchInitUser.fulfilled.toString())
    })

    it('requestFetchInitUser : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchInitUser())

        expect(store.getActions()[0].type).toEqual(actions.requestFetchInitUser.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchInitUser.rejected.toString())
    })
})
