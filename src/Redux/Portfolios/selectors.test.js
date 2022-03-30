import { useModuleMock } from 'Utilities/test-utils'
import * as selectors from './selectors'

const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')

const mockState = {
    portfolios: {
        4: {
            id: 4,
            name: 'Midas Portfolio',
            description: null,
            productIds: [2],
            isArchived: false,
        },
        5: {
            id: 5,
            name: 'Something Portfolio',
            description: 'Something Portfolio',
            productIds: [3],
            isArchived: true,
        },
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

test('selectAllPortfolios - returns portfolio array', () => {
    selectProductByIdMock.mockReturnValue(mockState.products[2])

    const portfolioOne = {
        id: 4,
        name: 'Midas Portfolio',
        description: '',
        productIds: [2],
        isArchived: false,
        products: [
            mockState.products[2]
        ]

    }
    const portfolios = selectors.selectAllPortfolios(mockState)
    expect(portfolios[0]).toEqual(portfolioOne)
})

test('selectAllPortfolios - returns empty array', () => {
    expect(selectors.selectAllPortfolios({})).toBeInstanceOf(Array)
})

test('selectUnarchivedPortfolios - returns array with only unarchived portfolios', () => {
    expect(selectors.selectUnarchivedPortfolios(mockState)).toHaveLength(1)
})

test('selectUnarchivedPortfolioIds - returns mockState.app[4]', () => {
    expect(selectors.selectUnarchivedPortfolioIds(mockState)).toHaveLength(1)
    expect(selectors.selectUnarchivedPortfolioIds(mockState)).toEqual([4])
})

test('selectAllActivePortfoliosNameAndIds ', () => {
    expect(selectors.selectAllActivePortfoliosNameAndIds(mockState))
        .toEqual([{ id: 4, name: 'Midas Portfolio' }])
})
