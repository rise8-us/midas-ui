import { fireEvent, renderWithRouter, screen, useModuleMock } from 'Utilities/test-utils'
import { Portfolio } from './index'

jest.mock('Components/Tabs/PortfolioPage/PortfolioCapabilities/PortfolioCapabilities',
    () => function testing() { return (<div>RequirementsTab</div>) })

jest.mock('Components/Tabs/PortfolioPage/PortfolioRoadmap/PortfolioRoadmap',
    () => function testing() { return (<div>RoadmapTab</div>) })

jest.mock('Components/Tabs/PageMetrics/PageMetrics',
    () => function testing() { return (<div>MetricsTab</div>) })

jest.mock('Components/Tabs/SprintReport/SprintReport',
    () => function testing() { return (<div>SprintReportTab</div>) })

const mockHistoryPush = jest.fn()
jest.mock('Hooks/useHistory', () => () => ({
    push: mockHistoryPush
}))

describe('<Portfolio />', () => {

    const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfolioById')
    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')

    beforeEach(() => {
        selectPortfolioByIdMock.mockReturnValue({ name: 'foo' })
        selectPortfolioPagePermissionMock.mockReturnValue({})
    })

    test('should render', () => {
        renderWithRouter(<Portfolio />)

        expect(screen.getByText('foo')).toBeInTheDocument()
        expect(screen.getByText('roadmap')).toBeInTheDocument()
        expect(screen.getByText('requirements')).toBeInTheDocument()
        expect(screen.getByText('sprint report')).toBeInTheDocument()
    })

    test('should render Skeleton', () => {
        selectPortfolioByIdMock.mockReturnValue({})

        renderWithRouter(<Portfolio />)

        expect(screen.getByTestId('Portfolio__skeleton-name')).toBeInTheDocument()
    })

    test('should render Gantt tab', () => {
        renderWithRouter(<Portfolio />)

        fireEvent.click(screen.getByText('roadmap'))
        expect(screen.getByText('RoadmapTab')).toBeInTheDocument()
    })

    test('should render capabilities tab', () => {
        renderWithRouter(<Portfolio />, { history, route: '/portfolios/91', path: '/portfolios/:portfolioId' })
        fireEvent.click(screen.getByText('requirements'))

        expect(mockHistoryPush).toHaveBeenCalledWith('/portfolios/91/requirements/')
    })

    test('should render metrics tab', async() => {
        renderWithRouter(<Portfolio />, { history, route: '/portfolios/91', path: '/portfolios/:portfolioId' })
        fireEvent.click(screen.getByText('metrics'))

        expect(mockHistoryPush).toHaveBeenCalledWith('/portfolios/91/metrics')
    })

    test('should render metrics tab - with data', async() => {
        selectPortfolioByIdMock.mockReturnValue({ name: 'foo', sprintStartDate: new Date() })

        renderWithRouter(<Portfolio />, { history, route: '/portfolios/91', path: '/portfolios/:portfolioId' })
        fireEvent.click(screen.getByText('sprint report'))

        expect(mockHistoryPush).toHaveBeenCalledWith('/portfolios/91/sprint-report')
    })

    test('should handle action icons with permissions', () => {
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })

        renderWithRouter(<Portfolio />)
        fireEvent.click(screen.getByTestId('Portfolio__button-edit'))

        expect(screen.getByTestId('LockOpenOutlinedIcon')).toBeInTheDocument()
    })

    test('should handle actions icons without permissions', () => {
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: false })

        renderWithRouter(<Portfolio />)
        fireEvent.click(screen.getByTestId('Portfolio__button-edit'))

        expect(screen.getByTestId('LockOutlinedIcon')).toBeInTheDocument()
    })

})