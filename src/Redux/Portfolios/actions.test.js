import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('Portfolio action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestFetchAllPortfolios : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchAllPortfolios())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/products?search=type:PORTFOLIO')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllPortfolios.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllPortfolios.fulfilled.toString())
    })

    test('requestFetchAllPortfolios : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchAllPortfolios())

        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllPortfolios.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllPortfolios.rejected.toString())
    })

    test('requestCreatePortfolio : fulfilled', async() => {
        const Portfolio = { name: 'starship9', description: 'foo' }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreatePortfolio(Portfolio))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/products')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(Portfolio)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreatePortfolio.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreatePortfolio.fulfilled.toString())
    })

    test('requestCreatePortfolio : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreatePortfolio({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreatePortfolio.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreatePortfolio.rejected.toString())
    })

    test('requestUpdatePortfolio : fulfilled', async() => {
        const requestBody = { name: 'starship9', description: 'foo' }
        const Portfolio = { id: 1, ...requestBody }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdatePortfolio(Portfolio))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/products/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(requestBody)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdatePortfolio.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdatePortfolio.fulfilled.toString())
    })

    test('requestUpdatePortfolio : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdatePortfolio())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdatePortfolio.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdatePortfolio.rejected.toString())
    })

    test('requestArchivePortfolio : fulfilled', async() => {
        const requestBody = { id: 1, isArchived: false }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestArchivePortfolio(requestBody))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/products/1/archive')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ isArchived: false })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestArchivePortfolio.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestArchivePortfolio.fulfilled.toString())
    })

    test('requestArchivePortfolio : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestArchivePortfolio())

        expect(store.getActions()[0].type).toEqual(actions.requestArchivePortfolio.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestArchivePortfolio.rejected.toString())
    })

    test('requestSearchPortfolio : fulfilled', async() => {
        const search = 'id:1'

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSearchPortfolio(search))

        expect(handleThunkRequest.mock.calls[0][0].endpoint)
            .toContain('/api/products?search=type:PORTFOLIO AND id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({})
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSearchPortfolio.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchPortfolio.fulfilled.toString())
    })

    test('requestSearchPortfolio : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSearchPortfolio())

        expect(store.getActions()[0].type).toEqual(actions.requestSearchPortfolio.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchPortfolio.rejected.toString())
    })

})
