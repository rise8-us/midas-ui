import * as selectors from './selectors'

const mockState = {
    products: {
        4: {
            id: 4,
            name: 'New Product',
            gitlabProjectId: 1234
        }
    }
}

test('getProductById - returns product object', () => {
    const product = selectors.getProductById(mockState, 4)
    expect(product).toBe(mockState.products[4])
})

test('getProductById - returns empty object', () => {
    expect(selectors.getProductById(mockState, 2)).toBeInstanceOf(Object)
})