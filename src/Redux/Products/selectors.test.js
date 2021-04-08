import { useModuleMock } from '../../Utilities/test-utils'
import * as selectors from './selectors'

const selectTagsByIdsMock = useModuleMock('Redux/Tags/selectors', 'selectTagsByIds')

const mockState = {
    products: {
        4: {
            id: 4,
            name: 'New Product',
            gitlabProjectId: 1234,
            tagIds: [1],
        }
    },
    tags: {
        1: {
            id: 1,
            label: 'Some tags',
            description: null,
            color: ''
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
    selectTagsByIdsMock.mockReturnValue([mockState.tags[1]])

    const productOne = {
        id: 4,
        name: 'New Product',
        gitlabProjectId: 1234,
        tagIds: [1],
        tags: [
            {   id: 1,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ]

    }
    const products = selectors.getProducts(mockState)
    expect(products[0]).toEqual(productOne)
})

test('getProducts - returns empty array', () => {
    expect(selectors.getProducts({})).toBeInstanceOf(Array)
})