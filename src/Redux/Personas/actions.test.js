import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('Persona action thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    const body = { name: 'captain', description: 'foo' }

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestFetchPersonasByProductId : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchPersonasByProductId(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/personas?search=product.id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchPersonasByProductId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchPersonasByProductId.fulfilled.toString())
    })

    test('requestFetchPersonasByProductId : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchPersonasByProductId(1))

        expect(store.getActions()[0].type).toEqual(actions.requestFetchPersonasByProductId.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchPersonasByProductId.rejected.toString())
    })

    test('requestCreatePersona : fulfilled', async() => {

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreatePersona(body))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/personas')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreatePersona.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreatePersona.fulfilled.toString())
    })

    test('requestCreatePersona : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreatePersona({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreatePersona.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreatePersona.rejected.toString())
    })

    test('requestUpdatePersona : fulfilled', async() => {
        const persona = { id: 1, ...body }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdatePersona(persona))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/personas/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(body)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdatePersona.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdatePersona.fulfilled.toString())
    })

    test('requestUpdatePersona : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdatePersona())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdatePersona.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdatePersona.rejected.toString())
    })

    test('requestDeletePersona : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        const data = await store.dispatch(actions.requestDeletePersona(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/personas/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('DELETE')
        expect(store.getActions()[0].type).toEqual(actions.requestDeletePersona.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeletePersona.fulfilled.toString())
        expect(data.payload).toEqual({ id: 1 })
    })

    test('requestDeletePersona : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeletePersona(1))

        expect(store.getActions()[0].type).toEqual(actions.requestDeletePersona.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeletePersona.rejected.toString())
    })
})
