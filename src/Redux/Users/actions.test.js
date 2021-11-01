import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})
const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('User action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestGetOneUser : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchOneUser(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/users/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({})
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchOneUser.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchOneUser.fulfilled.toString())
    })

    test('requestGetOneUser : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchOneUser(1))

        expect(store.getActions()[0].type).toEqual(actions.requestFetchOneUser.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchOneUser.rejected.toString())
    })

    test('requestUpdateUser : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateUser({ id: 1, username: 'yoda' }))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/users/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ username: 'yoda' })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateUser.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateUser.fulfilled.toString())
    })

    test('requestUpdateUserRoles : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateUserRoles({ id: 1, roles: 1 }))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/users/1/roles')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ roles: 1 })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateUserRoles.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateUserRoles.fulfilled.toString())
    })

    test('requestUpdateUserRoles : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateUserRoles({ id: 1, roles: 1 }))

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateUserRoles.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateUserRoles.rejected.toString())
    })

    test('requestUpdateUser : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateUser({}))

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateUser.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateUser.rejected.toString())
    })

    test('requestFindUserBy : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFindUserBy('id:1'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/users?search=id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFindUserBy.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFindUserBy.fulfilled.toString())
    })

    test('requestFindUserBy : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFindUserBy('id:3a'))

        expect(store.getActions()[0].type).toEqual(actions.requestFindUserBy.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFindUserBy.rejected.toString())
    })
})
