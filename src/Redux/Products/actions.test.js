import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from '../../Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('Product action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    it('requestFetchAllProducts : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchAllProducts())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/products')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllProducts.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllProducts.fulfilled.toString())
    })

    it('requestFetchAllProducts : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchAllProducts())

        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllProducts.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllProducts.rejected.toString())
    })

    it('requestCreateProduct : fulfilled', async() => {
        const product = { name: 'starship9', description: 'foo' }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateProduct(product))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/products')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(product)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateProduct.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateProduct.fulfilled.toString())
    })

    it('requestCreateProduct : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateProduct({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateProduct.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateProduct.rejected.toString())
    })

    it('requestUpdateProduct : fulfilled', async() => {
        const requestBody = { name: 'starship9', description: 'foo' }
        const product = { id: 1, ...requestBody }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateProduct(product))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/products/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(requestBody)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateProduct.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateProduct.fulfilled.toString())
    })

    it('requestUpdateProduct : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateProduct())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateProduct.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateProduct.rejected.toString())
    })

    it('requestUpdateJourneyMapById : fulfilled', async() => {
        const requestBody = { id: 1, productJourneyMap: 3 }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateJourneyMapById(requestBody))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/products/1/journeymap')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ productJourneyMap: 3 })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateJourneyMapById.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateJourneyMapById.fulfilled.toString())
    })

    it('requestUpdateJourneyMapById : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateJourneyMapById())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateJourneyMapById.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateJourneyMapById.rejected.toString())
    })


})
