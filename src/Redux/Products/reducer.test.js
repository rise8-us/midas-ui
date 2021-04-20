import * as reduxActions from './actions'
import reducer from './reducer'

const allProductsResponse = [
    {
        id: 1,
        name: 'Product1',
        isArchived: false
    }, {
        id: 2,
        name: 'Product2',
    }
]

const updatedProduct = { id: 1, name: 'foo' }
const archiveProduct = { id: 1, isArchived: true }

describe('Products Reducer', () => {
    it('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    it('fetches all Products', () => {
        const actions = [{ type: reduxActions.requestFetchAllProducts.fulfilled, payload: allProductsResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allProductsResponse[0])
        expect(state[2]).toEqual(allProductsResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    it('Create Product', () => {
        const actions = [{ type: reduxActions.requestCreateProduct.fulfilled, payload: allProductsResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allProductsResponse[0] })
    })

    it('Update Product', () => {
        const actions = [{ type: reduxActions.requestUpdateProduct.fulfilled, payload: updatedProduct }]
        const state = actions.reduce(reducer, { 1: allProductsResponse[0] })
        expect(state).toEqual({ 1: updatedProduct })
    })

    it('Archive Product', () => {
        const actions = [{ type: reduxActions.requestArchiveProduct.fulfilled, payload: archiveProduct }]
        const state = actions.reduce(reducer, { 1: allProductsResponse[0] })
        expect(state).toEqual({ 1: archiveProduct })
    })
})