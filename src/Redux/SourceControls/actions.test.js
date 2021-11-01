import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('Config action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestFetchAllSourceControls : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchAllSourceControls())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/sourceControls')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllSourceControls.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllSourceControls.fulfilled.toString())
    })

    test('requestFetchAllSourceControls : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchAllSourceControls())

        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllSourceControls.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllSourceControls.rejected.toString())
    })

    test('requestCreateSourceControl : fulfilled', async() => {
        const config = { name: 'starship9', description: 'foo' }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateSourceControl(config))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/sourceControls')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(config)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateSourceControl.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateSourceControl.fulfilled.toString())
    })

    test('requestCreateSourceControl : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateSourceControl({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateSourceControl.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateSourceControl.rejected.toString())
    })

    test('requestUpdateSourceControl : fulfilled', async() => {
        const requestBody = { name: 'starship9', description: 'foo' }
        const config = { id: 1, ...requestBody }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateSourceControl(config))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/sourceControls/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(requestBody)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateSourceControl.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateSourceControl.fulfilled.toString())
    })

    test('requestUpdateSourceControl : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateSourceControl())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateSourceControl.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateSourceControl.rejected.toString())
    })

})
