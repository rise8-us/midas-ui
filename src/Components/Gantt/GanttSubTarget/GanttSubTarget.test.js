import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { GanttSubTarget } from './index'

describe('<GanttTarget />', () => {

    const subTarget = {
        id: 1,
        title: 'This is the subTarget title',
        dueDate: '2022-06-01',
        startDate: '2022-01-01',
        description: 'These are the details',
        portfolioId: 1
    }

    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({})
        selectPortfolioPagePermissionMock.mockReturnValue({})
    })

    test('should render', () => {
        render(<GanttSubTarget target = {subTarget}/>)

        expect(screen.getByTitle('This is the subTarget title')).toBeInTheDocument()
    })

})