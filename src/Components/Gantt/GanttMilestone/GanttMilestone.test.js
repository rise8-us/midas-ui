import { renderWithRouter, screen } from 'Utilities/test-utils'
import { GanttMilestone } from './index'

describe('<Gantt Milestone />', () => {

    const milestone = {
        title: 'This is the milestone title',
        dueDate: '2022-06-31',
        description: 'These are the details',
        portfolioId: 1
    }

    test('should render', () => {
        renderWithRouter(<GanttMilestone milestone = {milestone}/>)

        expect(screen.getByText('This is the milestone title')).toBeInTheDocument()
    })
})