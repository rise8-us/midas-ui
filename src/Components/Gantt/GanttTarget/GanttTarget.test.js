import { renderWithRouter, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { GanttTarget } from './index'

describe('<GanttTarget />', () => {

    const target = {
        id: 1,
        title: 'This is the target title',
        dueDate: '2022-06-31',
        startDate: '2022-06-01',
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
        renderWithRouter(<GanttTarget target = {target}/>)

        expect(screen.getByText('This is the target title')).toBeInTheDocument()
    })
})