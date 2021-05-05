import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from '../../Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('Objective action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestFetchObjectives : fulfilled', async() => {

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchObjectives('product.id:1'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/objectives?search=product.id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({})
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchObjectives.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchObjectives.fulfilled.toString())
    })

    test('requestFetchObjectives : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchObjectives())

        expect(store.getActions()[0].type).toEqual(actions.requestFetchObjectives.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchObjectives.rejected.toString())
    })

    test('requestCreateObjective : fulfilled', async() => {
        const Objective = { text: 'Prod or didn\'t happen', productId: 1 }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateObjective(Objective))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/objectives')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(Objective)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateObjective.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateObjective.fulfilled.toString())
    })

    test('requestCreateObjective : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateObjective({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateObjective.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateObjective.rejected.toString())
    })

    test('requestUpdateObjective : fulfilled', async() => {
        const requestBody = { name: 'starship9', description: 'foo' }
        const Objective = { id: 1, ...requestBody }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateObjective(Objective))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/objectives/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(requestBody)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateObjective.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateObjective.fulfilled.toString())
    })

    test('requestUpdateObjective : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateObjective())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateObjective.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateObjective.rejected.toString())
    })

})
