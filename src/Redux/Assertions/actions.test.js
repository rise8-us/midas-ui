import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from '../../Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('Assertion action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestFetchAssertions : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchAssertions('objective.id:1'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/assertions?search=objective.id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchAssertions.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAssertions.fulfilled.toString())
    })

    test('requestFetchAssertions : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchAssertions())

        expect(store.getActions()[0].type).toEqual(actions.requestFetchAssertions.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAssertions.rejected.toString())
    })

    test('requestCreateAssertion : fulfilled', async() => {
        const Assertion = {  text: 'foo', type: 'GOAL' }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateAssertion(Assertion))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/assertions')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(Assertion)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateAssertion.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateAssertion.fulfilled.toString())
    })

    test('requestCreateAssertion : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateAssertion({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateAssertion.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateAssertion.rejected.toString())
    })

    test('requestUpdateAssertion : fulfilled', async() => {
        const requestBody = {  text: 'foo', type: 'GOAL' }
        const Assertion = { id: 1, ...requestBody }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateAssertion(Assertion))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/assertions/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(requestBody)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateAssertion.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateAssertion.fulfilled.toString())
    })

    test('requestUpdateAssertion : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateAssertion())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateAssertion.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateAssertion.rejected.toString())
    })

})
