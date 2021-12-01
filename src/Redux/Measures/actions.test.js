import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('Measure action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestSearchMeasures : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSearchMeasures('measure.id:1'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/measures?search=measure.id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSearchMeasures.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchMeasures.fulfilled.toString())
    })

    test('requestSearchMeasures : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSearchMeasures())

        expect(store.getActions()[0].type).toEqual(actions.requestSearchMeasures.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchMeasures.rejected.toString())
    })

    test('requestCreateMeasure : fulfilled', async() => {
        const Measure = { value: 5, target: 10, text: 'foo' }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateMeasure(Measure))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/measures')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(Measure)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateMeasure.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateMeasure.fulfilled.toString())
    })

    test('requestCreateMeasure : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateMeasure({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateMeasure.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateMeasure.rejected.toString())
    })

    test('requestUpdateMeasure : fulfilled', async() => {
        const requestBody = { value: 7, target: 10, text: 'foo' }
        const Measure = { id: 1, ...requestBody }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateMeasure(Measure))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/measures/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(requestBody)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateMeasure.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateMeasure.fulfilled.toString())
    })

    test('requestUpdateMeasure : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateMeasure())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateMeasure.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateMeasure.rejected.toString())
    })

    test('requestDeleteMeasure : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestDeleteMeasure(1))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/measures/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({})
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('DELETE')
        expect(store.getActions()[0].type).toEqual(actions.requestDeleteMeasure.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteMeasure.fulfilled.toString())
    })

    test('requestDeleteMeasure : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestDeleteMeasure())

        expect(store.getActions()[0].type).toEqual(actions.requestDeleteMeasure.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestDeleteMeasure.rejected.toString())
    })
})
