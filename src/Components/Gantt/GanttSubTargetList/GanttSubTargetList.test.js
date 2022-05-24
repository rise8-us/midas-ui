import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { GanttSubTargetList } from './index'

jest.mock('Components/Gantt/GanttSubTarget/GanttSubTarget', () => function testing({ id }) {
    return <div>{id}</div>
})

describe('<GanttSubTargetList />', () => {

    const subtargets = [{
        id: 1,
        startDate: '2022-01-01',
        dueDate: '2022-06-01',
        title: 'one',
        portfolioId: 1,
        epicIds: [],
        deliverableIds: []
    }]
    const selectTargetsByIdsMock = useModuleMock('Redux/Targets/selectors', 'selectTargetsByIds')

    test('should render', () => {
        useDispatchMock().mockResolvedValue({})
        selectTargetsByIdsMock.mockReturnValue(subtargets)

        render(<GanttSubTargetList ids = {[1]}/>)

        expect(screen.getByText('1')).toBeInTheDocument()
    })
})