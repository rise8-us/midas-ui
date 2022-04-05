import { renderWithRouter, screen } from 'Utilities/test-utils'
import GanttBody from './GanttBody'

describe('<Gantt Body />', () => {

    const mockEntries = [
        {
            title: 'first entry from last year',
            startDate: new Date('2021-11-15'),
            endDate: new Date('2022-06-01'),
            details: 'some deets',
            completion: 95
        }, {
            title: 'test entry2',
            startDate: new Date('2022-03-01'),
            endDate: new Date('2022-07-16'),
            details: 'some deets',
            completion: 67
        }, {
            title: 'test entry3',
            startDate: new Date('2022-07-01'),
            endDate: new Date('2023-2-01'),
            details: 'some deets',
            completion: 24
        }]

    const MAX_HEIGHT = 'calc(100vh - 156px)'

    let dateStart = new Date()
    let dateEnd = new Date()
    dateStart.setMonth(dateStart.getMonth() - 3)
    dateEnd.setMonth(dateStart.getMonth() + 12)
    let dateRange = [dateStart, dateEnd]

    test('should render', () => {
        renderWithRouter(<GanttBody entries = {mockEntries} maxHeight = {MAX_HEIGHT} dateRange = {dateRange}/>)

        expect(screen.getByText('first entry from last year')).toBeInTheDocument()
        expect(screen.getByText('test entry3')).toBeInTheDocument()
    })
})
