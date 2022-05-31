import { render, screen, useModuleMock, userEvent } from 'Utilities/test-utils'
import { GanttEpicsList } from './index'

describe('<GanttEpicsList />', () => {

    const selectEpicsByIdsMock = useModuleMock('Redux/Epics/selectors', 'selectEpicsByIds')

    const startDate = '05-01-2022'
    const dueDate = '07-01-2022'

    const foundEpics = [
        { id: 1, name: 'alpha', title: 'foo', totalWeight: 0, completedWeight: 0 },
        { id: 2, name: 'bravo', title: 'foo', totalWeight: 0, completedWeight: 0 },
        { id: 3, name: 'charlie', title: 'foo', totalWeight: 0, completedWeight: 0 },
    ]

    beforeEach(() => {
        selectEpicsByIdsMock.mockReturnValue(foundEpics)
    })

    test('should render', () => {
        render(<GanttEpicsList ids = {[1, 2, 3]} startDate = {startDate} dueDate = {dueDate}/>)

        expect(screen.getByText('alpha')).toBeInTheDocument()
        expect(screen.getByText('bravo')).toBeInTheDocument()
        expect(screen.getByText('charlie')).toBeInTheDocument()
        expect(screen.queryByTestId('DeleteOutlinedIcon')).not.toBeInTheDocument()
    })

    test('should render with onDeleteClick', () => {
        const onDeleteClickMock = jest.fn()

        render(<GanttEpicsList
            ids = {[1, 2, 3]}
            onDeleteClick = {onDeleteClickMock}
            startDate = {startDate}
            dueDate = {dueDate}
        />)
        userEvent.click(screen.getAllByTestId('DeleteOutlinedIcon')[0])

        expect(onDeleteClickMock).toHaveBeenCalledWith(1)
    })
})