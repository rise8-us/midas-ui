import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { PageMetrics } from './index'

describe('<PageMetrics>', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfoliosById')
    const getPageMetricsMock = useModuleMock('Redux/AppMetrics/actions', 'requestGetPageMetrics')
    const selectTeamByProductIdMock = useModuleMock('Redux/Teams/selectors', 'selectTeamByProductId')
    const requestSearchUsersMock = useModuleMock('Redux/Users/actions', 'requestSearchUsers')

    const existingProduct = {
        id: 4,
        name: 'Midas Product',
        description: 'New Product',
        projectIds: [4],
        isArchived: false,
        portfolioId: 2,
        tagIds: [4, 13],
        ownerId: null,
        teamIds: [1],
        tags: [],
        projects: [],
        gitlabGroupId: 1,
        sourceControlId: 10,
    }

    const existingPortfolio = {
        id: 5,
        name: 'Midas Portfolio',
        description: 'New Portfolio',
        productIds: [4],
        isArchived: false,
        ownerId: null,
        teamIds: [1],
        tags: [],
        gitlabGroupId: 1,
        sourceControlId: 10,
    }

    const productMetrics = {
        payload: [
            {
                id: '2022-03-16',
                pageViews: {
                    'products/18/metrics': [1, 2, 3, 4],
                    'products/18/overview': [1, 92, 89],
                    'products/18/projects': [1, 88, 28],
                    'products/19/projects': [1, 88, 28]
                }
            }
        ]
    }

    const portfolioMetrics = {
        payload: [
            {
                id: '2022-03-16',
                pageViews: {
                    'portfolio/18/metrics': [1, 2, 3, 4],
                    'portfolio/18/overview': [1, 92, 89],
                    'portfolio/18/projects': [1, 88, 28],
                    'portfolio/19/projects': [1, 88, 28]
                }
            }
        ]
    }

    test('should render PageMetrics for products', async() => {
        useDispatchMock().mockResolvedValue(productMetrics)
        requestSearchUsersMock.mockReturnValue({})
        getPageMetricsMock.mockReturnValue({})
        selectProductByIdMock.mockReturnValue(existingProduct)
        selectTeamByProductIdMock.mockReturnValue({
            name: 'MIDAS',
            gitlabGroupId: '',
            id: '',
            userIds: [1, 2],
            productManagerId: 2,
            designerId: null,
            techLeadId: 2
        })

        render(<PageMetrics id = {18} type = 'product' />)

        expect(await screen.findByText('Non-team Viewers:')).toBeInTheDocument()
    })

    test('should render PageMetrics for portfolios', async() => {
        useDispatchMock().mockResolvedValue(portfolioMetrics)
        requestSearchUsersMock.mockReturnValue({})
        getPageMetricsMock.mockReturnValue({})
        selectPortfolioByIdMock.mockReturnValue(existingPortfolio)
        selectTeamByProductIdMock.mockReturnValue({
            name: 'MIDAS',
            gitlabGroupId: '',
            id: '',
            userIds: [1, 2],
            productManagerId: 2,
            designerId: null,
            techLeadId: 2
        })

        render(<PageMetrics id = {18} type = 'portfolio' />)

        expect(await screen.findByText('Non-team Viewers:')).toBeInTheDocument()
    })
})