import { renderWithRouter, screen } from 'Utilities/test-utils'
import GanttMilestone from './GanttMilestone'

let dateStart = new Date()
let dateEnd = new Date()
dateStart.setMonth(dateStart.getMonth() - 3)
dateEnd.setMonth(dateStart.getMonth() + 12)
let dateRange = [dateStart, dateEnd]

describe('<Gantt Milestone />', () => {

    const milestone = {
        title: 'This is the milestone title',
        dueDate: '2022-06-31',
        description: 'These are the details',
        portfolioId: 1
    }

    test('should render', () => {
        renderWithRouter(<GanttMilestone
            milestone = {milestone}
            index = {1}
            dateRange = {dateRange}
            portfolioId = {1}
        />)

        expect(screen.getByText('This is the milestone title')).toBeInTheDocument()
    })
})