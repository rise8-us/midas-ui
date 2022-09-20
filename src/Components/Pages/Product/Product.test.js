import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { Product } from './index'

jest.mock('Components/Tabs/ProjectsTab/ProjectsTab',
    () => function testing() { return (<div>ProjectsTab</div>) })

jest.mock('Components/Tabs/AssertionsTab/AssertionsTab',
    () => function testing() { return (<div>AssertionsTab</div>) })

jest.mock('Components/Tabs/SprintReport/SprintReport',
    () => function testing() { return (<div>SprintReportTab</div>) })

jest.mock('Components/Tabs/PageMetrics/PageMetrics',
    () => function testing() { return (<div>MetricsTab</div>) })

jest.mock('Components/ProductOnePager/ProductRoadmap/ProductRoadmap',
    () => function testing() { return (<div>ProductRoadmap</div>) })

jest.mock('Components/ProductOnePager/ProductUserPersonas/ProductUserPersonas',
    () => function testing() { return (<div>ProductUserPersonas</div>) })

jest.mock('Components/ProductOnePager/ProductTeam/ProductTeam',
    () => function testing() { return (<div>ProductTeam</div>) })

jest.mock('Components/Page/Page',
    () => function testing({ children }) { return (<div>{children}</div>) })

jest.mock('Hooks/useHistory', () => () => ({
    push: jest.fn()
}))

describe('<Product>', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfolioById')
    const hasProductOrTeamAccessMock = useModuleMock('Redux/Auth/selectors', 'hasProductOrTeamAccess')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    const product = {
        id: 0,
        name: 'Product 1',
        description: '',
        roadmapType: 'MANUAL',
        tagIds: [4],
        tags: [
            {   id: 4,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ],
    }

    const portfolio = {
        id: 1,
        name: 'Portfolio 1',
        sprintStartDate: '2022-07-14',
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectProductByIdMock.mockReturnValue(product)
        selectPortfolioByIdMock.mockReturnValue(portfolio)
        hasProductOrTeamAccessMock.mockReturnValue(true)
    })

    test('should have correct header text', () => {
        render(<Product />)

        expect(screen.getByDisplayValue('Product 1'))
        expect(screen.getByText(/Some tags/i)).toBeInTheDocument()
    })

    test('should render projects tab', () => {
        render(<Product />)

        fireEvent.click(screen.getByText(/Projects/i))
        expect(screen.getByText('ProjectsTab')).toBeInTheDocument()
    })

    test('should render overview tab', () => {
        render(<Product />)

        fireEvent.click(screen.getByText(/overview/i))
        expect(screen.getByText('ProductRoadmap')).toBeInTheDocument()
        expect(screen.getByText('ProductUserPersonas')).toBeInTheDocument()
    })

    test('should render objectives tab', () => {
        render(<Product />)

        fireEvent.click(screen.getByText(/objectives/i))
        expect(screen.getByText('AssertionsTab')).toBeInTheDocument()
    })

    test('should render metrics tab', () => {
        render(<Product />)

        fireEvent.click(screen.getByText(/metrics/i))
        expect(screen.getByText('MetricsTab')).toBeInTheDocument()
    })

    test('should handle action icons', () => {
        render(<Product />)

        fireEvent.click(screen.getByTestId('ProductPage__icon-inline-edit'))
        fireEvent.click(screen.getByTestId('ProductPage__icon-popup-edit'))

        expect(screen.getByTestId('LockOpenOutlinedIcon')).toBeInTheDocument()
        expect(openPopupMock).toHaveBeenCalled()
    })

    test('should render sprint report tab', () => {
        render(<Product />)

        fireEvent.click(screen.getByText(/Sprint Report/i))
        expect(screen.getByText('SprintReportTab')).toBeInTheDocument()
    })

})