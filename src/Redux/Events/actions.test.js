import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('Event action thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    const body = { title: 'captain', description: 'foo' }

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestSearchEvents : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSearchEvents('foo'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gantt_events?search=foo')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSearchEvents.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchEvents.fulfilled.toString())
    })

    test('requestSearchEvents : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSearchEvents('foo'))

        expect(store.getActions()[0].type).toEqual(actions.requestSearchEvents.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchEvents.rejected.toString())
    })

    test('requestCreateEvent : fulfilled', async() => {

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateEvent(body))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gantt_events')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateEvent.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateEvent.fulfilled.toString())
    })

    test('requestCreateEvent : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateEvent({ id: 1, title: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateEvent.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateEvent.rejected.toString())
    })

    test('requestUpdateEvent : fulfilled', async() => {
        const Event = { id: 1, ...body }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateEvent(Event))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gantt_events/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateEvent.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateEvent.fulfilled.toString())
    })

    test('requestUpdateEvent : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateEvent())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateEvent.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateEvent.rejected.toString())
    })

    test('requestDeleteEvent : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        const data = await store.dispatch(actions.requestDeleteEvent(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/gantt_events/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('DELETE')
        expect(store.getActions()[0].type).toEqual(actions.requestDeleteEvent.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteEvent.fulfilled.toString())
        expect(data.payload).toEqual({ id: 1 })
    })

    test('requestDeleteEvent : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeleteEvent(1))

        expect(store.getActions()[0].type).toEqual(actions.requestDeleteEvent.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteEvent.rejected.toString())
    })
})
