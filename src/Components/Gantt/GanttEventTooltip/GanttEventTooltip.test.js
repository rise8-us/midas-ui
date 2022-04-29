import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { GanttEventTooltip } from './index'

describe('<GanttEventTooltip />', () => {

    const selectUsersByIdsMock = useModuleMock('Redux/Users/selectors', 'selectUsersByIds')


    const defaultProps = {
        onEditClick: jest.fn,
        onDeleteClick: jest.fn,
        dateRange: 'range already calculated'
    }

    const event = {
        title: 'This is the event title',
        description: 'These are the details',
        location: 'Here',
        organizerIds: [1, 2],
        attendeeIds: [1]
    }

    const organizers = [{ displayName: 'Them' }, { displayName: 'Others' }]
    const attendees = [{ displayName: 'guests' }]


    test('should render', () => {
        selectUsersByIdsMock.mockReturnValueOnce(organizers).mockReturnValueOnce(attendees)
        useDispatchMock().mockReturnValue()

        render(<GanttEventTooltip {...defaultProps} event = {event}/>)

        expect(screen.getByText('This is the event title')).toBeInTheDocument()
        expect(screen.getByText('These are the details')).toBeInTheDocument()
        expect(screen.getByText('Here')).toBeInTheDocument()
        expect(screen.getByText('Them')).toBeInTheDocument()
        expect(screen.getByText('Others')).toBeInTheDocument()
        expect(screen.getByText('(organizer)')).toBeInTheDocument()
        expect(screen.getByText('guests')).toBeInTheDocument()
    })
})