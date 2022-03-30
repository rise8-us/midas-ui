import { useModuleMock } from 'Utilities/test-utils'
import * as selectors from './selectors'

const selectTagsByIdsMock = useModuleMock('Redux/Tags/selectors', 'selectTagsByIds')
const selectProjectByIdMock = useModuleMock('Redux/Projects/selectors', 'selectProjectById')



const mockState = {
    products: {
        4: {
            id: 4,
            name: 'Midas Product',
            description: null,
            projectIds: [2],
            isArchived: false,
            portfolioId: 42,
            tagIds: [7],
            tags: [
                {
                    id: 7,
                    label: 'Some tags',
                    description: null,
                    color: ''
                }
            ],
            personnel: {
                ownerId: 12,
                adminIds: [],
                teamIds: []
            }
        },
        5: {
            id: 5,
            name: 'Something Product',
            description: 'Something Product',
            projectIds: [3],
            isArchived: true,
            portfolioId: null,
            tagIds: [2],
            tags: [],
            personnel: {
                ownerId: 13,
                adminIds: [],
                teamIds: []
            }
        },
        6: {
            id: 6,
            name: 'Something Product',
            description: 'Something Product',
            projectIds: [3],
            isArchived: false,
            portfolioId: null,
            tagIds: [2],
            tags: [],
            personnel: {
                ownerId: 14,
                adminIds: [],
                teamIds: []
            }
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
    selectProjectByIdMock.mockReturnValue(mockState.projects[2])

    const returnedProduct = {
        ...mockState.products[4],
        description: '',
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
    selectProjectByIdMock.mockReturnValue(mockState.projects[2])

    const productOne = {
        id: 4,
        name: 'Midas Product',
        description: '',
        projectIds: [2],
        isArchived: false,
        portfolioId: 42,
        tagIds: [7],
        tags: [
            {
                id: 7,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ],
        projects: [
            mockState.projects[2]
        ],
        personnel: {
            ownerId: 12,
            adminIds: [],
            teamIds: []
        }
    }
    const products = selectors.selectProducts(mockState)
    expect(products[0]).toEqual(productOne)
})

test('selectProducts - returns empty array', () => {
    expect(selectors.selectProducts({})).toBeInstanceOf(Array)
})

test('selectUnarchivedProducts - returns array with only unarchived products', () => {
    expect(selectors.selectUnarchivedProducts(mockState)).toHaveLength(2)
})

test('selectUnarchivedProductIds - returns array of numbers', () => {
    expect(selectors.selectUnarchivedProductIds(mockState)).toHaveLength(2)
    expect(selectors.selectUnarchivedProductIds(mockState)).toEqual([4, 6])
})

test('selectUnarchivedProducts - returns unarchived products without portfolio', () => {
    expect(selectors.selectAvailableProducts(mockState)).toHaveLength(1)
})

test('selectProductOwnerByProductId return null if not found', () => {
    expect(selectors.selectProductOwnerByProductId(mockState, 7)).toBeUndefined()
})

test('selectProductOwnerByProductId return found user', () => {
    expect(selectors.selectProductOwnerByProductId(mockState, 4)).toEqual(12)
})