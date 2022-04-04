import { renderWithRouter, screen } from 'Utilities/test-utils'
import GanttEntry from './GanttEntry'

let dateStart = new Date()
let dateEnd = new Date()
dateStart.setMonth(dateStart.getMonth() - 3)
dateEnd.setMonth(dateStart.getMonth() + 12)
let dateRange = [dateStart, dateEnd]

describe('<Gantt Entry />', () => {

    const entry = {
        title: 'This is the title',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2025-12-31'),
        details: 'These are the details',
        completion: 67
    }

    test('should render', () => {
        renderWithRouter(<GanttEntry entry = {entry} index = {1} dateRange = {dateRange}/>)

        expect(screen.getByText('This is the title')).toBeInTheDocument()
    })
})
