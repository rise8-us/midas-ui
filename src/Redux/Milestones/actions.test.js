import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('Milestone action thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    const body = { title: 'captain', description: 'foo' }

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestSearchMilestones : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSearchMilestones('foo'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gantt_milestones?search=foo')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSearchMilestones.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchMilestones.fulfilled.toString())
    })

    test('requestSearchMilestones : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSearchMilestones('foo'))

        expect(store.getActions()[0].type).toEqual(actions.requestSearchMilestones.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchMilestones.rejected.toString())
    })

    test('requestCreateMilestone : fulfilled', async() => {

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateMilestone(body))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gantt_milestones')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateMilestone.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateMilestone.fulfilled.toString())
    })

    test('requestCreateMilestone : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateMilestone({ id: 1, title: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateMilestone.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateMilestone.rejected.toString())
    })

    test('requestUpdateMilestone : fulfilled', async() => {
        const Milestone = { id: 1, ...body }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateMilestone(Milestone))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gantt_milestones/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateMilestone.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateMilestone.fulfilled.toString())
    })

    test('requestUpdateMilestone : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateMilestone())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateMilestone.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateMilestone.rejected.toString())
    })

    test('requestDeleteMilestone : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        const data = await store.dispatch(actions.requestDeleteMilestone(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gantt_milestones/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('DELETE')
        expect(store.getActions()[0].type).toEqual(actions.requestDeleteMilestone.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteMilestone.fulfilled.toString())
        expect(data.payload).toEqual({ id: 1 })
    })

    test('requestDeleteMilestone : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeleteMilestone(1))

        expect(store.getActions()[0].type).toEqual(actions.requestDeleteMilestone.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteMilestone.rejected.toString())
    })
})
