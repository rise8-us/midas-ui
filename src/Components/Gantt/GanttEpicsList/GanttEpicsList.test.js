import { render, screen, useModuleMock, userEvent } from 'Utilities/test-utils'
import { GanttEpicsList } from './index'

jest.mock('Components/Gantt/GanttAssociatedEpic/GanttAssociatedEpic', () => function testing({ name, onDelete }) {
    return <div onClick = {onDelete}>{name}</div>
})

describe('<GanttEpicsList />', () => {
    const defaultProps = {
        startDate: '05-01-2022',
        dueDate: '07-01-2022',
        ids: [1, 2, 3]
    }
    const defaultEpicProps = {
        title: 'foo',
        webUrl: 'foo',
    }
    const foundEpics = [
        { id: 1, name: 'alpha', ...defaultEpicProps },
        { id: 2, name: 'bravo', ...defaultEpicProps },
        { id: 3, name: 'charlie', ...defaultEpicProps },
    ]
    const selectEpicsByIdsMock = useModuleMock('Redux/Epics/selectors', 'selectEpicsByIds')

    beforeEach(() => {
        selectEpicsByIdsMock.mockReturnValue(foundEpics)
    })

    test('should render', () => {
        render(<GanttEpicsList {...defaultProps}/>)

        expect(screen.getByText('alpha')).toBeInTheDocument()
        expect(screen.getByText('bravo')).toBeInTheDocument()
        expect(screen.getByText('charlie')).toBeInTheDocument()
    })

    test('should render with onDeleteClick', () => {
        const onDeleteClickMock = jest.fn()

        render(<GanttEpicsList onDeleteClick = {onDeleteClickMock} {...defaultProps} />)
        userEvent.click(screen.getByText('alpha'))

        expect(onDeleteClickMock).toHaveBeenCalledWith(1)
    })
})
