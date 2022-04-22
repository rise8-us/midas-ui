import { renderWithRouter, screen } from 'Utilities/test-utils'
import { GanttEventTooltip } from './index'

describe('<GanttEventTooltip />', () => {

    const event = {
        title: 'This is the event title',
        description: 'These are the details',
        dueDate: '2022-06-31',
        startDate: '2022-06-01',
        location: 'Here',
        organizers: [
            {
                displayName: 'Them'
            },
            {
                displayName: 'Others'
            }]
    }

    test('should render', () => {
        renderWithRouter(<GanttEventTooltip event = {event}/>)

        expect(screen.getByText('This is the event title')).toBeInTheDocument()
        expect(screen.getByText('These are the details')).toBeInTheDocument()
        expect(screen.getByText('Due Date:')).toBeInTheDocument()
        expect(screen.getByText('Fri Jul 01 2022')).toBeInTheDocument()
        expect(screen.getByText('Start Date:')).toBeInTheDocument()
        expect(screen.getByText('Wed Jun 01 2022')).toBeInTheDocument()
        expect(screen.getByText('Location:')).toBeInTheDocument()
        expect(screen.getByText('Here')).toBeInTheDocument()
        expect(screen.getByText('Organizers:')).toBeInTheDocument()
        expect(screen.getByText('Them')).toBeInTheDocument()
        expect(screen.getByText('Others')).toBeInTheDocument()
    })
})