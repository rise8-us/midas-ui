import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('Coverage action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestSearchCoverages : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSearchCoverages('project.id:1'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/coverages?search=project.id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSearchCoverages.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchCoverages.fulfilled.toString())
    })

    test('requestSearchCoverages : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSearchCoverages())

        expect(store.getActions()[0].type).toEqual(actions.requestSearchCoverages.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchCoverages.rejected.toString())
    })
})