import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('Target action thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    const body = { title: 'captain', description: 'foo' }

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestSearchTargets : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSearchTargets('foo'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gantt_targets?search=foo')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSearchTargets.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchTargets.fulfilled.toString())
    })

    test('requestSearchTargets : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSearchTargets('foo'))

        expect(store.getActions()[0].type).toEqual(actions.requestSearchTargets.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchTargets.rejected.toString())
    })

    test('requestCreateTarget : fulfilled', async() => {

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateTarget(body))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gantt_targets')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateTarget.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateTarget.fulfilled.toString())
    })

    test('requestCreateTarget : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateTarget({ id: 1, title: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateTarget.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateTarget.rejected.toString())
    })

    test('requestUpdateTarget : fulfilled', async() => {
        const Target = { id: 1, ...body }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateTarget(Target))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gantt_targets/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateTarget.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateTarget.fulfilled.toString())
    })

    test('requestUpdateTarget : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateTarget())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateTarget.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateTarget.rejected.toString())
    })

    test('requestDeleteTarget : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        const data = await store.dispatch(actions.requestDeleteTarget(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gantt_targets/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('DELETE')
        expect(store.getActions()[0].type).toEqual(actions.requestDeleteTarget.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteTarget.fulfilled.toString())
        expect(data.payload).toEqual({ id: 1 })
    })

    test('requestDeleteTarget : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeleteTarget(1))

        expect(store.getActions()[0].type).toEqual(actions.requestDeleteTarget.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteTarget.rejected.toString())
    })
})
