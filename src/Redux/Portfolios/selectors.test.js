import { useModuleMock } from '../../Utilities/test-utils'
import * as selectors from './selectors'

const selectTagsByIdsMock = useModuleMock('Redux/Tags/selectors', 'selectTagsByIds')
const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')

const mockState = {
    portfolios: {
        4: {
            id: 4,
            name: 'Midas Portfolio',
            description: null,
            children: [2],
            isArchived: false,
            tagIds: [7],
            tags: [
                {
                    id: 7,
                    label: 'Some tags',
                    description: null,
                    color: ''
                }
            ]
        },
        5: {
            id: 5,
            name: 'Something Portfolio',
            description: 'Something Portfolio',
            children: [3],
            isArchived: true,
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
    products: {
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
    selectProductByIdMock.mockClear()
})

test('selectPortfolioById - returns portfolio object', () => {
    selectProductByIdMock.mockReturnValue(mockState.products[2])

    const returnedPortfolio = {
        ...mockState.portfolios[4],
        description: '',
        products: [{ ...mockState.products[2] }]

    }
    const portfolio = selectors.selectPortfolioById(mockState, 4)
    expect(portfolio).toEqual(returnedPortfolio)
})

test('selectPortfolioById - returns empty object', () => {
    expect(selectors.selectPortfolioById(mockState, 2)).toBeInstanceOf(Object)
})

test('selectPortfolios - returns portfolio array', () => {
    selectTagsByIdsMock.mockReturnValue([mockState.tags[7]])
    selectProductByIdMock.mockReturnValue(mockState.products[2])

    const portfolioOne = {
        id: 4,
        name: 'Midas Portfolio',
        description: '',
        children: [2],
        isArchived: false,
        tagIds: [7],
        tags: [
            mockState.tags[7]
        ],
        products: [
            mockState.products[2]
        ]

    }
    const portfolios = selectors.selectPortfolios(mockState)
    expect(portfolios[0]).toEqual(portfolioOne)
})

test('selectPortfolios - returns empty array', () => {
    expect(selectors.selectPortfolios({})).toBeInstanceOf(Array)
})

test('selectUnarchivedPortfolios - returns array with only unarchived portfolios', () => {
    expect(selectors.selectUnarchivedPortfolios(mockState)).toHaveLength(1)
})

test('selectUnarchivedPortfolioIds - returns mockState.app[4]', () => {
    expect(selectors.selectUnarchivedPortfolioIds(mockState)).toHaveLength(1)
    expect(selectors.selectUnarchivedPortfolioIds(mockState)).toEqual([4])
})