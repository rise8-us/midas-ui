import PortfolioConstants from 'Redux/Portfolios/constants'
import {
    fireEvent,
    renderWithRouter,
    screen,
    useDispatchMock,
    useModuleMock
} from 'Utilities/test-utils'
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
    const setPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/reducer', 'setPortfolioPagePermission')
    const selectUserLoggedInMock = useModuleMock('Redux/Auth/selectors', 'selectUserLoggedIn')

    beforeEach(() => {
        selectPortfolioByIdMock.mockReturnValue({ name: 'foo' })
        selectUserLoggedInMock.mockReturnValue({ id: 1, isAdmin: true })
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

    describe('icons and permissions', () => {
        test('should not show lock and sync buttons without proper permissions', () => {
            selectUserLoggedInMock.mockReturnValue({ id: 1, isAdmin: false })
            renderWithRouter(<Portfolio />)

            expect(screen.queryByTestId('Portfolio__button-edit')).not.toBeInTheDocument()
            expect(screen.queryByTestId('SyncRequest__button-sync')).not.toBeInTheDocument()
            expect(screen.queryByTestId('Portfolio__button-settings')).not.toBeInTheDocument()
        })

        test('should show lock and sync buttons if portfolio admin', () => {
            selectUserLoggedInMock.mockReturnValue({ id: 1, isAdmin: false })
            selectPortfolioByIdMock.mockReturnValue({ name: 'foo', personnel: { ownerId: 50, adminIds: [1] } })
            renderWithRouter(<Portfolio />)

            screen.getByTestId('Portfolio__button-edit')
            screen.getByTestId('SyncRequest__button-sync')
            screen.getByTestId('Portfolio__button-settings')
        })

        test('should show lock and sync buttons if portfolio owner', () => {
            selectUserLoggedInMock.mockReturnValue({ id: 1, isAdmin: false })
            selectPortfolioByIdMock.mockReturnValue({ name: 'foo', personnel: { ownerId: 1, adminIds: [50] } })
            renderWithRouter(<Portfolio />)

            screen.getByTestId('Portfolio__button-edit')
            screen.getByTestId('SyncRequest__button-sync')
            screen.getByTestId('Portfolio__button-settings')
        })

        test('should show lock and sync buttons if site admin', () => {
            selectUserLoggedInMock.mockReturnValue({ id: 1, isAdmin: true })
            renderWithRouter(<Portfolio />)

            screen.getByTestId('Portfolio__button-edit')
            screen.getByTestId('SyncRequest__button-sync')
            screen.getByTestId('Portfolio__button-settings')
        })

        test('should not show sync button if no source control ID', () => {
            selectPortfolioByIdMock.mockReturnValue({
                name: 'foo',
                personnel: { ownerId: 1, adminIds: [50] },
                sourceControlId: null,
                gitlabGroupId: 1
            })
            renderWithRouter(<Portfolio />)

            expect(screen.queryByTestId('SyncRequest__button-sync')).not.toBeInTheDocument()
        })

        test('should not show sync button if no GitLab group ID', () => {
            selectPortfolioByIdMock.mockReturnValue({
                name: 'foo',
                personnel: { ownerId: 1, adminIds: [50] },
                sourceControlId: 1,
                gitlabGroupId: null
            })
            renderWithRouter(<Portfolio />)

            expect(screen.queryByTestId('SyncRequest__button-sync')).not.toBeInTheDocument()
        })
    })

    test('should toggle edit mode when clicking the lock icon', () => {
        selectPortfolioPagePermissionMock
            .mockReturnValueOnce({ edit: true })
            .mockReturnValueOnce({ edit: false })
        const dispatchMock = useDispatchMock()
        dispatchMock.mockResolvedValue({})

        const { rerender } = renderWithRouter(<Portfolio />)
        expect(screen.getByTestId('LockOpenOutlinedIcon')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('Portfolio__button-edit'))
        expect(setPortfolioPagePermissionMock).toHaveBeenNthCalledWith(1, { id: NaN, permissions: { edit: false } })

        rerender(<Portfolio />)
        expect(screen.getByTestId('LockOutlinedIcon')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('Portfolio__button-edit'))
        expect(setPortfolioPagePermissionMock).toHaveBeenLastCalledWith({ id: NaN, permissions: { edit: true } })
    })

    test('should call PortfolioPopup', () => {
        const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
        selectUserLoggedInMock.mockReturnValue({ id: 1, isAdmin: false })
        selectPortfolioByIdMock.mockReturnValue({ id: 91, name: 'foo', personnel: { ownerId: 1, adminIds: [50] } })

        const dispatchMock = useDispatchMock()
        dispatchMock.mockResolvedValue({})

        renderWithRouter(<Portfolio />)

        fireEvent.click(screen.getByTestId('Portfolio__button-settings'))

        expect(openPopupMock).toHaveBeenCalledWith(PortfolioConstants.UPDATE_PORTFOLIO, 'PortfolioPopup', { id: NaN })
    })
})
