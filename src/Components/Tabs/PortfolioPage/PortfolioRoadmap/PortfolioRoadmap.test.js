import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { PortfolioRoadmap } from './index'

jest.mock('Components/Gantt/GanttTarget/GanttTarget', () => function testing(props) {
    return <div>{props.target.type}</div>
})
jest.mock('Components/Gantt/GanttMilestone/GanttMilestone', () => function testing(props) {
    return <div>{props.milestone.type}</div>
})
jest.mock('Components/Gantt/GanttEvent/GanttEvent', () => function testing(props) {
    return <div>{props.event.type}</div>
})
jest.mock('Components/Gantt/GanttWin/GanttWin', () => function testing(props) {
    return <div>{props.win.type}</div>
})

describe('<PortfolioRoadmap />', () => {

    const selectMilestonesByPortfolioIdMock =
        useModuleMock('Redux/Milestones/selectors', 'selectMilestonesByPortfolioId')
    const selectEventsByPortfolioIdMock =
        useModuleMock('Redux/Events/selectors', 'selectEventsByPortfolioId')
    const selectTargetsByPortfolioIdMock =
        useModuleMock('Redux/Targets/selectors', 'selectTargetsByPortfolioId')
    const selectWinsByPortfolioIdMock =
        useModuleMock('Redux/Wins/selectors', 'selectWinsByPortfolioId')
    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')
    const selectPortfolioPageSettingViewMock =
        useModuleMock('Redux/AppSettings/selectors', 'selectPortfolioPageSettingView')

    const defaultView = { title: '6M', viewBy: 'year', scope: 6, leadingColumns: 2 }
    const defaultProps = { startDate: '2022-6-3', dueDate: '2022-6-4' }

    const target = { id: 1, type: 'target', parentId: null, ...defaultProps }
    const event = { id: 1, type: 'event', ...defaultProps }
    const milestone = { id: 1, type: 'milestone', ...defaultProps }
    const win = { id: 1, type: 'win', ...defaultProps }

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({ type: '/', payload: [] })
        selectMilestonesByPortfolioIdMock.mockReturnValue([milestone])
        selectEventsByPortfolioIdMock.mockReturnValue([event])
        selectTargetsByPortfolioIdMock.mockReturnValue([target])
        selectWinsByPortfolioIdMock.mockReturnValue([win])
        selectPortfolioPagePermissionMock.mockReturnValue({})
        selectPortfolioPageSettingViewMock.mockReturnValue(defaultView)
    })

    test('should render without authorization', () => {
        render(<PortfolioRoadmap portfolioId = {0} isAuthorized = {false} />)

        screen.getByTestId('GanttFilter__button')
        expect(screen.queryByTestId('GanttAddNewItem__button')).not.toBeInTheDocument()
    })

    test('should render with authorization', () => {
        render(<PortfolioRoadmap portfolioId = {0} isAuthorized = {true} />)

        screen.getByTestId('GanttAddNewItem__button')
    })

    test('should display Menu Options when Add New is clicked', () => {
        render(<PortfolioRoadmap portfolioId = {0} isAuthorized = {true}/>)

        fireEvent.click(screen.getByTestId('GanttAddNewItem__button'))

        screen.getByTestId('MoreOptionsPopperMenu__Milestone')
        screen.getByTestId('MoreOptionsPopperMenu__Win')
        screen.getByTestId('MoreOptionsPopperMenu__Event')
        screen.getByTestId('MoreOptionsPopperMenu__Target')
    })

    test('should display filter option when Filter is clicked', () => {
        render(<PortfolioRoadmap portfolioId = {0} isAuthorized = {true}/>)

        fireEvent.click(screen.getByTestId('GanttFilter__button'))

        screen.getByTestId('CheckBoxOutlineBlankIcon')
    })

})