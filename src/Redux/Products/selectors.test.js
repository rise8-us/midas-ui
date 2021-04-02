import { useModuleMock } from '../../Utilities/test-utils'
import * as selectors from './selectors'

const selectTagsByIdsMock = useModuleMock('Redux/Tags/selectors', 'selectTagsByIds')

const mockState = {
    products: {
        4: {
            id: 4,
            name: 'New Product',
            gitlabProjectId: 1234,
            tagIds: []
        }
    }
}

test('getProductById - returns product object', () => {
    selectTagsByIdsMock.mockReturnValue([])
    const returnedProduct = {
        ...mockState.products[4],
        tags: []
    }
    const product = selectors.getProductById(mockState, 4)
    expect(product).toEqual(returnedProduct)
})

test('getProductById - returns empty object', () => {
    expect(selectors.getProductById(mockState, 2)).toBeInstanceOf(Object)
})

test('getProducts - returns product array', () => {
    const product = selectors.getProducts(mockState)
    expect(product[0]).toBe(mockState.products[4])
})

test('getProducts - returns empty array', () => {
    expect(selectors.getProducts({})).toBeInstanceOf(Array)
})