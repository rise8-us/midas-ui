import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useModuleMock } from 'Utilities/test-utils'
import * as actions from './actions'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

const handleThunkRequest = useModuleMock('Utilities/requests', 'handleThunkRequest')

describe('Product action thunks', () => {

    afterEach(() => {
        jest.clearAllMocks()
        store.clearActions()
    })

    test('requestFetchAllProducts : fulfilled', async() => {
        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestFetchAllProducts())

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/products?search=type:PRODUCT')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllProducts.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllProducts.fulfilled.toString())
    })

    test('requestFetchAllProducts : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestFetchAllProducts())

        expect(store.getActions()[0].type).toEqual(actions.requestFetchAllProducts.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestFetchAllProducts.rejected.toString())
    })

    test('requestCreateProduct : fulfilled', async() => {
        const Product = { name: 'starship9', description: 'foo' }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestCreateProduct(Product))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/products')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(Product)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('POST')
        expect(store.getActions()[0].type).toEqual(actions.requestCreateProduct.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateProduct.fulfilled.toString())
    })

    test('requestCreateProduct : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestCreateProduct({ id: 1, name: 'starship9', description: 'foo' }))

        expect(store.getActions()[0].type).toEqual(actions.requestCreateProduct.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestCreateProduct.rejected.toString())
    })

    test('requestUpdateProduct : fulfilled', async() => {
        const requestBody = { name: 'starship9', description: 'foo' }
        const Product = { id: 1, ...requestBody }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestUpdateProduct(Product))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/products/1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual(requestBody)
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestUpdateProduct.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateProduct.fulfilled.toString())
    })

    test('requestUpdateProduct : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestUpdateProduct())

        expect(store.getActions()[0].type).toEqual(actions.requestUpdateProduct.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestUpdateProduct.rejected.toString())
    })

    test('requestArchiveProduct : fulfilled', async() => {
        const requestBody = { id: 1, isArchived: false }

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestArchiveProduct(requestBody))

        expect(handleThunkRequest.mock.calls[0][0].endpoint).toContain('/api/products/1/archive')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({ isArchived: false })
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('PUT')
        expect(store.getActions()[0].type).toEqual(actions.requestArchiveProduct.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestArchiveProduct.fulfilled.toString())
    })

    test('requestArchiveProduct : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestArchiveProduct())

        expect(store.getActions()[0].type).toEqual(actions.requestArchiveProduct.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestArchiveProduct.rejected.toString())
    })

    test('requestSearchProduct : fulfilled', async() => {
        const search = 'id:1'

        handleThunkRequest.mockResolvedValueOnce()
        await store.dispatch(actions.requestSearchProduct(search))

        expect(handleThunkRequest.mock.calls[0][0].endpoint)
            .toContain('/api/products?search=type:PRODUCT AND id:1')
        expect(handleThunkRequest.mock.calls[0][0].body).toEqual({})
        expect(handleThunkRequest.mock.calls[0][0].method).toEqual('GET')
        expect(store.getActions()[0].type).toEqual(actions.requestSearchProduct.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchProduct.fulfilled.toString())
    })

    test('requestSearchProduct : rejected', async() => {
        handleThunkRequest.mockRejectedValueOnce()
        await store.dispatch(actions.requestSearchProduct())

        expect(store.getActions()[0].type).toEqual(actions.requestSearchProduct.pending.toString())
        expect(store.getActions()[1].type).toEqual(actions.requestSearchProduct.rejected.toString())
    })

})
