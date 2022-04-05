import { renderWithRouter, screen } from 'Utilities/test-utils'
import GanttChart from './GanttChart'

describe('<Gantt Chart />', () => {

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
        }
    ]

    test('should render', () => {
        renderWithRouter(<GanttChart entries = {mockEntries} maxHeight = '800px'/>)

        expect(screen.getByText('first entry from last year')).toBeInTheDocument()
        expect(screen.getByText('test entry3')).toBeInTheDocument()
    })
})
