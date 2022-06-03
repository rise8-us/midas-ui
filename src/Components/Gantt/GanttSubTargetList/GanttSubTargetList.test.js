import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { GanttSubTargetList } from './index'

jest.mock('Components/Gantt/GanttSubTarget/GanttSubTarget', () => function testing({ id }) {
    return <div>{id}</div>
})

describe('<GanttSubTargetList />', () => {

    const subtargets = [
        {
            id: 1,
            title: 'one',
            isPriority: false
        }, {
            id: 2,
            title: 'two',
            isPriority: true
        }
    ]
    const selectTargetsByIdsMock = useModuleMock('Redux/Targets/selectors', 'selectTargetsByIds')
    const selectTargetFiltersMock = useModuleMock('Redux/Filters/selectors', 'selectTargetFilters')

    test('should render all', () => {
        selectTargetFiltersMock.mockReturnValue({ isPriority: false })
        selectTargetsByIdsMock.mockReturnValue(subtargets)

        render(<GanttSubTargetList ids = {[1, 2]}/>)

        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
    })

    test('should render priority', () => {
        selectTargetFiltersMock.mockReturnValue({ isPriority: true })
        selectTargetsByIdsMock.mockReturnValue(subtargets)

        render(<GanttSubTargetList ids = {[1, 2]}/>)

        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.queryByText('1')).not.toBeInTheDocument()

    })
})