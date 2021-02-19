import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
jest.mock('axios')

const headers = {
    Accept: 'application/json',
    AuthProvider: 'null',
    Authorization: 'Bearer null',
    'Content-Type': 'application/json'
}
const failedResponse = {
    status: 500,
    headers: headers,
    message: 'fail',
    error: 'error 1'
}

const successResponse = {
    status: 200,
    headers: headers,
    data: { content: 'Everything is fine' }
}

describe('Info action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('requestFetchInitInfo : fulfilled', async() => {
        const store = mockStore({})
        axios.mockResolvedValueOnce(successResponse)

        await store.dispatch(actions.requestFetchInitInfo())
        expect(axios.mock.calls[0][0].url).toContain('/init/info')
        expect(axios.mock.calls[0][0].data).toEqual({})
        expect(axios.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchInitInfo.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchInitInfo.fulfilled.toString())
    })

    it('requestFetchInitInfo : rejected', async() => {
        const store = mockStore({})
        axios.get.mockRejectedValueOnce(failedResponse)

        await store.dispatch(actions.requestFetchInitInfo())
        expect(axios.mock.calls[0][0].url).toContain('/init/info')
        expect(axios.mock.calls[0][0].data).toEqual({})
        expect(axios.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchInitInfo.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchInitInfo.rejected.toString())
    })

    it('requestFetchInitUser : fulfilled', async() => {
        const store = mockStore({})
        axios.mockResolvedValueOnce(successResponse)

        await store.dispatch(actions.requestFetchInitUser())
        expect(axios.mock.calls[0][0].url).toContain('/init/user')
        expect(axios.mock.calls[0][0].data).toEqual({})
        expect(axios.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchInitUser.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchInitUser.fulfilled.toString())
    })

    it('requestFetchInitUser : rejected', async() => {
        const store = mockStore({})
        axios.get.mockRejectedValueOnce(failedResponse)

        await store.dispatch(actions.requestFetchInitUser())
        expect(axios.mock.calls[0][0].url).toContain('/init/user')
        expect(axios.mock.calls[0][0].data).toEqual({})
        expect(axios.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchInitUser.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchInitUser.rejected.toString())
    })
})
