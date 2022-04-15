import { renderWithRouter, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import GanttTarget from './GanttTarget'

describe('<Gantt Target />', () => {

    const target = {
        id: 1,
        title: 'This is the target title',
        dueDate: new Date('2022-06-31'),
        startDate: new Date('2022-06-01'),
        description: 'These are the details',
        portfolioId: 1
    }

    const selectTargetByIdMock = useModuleMock('Redux/Targets/selectors', 'selectTargetById')
    const requestUpdateTargetMock = useModuleMock('Redux/Targets/actions', 'requestUpdateTarget')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({})
        selectTargetByIdMock.mockReturnValue(target)
        requestUpdateTargetMock.mockClear()
    })

    test('should render', () => {
        renderWithRouter(<GanttTarget target = {target} portfolioId = {1}/>)

        expect(screen.getByText('This is the target title')).toBeInTheDocument()
    })
})