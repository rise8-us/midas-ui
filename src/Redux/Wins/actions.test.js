import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('Win action thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    const body = { title: 'captain', description: 'foo' }

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestSearchWins : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSearchWins('foo'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gantt_wins?search=foo')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSearchWins.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchWins.fulfilled.toString())
    })

    test('requestSearchWins : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSearchWins('foo'))

        expect(store.getActions()[0].type).toEqual(actions.requestSearchWins.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchWins.rejected.toString())
    })

    test('requestCreateWin : fulfilled', async() => {

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateWin(body))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gantt_wins')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateWin.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateWin.fulfilled.toString())
    })

    test('requestCreateWin : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateWin({ id: 1, title: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateWin.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateWin.rejected.toString())
    })

    test('requestUpdateWin : fulfilled', async() => {
        const Win = { id: 1, ...body }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateWin(Win))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gantt_wins/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateWin.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateWin.fulfilled.toString())
    })

    test('requestUpdateWin : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateWin())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateWin.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateWin.rejected.toString())
    })

    test('requestDeleteWin : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        const data = await store.dispatch(actions.requestDeleteWin(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gantt_wins/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('DELETE')
        expect(store.getActions()[0].type).toEqual(actions.requestDeleteWin.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteWin.fulfilled.toString())
        expect(data.payload).toEqual({ id: 1 })
    })

    test('requestDeleteWin : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeleteWin(1))

        expect(store.getActions()[0].type).toEqual(actions.requestDeleteWin.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteWin.rejected.toString())
    })
})
