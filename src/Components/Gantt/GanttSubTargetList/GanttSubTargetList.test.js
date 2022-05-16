import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { GanttSubTargetList } from './index'

describe('<GanttSubTargetList />', () => {

    const subtargets = [{ id: 1, title: 'one', portfolioId: 1, epicIds: [] }]
    const selectTargetsByIdsMock = useModuleMock('Redux/Targets/selectors', 'selectTargetsByIds')

    test('should render', () => {
        useDispatchMock().mockResolvedValue({})
        selectTargetsByIdsMock.mockReturnValue(subtargets)

        render(<GanttSubTargetList ids = {[1]}/>)

        expect(screen.getByDisplayValue('one')).toBeInTheDocument()
    })
})