import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

describe('AppMetrics action thunks', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({})

    const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestGetUniqueLogonMetrics : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestGetUniqueLogonMetrics('id:1'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/appUserMetrics?search=id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestGetUniqueLogonMetrics.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetUniqueLogonMetrics.fulfilled.toString())
    })

    test('requestGetUniqueLogonMetrics : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestGetUniqueLogonMetrics(1))

        expect(store.getActions()[0].type).toEqual(actions.requestGetUniqueLogonMetrics.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetUniqueLogonMetrics.rejected.toString())
    })

    test('requestGetPageMetrics : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestGetPageMetrics())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/metrics_page_view')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestGetPageMetrics.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetPageMetrics.fulfilled.toString())
    })

    test('requestGetPageMetrics : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestGetPageMetrics(1))

        expect(store.getActions()[0].type).toEqual(actions.requestGetPageMetrics.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestGetPageMetrics.rejected.toString())
    })

    test('requestSearchPageMetrics : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSearchPageMetrics('foo'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/metrics_page_view?search=foo')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSearchPageMetrics.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchPageMetrics.fulfilled.toString())
    })

    test('requestSearchPageMetrics : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSearchPageMetrics(1))

        expect(store.getActions()[0].type).toEqual(actions.requestSearchPageMetrics.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchPageMetrics.rejected.toString())
    })

    test('requestPostPageMetrics : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestPostPageMetrics('foo/bar'))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/metrics_page_view')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ pathname: 'foo/bar' })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestPostPageMetrics.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestPostPageMetrics.fulfilled.toString())
    })

    test('requestPostPageMetrics : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestPostPageMetrics('1'))

        expect(store.getActions()[0].type).toEqual(actions.requestPostPageMetrics.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestPostPageMetrics.rejected.toString())
    })
})