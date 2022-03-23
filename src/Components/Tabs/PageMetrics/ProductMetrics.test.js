import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { ProductMetrics } from './index'

describe('<ProductMetrics>', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const getPageMetricsMock = useModuleMock('Redux/AppMetrics/actions', 'requestGetPageMetrics')
    const selectTeamByProductIdMock = useModuleMock('Redux/Teams/selectors', 'selectTeamByProductId')
    const requestFindUserByMock = useModuleMock('Redux/Users/actions', 'requestFindUserBy')

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

    const pageMetrics = {
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

    test('should render PageMetrics', async() => {
        useDispatchMock().mockResolvedValue(pageMetrics)
        requestFindUserByMock.mockReturnValue({})
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

        render(<ProductMetrics id = {18}/>)

        expect(await screen.findByText('Non-team Viewers:')).toBeInTheDocument()
    })
})