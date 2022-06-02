import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { EntriesContainer } from './index'

describe('<EntriesContainer />', () => {

    const selectMilestonesByPortfolioIdMock =
        useModuleMock('Redux/Milestones/selectors', 'selectMilestonesByPortfolioId')
    const selectEventsByPortfolioIdMock =
        useModuleMock('Redux/Events/selectors', 'selectEventsByPortfolioId')
    const selectTargetsByPortfolioIdMock =
        useModuleMock('Redux/Targets/selectors', 'selectTargetsByPortfolioId')
    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')
    const selectPortfolioPageViewSettingMock =
        useModuleMock('Redux/AppSettings/selectors', 'selectPortfolioPageViewSetting')

    const defaultView = { title: '6M', viewBy: 'month', scope: 6, leadingColumns: 2 }

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
        selectMilestonesByPortfolioIdMock.mockReturnValue([])
        selectEventsByPortfolioIdMock.mockReturnValue([])
        selectTargetsByPortfolioIdMock.mockReturnValue([])
        selectPortfolioPagePermissionMock.mockReturnValue({})
        selectPortfolioPageViewSettingMock.mockReturnValue(defaultView)
    })

    test('should render without edit', () => {
        render(<EntriesContainer portfolioId = {0} />)

        expect(screen.queryByTestId('GanttAddNewItem__button')).not.toBeInTheDocument()
    })

    test('should render with edit', () => {
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })
        render(<EntriesContainer portfolioId = {0} />)

        expect(screen.getByTestId('GanttAddNewItem__button')).toBeInTheDocument()
    })

})