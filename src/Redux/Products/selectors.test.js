import { useModuleMock } from '../../Utilities/test-utils'
import * as selectors from './selectors'

const selectTagsByIdsMock = useModuleMock('Redux/Tags/selectors', 'selectTagsByIds')
const selectProjectByIdMock = useModuleMock('Redux/Projects/selectors', 'selectProjectById')

const mockState = {
    products: {
        4: {
            id: 4,
            name: 'Midas Product',
            description: 'New Product',
            projectIds: [2],
            isArchived: false,
            portfolioId: 2,
            tagIds: [7]
        },
        5: {
            id: 5,
            name: 'Something Product',
            description: 'Something Product',
            projectIds: [3],
            isArchived: true,
            portfolioId: 4,
            tagIds: [2]
        },
    },
    tags: {
        7: {
            id: 7,
            label: 'Some tags',
            description: null,
            color: ''
        }
    },
    projects: {
        2: {
            name: 'p2'
        },
        3: {
            name: 'p3'
        }
    }
}

afterEach(() => {
    selectTagsByIdsMock.mockClear()
    selectProjectByIdMock.mockClear()
})

test('selectProductById - returns product object', () => {
    selectTagsByIdsMock.mockReturnValue([mockState.tags[7]])
    selectProjectByIdMock.mockReturnValue(mockState.projects[2])

    const returnedProduct = {
        ...mockState.products[4],
        tags: [{ ...mockState.tags[7] }],
        projects: [{ ...mockState.projects[2] }]

    }
    const product = selectors.selectProductById(mockState, 4)
    expect(product).toEqual(returnedProduct)
})

test('selectProductById - returns empty object', () => {
    expect(selectors.selectProductById(mockState, 2)).toBeInstanceOf(Object)
})

test('selectProducts - returns product array', () => {
    selectTagsByIdsMock.mockReturnValue([mockState.tags[7]])

    const productOne = {
        id: 4,
        name: 'Midas Product',
        description: 'New Product',
        projectIds: [2],
        isArchived: false,
        portfolioId: 2,
        tagIds: [7],
        tags: [
            {   id: 7,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ]

    }
    const products = selectors.selectProducts(mockState)
    expect(products[0]).toEqual(productOne)
})

test('selectProducts - returns empty array', () => {
    expect(selectors.selectProducts({})).toBeInstanceOf(Array)
})

test('selectUnarchivedProducts - returns array with only unarchived products', () => {
    expect(selectors.selectUnarchivedProducts(mockState)).toHaveLength(1)
})

test('selectUnarchivedProductIds - returns mockState.app[4]', () => {
    expect(selectors.selectUnarchivedProductIds(mockState)).toHaveLength(1)
    expect(selectors.selectUnarchivedProductIds(mockState)).toEqual([4])
})