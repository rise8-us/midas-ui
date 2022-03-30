import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('Personnel action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestFetchAllPersonnel : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchAllPersonnel())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/personnel')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllPersonnel.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllPersonnel.fulfilled.toString())
    })

    test('requestFetchAllPersonnel : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchAllPersonnel())

        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllPersonnel.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllPersonnel.rejected.toString())
    })

})

