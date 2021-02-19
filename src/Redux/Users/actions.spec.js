import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

jest.mock('axios')

describe('User action thunks', () => {
    const headers = {
        Accept: 'application/json',
        AuthProvider: 'null',
        Authorization: 'Bearer null',
        'Content-Type': 'application/json'
    }
    const responsePayload = { content: 'Everything is fine' }

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    it('requestGetOneUser : fulfilled', async() => {
        const response = {
            status: 200,
            headers: headers,
            data: responsePayload
        }
        axios.mockResolvedValueOnce(response)

        await store.dispatch(actions.requestFetchOneUser(1))
        expect(axios.mock.calls[0][0].url).toContain('/api/users/1')
        expect(axios.mock.calls[0][0].data).toEqual({})
        expect(axios.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchOneUser.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchOneUser.fulfilled.toString())
    })

    it('requestGetOneUser : rejected', async() => {
        const response = {
            status: 500,
            headers: headers,
            message: 'fail',
            error: 'error 1'
        }
        axios.get.mockRejectedValueOnce(response)

        await store.dispatch(actions.requestFetchOneUser(1))
        expect(axios.mock.calls[0][0].url).toContain('/api/users/1')
        expect(axios.mock.calls[0][0].data).toEqual({})
        expect(axios.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchOneUser.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchOneUser.rejected.toString())
    })

    it('requestUpdateUser : fulfilled', async() => {
        const data = { id: 1, username: 'yoda' }
        const response = {
            status: 200,
            headers: headers,
            data: data
        }
        axios.mockResolvedValueOnce(response)

        await store.dispatch(actions.requestUpdateUser(data))
        expect(axios.mock.calls[0][0].url).toContain('/api/users/1')
        expect(axios.mock.calls[0][0].data).toEqual({ username: 'yoda' })
        expect(axios.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateUser.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateUser.fulfilled.toString())
    })

    it('requestUpdateUserRoles : fulfilled', async() => {
        const data = { id: 1, username: 'yoda' }
        const response = {
            status: 200,
            headers: headers,
            data: data
        }
        axios.mockResolvedValueOnce(response)

        await store.dispatch(actions.requestUpdateUserRoles({ id: 1, roles: 1 }))
        expect(axios.mock.calls[0][0].url).toContain('/api/users/1/admin/roles')
        expect(axios.mock.calls[0][0].data).toEqual({ roles: 1 })
        expect(axios.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateUserRoles.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateUserRoles.fulfilled.toString())
    })

    it('requestUpdateUserRoles : rejected', async() => {
        const response = {
            status: 500,
            headers: headers,
            message: 'fail',
            error: 'error 1'
        }
        axios.get.mockRejectedValueOnce(response)

        await store.dispatch(actions.requestUpdateUserRoles({ id: 1, roles: 1 }))
        expect(axios.mock.calls[0][0].url).toContain('/api/users/1/admin/roles')
        expect(axios.mock.calls[0][0].data).toEqual({ roles: 1 })
        expect(axios.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateUserRoles.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateUserRoles.rejected.toString())
    })

    it('requestUpdateUser : rejected', async() => {
        const data = { username: 'yoda' }
        const response = {
            status: 500,
            headers: headers,
            message: 'fail',
            error: 'error 1'
        }
        axios.get.mockRejectedValueOnce(response)

        await store.dispatch(actions.requestUpdateUser({ id: 1, ...data }))
        expect(axios.mock.calls[0][0].url).toContain('/api/users/1')
        expect(axios.mock.calls[0][0].data).toEqual(data)
        expect(axios.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateUser.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateUser.rejected.toString())
    })

    it('requestFindUserBy : fulfilled', async() => {
        const data = { id: 1, username: 'yoda' }
        const response = {
            status: 200,
            headers: headers,
            data: data
        }
        axios.mockResolvedValueOnce(response)

        await store.dispatch(actions.requestFindUserBy('id:1'))
        expect(axios.mock.calls[0][0].url).toContain('/api/users?search=id:1')
        expect(axios.mock.calls[0][0].data).toEqual({ })
        expect(axios.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFindUserBy.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFindUserBy.fulfilled.toString())
    })

    it('requestFindUserBy : rejected', async() => {
        const response = {
            status: 500,
            headers: headers,
            message: 'fail',
            error: 'error 1'
        }
        axios.get.mockRejectedValueOnce(response)

        await store.dispatch(actions.requestFindUserBy('id:3a'))
        expect(axios.mock.calls[0][0].url).toContain('/api/users?search=id:3a')
        expect(axios.mock.calls[0][0].data).toEqual({ })
        expect(axios.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFindUserBy.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFindUserBy.rejected.toString())
    })
})
