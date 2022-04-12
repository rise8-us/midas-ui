import { renderWithRouter, screen } from 'Utilities/test-utils'
import GanttTarget from './GanttTarget'

describe('<Gantt Target />', () => {

    const target = {
        title: 'This is the target title',
        dueDate: new Date('2022-06-31'),
        startDate: new Date('2022-06-01'),
        description: 'These are the details'
    }

    test('should render', () => {
        renderWithRouter(<GanttTarget target = {target}/>)

        expect(screen.getByText('This is the target title')).toBeInTheDocument()
    })
})